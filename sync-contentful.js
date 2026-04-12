import pkg from 'contentful-management';
const { createClient } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
const CONTENT_TYPE_DEFINITIONS_PATH = path.join(__dirname, 'contentful-definitions');

if (!SPACE_ID || !MANAGEMENT_ACCESS_TOKEN) {
  console.error('❌ Erreur: VITE_CONTENTFUL_SPACE_ID ou VITE_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN non définis dans .env');
  console.error('');
  console.error('Pour obtenir votre Management API Access Token:');
  console.error('1. Allez sur https://app.contentful.com');
  console.error('2. Sélectionnez votre espace');
  console.error('3. Allez dans Settings > API keys');
  console.error('4. Onglet "Content Management API"');
  console.error('5. Copiez le token et ajoutez-le à votre fichier .env');
  console.error('   VITE_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=votre_token_ici');
  process.exit(1);
}

const client = createClient({
  accessToken: MANAGEMENT_ACCESS_TOKEN,
});

// Fonction pour nettoyer les définitions de Content Type
function cleanContentTypeDefinition(definition) {
  // Créer une copie profonde pour éviter de modifier l'original
  const cleanedDefinition = JSON.parse(JSON.stringify(definition));
  
  // Nettoyer chaque champ
  if (cleanedDefinition.fields && Array.isArray(cleanedDefinition.fields)) {
    cleanedDefinition.fields.forEach(field => {
      // Supprimer helpText car cette propriété n'est pas acceptée par l'API lors de la mise à jour
      delete field.helpText;
      
      // Pour les champs de type Link, supprimer les validations linkMimetypeGroup
      // car l'API ne les accepte pas lors de la mise à jour
        // Vérifier si le champ avait une validation linkMimetypeGroup (indique un Asset)
        let hadLinkMimetypeGroup = false;
        
          // Vérifier s'il y a une validation linkMimetypeGroup avant de la supprimer
          hadLinkMimetypeGroup = field.validations.some(validation => validation.linkMimetypeGroup);
          
      if (field.type === 'Link' && field.validations && Array.isArray(field.validations)) {
        field.validations = field.validations.filter(validation => {
          // Supprimer les validations qui contiennent linkMimetypeGroup
          return !validation.linkMimetypeGroup;
        });
        
        // Si toutes les validations ont été supprimées, supprimer le tableau validations
        if (field.validations.length === 0) {
          delete field.validations;
        }
        
        // Ajouter linkType en fonction de ce qu'était le champ
        if (hadLinkMimetypeGroup) {
          // Si le champ avait linkMimetypeGroup, c'est un Asset (image, fichier)
          field.linkType = 'Asset';
        } else {
          // Sinon, c'est un lien vers une autre Entry (contenu)
          field.linkType = 'Entry';
        }
      }
    });
  }
  
  return cleanedDefinition;
}

// Fonction pour explorer récursivement les dossiers
function getAllDefinitionFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Explorer récursivement les sous-dossiers
      files = files.concat(getAllDefinitionFiles(fullPath));
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function syncContentTypes() {
  try {
    console.log('🚀 Début de la synchronisation des Content Types...');
    console.log('');
    
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Vérifier si le dossier existe
    if (!fs.existsSync(CONTENT_TYPE_DEFINITIONS_PATH)) {
      console.error(`❌ Le dossier ${CONTENT_TYPE_DEFINITIONS_PATH} n'existe pas.`);
      process.exit(1);
    }

    // Obtenir tous les fichiers JSON récursivement
    const allDefinitionFiles = getAllDefinitionFiles(CONTENT_TYPE_DEFINITIONS_PATH);
    
    // Extraire juste les noms de fichiers pour l'affichage
    const definitionFiles = allDefinitionFiles.map(filePath => path.relative(CONTENT_TYPE_DEFINITIONS_PATH, filePath));
    
    if (definitionFiles.length === 0) {
      console.log('ℹ️  Aucun fichier de définition trouvé dans contentful-definitions/ et ses sous-dossiers');
      console.log('   Créez des fichiers .json dans ces dossiers pour définir vos Content Types.');
      process.exit(0);
    }

    console.log(`📂 ${allDefinitionFiles.length} fichier(s) de définition trouvé(s):`);
    definitionFiles.forEach(file => console.log(`   - ${file}`));
    console.log('');

    for (let i = 0; i < allDefinitionFiles.length; i++) {
      const filePath = allDefinitionFiles[i];
      const relativePath = definitionFiles[i];
      const contentTypeDefinition = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const cleanedDefinition = cleanContentTypeDefinition(contentTypeDefinition);
      const contentTypeId = contentTypeDefinition.sys.id;

      console.log(`🔄 Synchronisation du Content Type: ${contentTypeId} (${relativePath})`);

      try {
        // Tenter de récupérer le Content Type existant
        let contentType = await environment.getContentType(contentTypeId);
        console.log(`   ✅ Content Type '${contentTypeId}' trouvé. Mise à jour...`);

        // Mettre à jour les champs et autres propriétés
        contentType.name = cleanedDefinition.name;
        contentType.description = cleanedDefinition.description;
        contentType.displayField = cleanedDefinition.displayField;
        contentType.fields = cleanedDefinition.fields;

        contentType = await contentType.update();
        console.log(`   ✅ Content Type '${contentTypeId}' mis à jour.`);

      } catch (error) {
        if (error.name === 'NotFound') {
          // Si le Content Type n'existe pas, le créer
          console.log(`   🆕 Content Type '${contentTypeId}' non trouvé. Création...`);
          const newContentType = await environment.createContentTypeWithId(contentTypeId, cleanedDefinition);
          console.log(`   ✅ Content Type '${contentTypeId}' créé.`);
        } else {
          throw error; // Rejeter d'autres erreurs
        }
      }

      // Publier le Content Type
      let contentTypeToPublish = await environment.getContentType(contentTypeId);
      await contentTypeToPublish.publish();
      console.log(`   📢 Content Type '${contentTypeId}' publié.`);
      console.log('');
    }

    console.log('🎉 Synchronisation des Content Types terminée avec succès !');
    console.log('');
    console.log('📋 Structure organisée par pages :');
    console.log('   📁 home/ - Page d\'accueil');
    console.log('   📁 about/ - Page À propos');
    console.log('   📁 cours/ - Page Cours');
    console.log('   📁 stages/ - Page Stages');
    console.log('   📁 formation-pro/ - Page Formation Pro');
    console.log('   📁 contact/ - Page Contact');
    console.log('   📁 blog/ - Blog et articles');
    console.log('');
    console.log('📋 Prochaines étapes:');
    console.log('1. Allez sur https://app.contentful.com');
    console.log('2. Sélectionnez votre espace');
    console.log('3. Allez dans "Content model" pour voir vos nouveaux Content Types');
    console.log('4. Allez dans "Content" pour créer des entries (contenu)');
    console.log('5. Créez d\'abord les auteurs, puis les articles de blog');
    console.log('6. Pour chaque page, créez une entry avec le titre interne approprié');

  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation des Content Types:', JSON.stringify(error, null, 2));
    
    if (error.name === 'AccessTokenInvalid') {
      console.error('');
      console.error('🔑 Le token d\'accès semble invalide ou expiré.');
      console.error('Vérifiez votre VITE_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN dans le fichier .env');
    } else if (error.name === 'NotFound' && error.message.includes('space')) {
      console.error('');
      console.error('🏢 L\'espace Contentful spécifié n\'a pas été trouvé.');
      console.error('Vérifiez votre VITE_CONTENTFUL_SPACE_ID dans le fichier .env');
    }
    
    process.exit(1);
  }
}

syncContentTypes();