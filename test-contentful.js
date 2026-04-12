import { createClient } from 'contentful';
import dotenv from 'dotenv';

dotenv.config();

const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;

console.log('🔍 Test de connexion Contentful...\n');
console.log('Space ID:', spaceId);
console.log('Access Token:', accessToken ? '✓ Présent' : '✗ Manquant');
console.log('');

if (!spaceId || !accessToken) {
  console.error('❌ Variables d\'environnement manquantes');
  process.exit(1);
}

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

async function testConnection() {
  try {
    console.log('📡 Test de connexion à Contentful...\n');

    // Test 1: Liste des content types
    console.log('1️⃣ Récupération des content types...');
    const contentTypes = await client.getContentTypes();
    console.log(`✓ ${contentTypes.items.length} content types trouvés:`);
    contentTypes.items.forEach(ct => {
      console.log(`   - ${ct.sys.id}: ${ct.name}`);
    });
    console.log('');

    // Test 2: Compte des entrées par content type
    const contentTypeIds = [
      'homePageContent',
      'coursPageContent',
      'stagesPageContent',
      'formationProPageContent',
      'aboutPageContent',
      'contactPageContent',
      'blogPageContent',
      'blogPost',
      'author'
    ];

    console.log('2️⃣ Vérification des entrées par content type...');
    for (const ctId of contentTypeIds) {
      try {
        const entries = await client.getEntries({ content_type: ctId });
        console.log(`   ${ctId}: ${entries.items.length} entrée(s)`);
        if (entries.items.length > 0) {
          entries.items.forEach(entry => {
            console.log(`      → ${entry.fields.title || entry.fields.titre || 'Sans titre'}`);
          });
        }
      } catch (err) {
        console.log(`   ${ctId}: ⚠️ Content type non trouvé`);
      }
    }
    console.log('');

    // Test 3: Vérification des entrées spécifiques
    console.log('3️⃣ Recherche des entrées requises...');
    const requiredEntries = [
      { contentType: 'homePageContent', title: 'Home Page' },
      { contentType: 'coursPageContent', title: 'Cours Page' },
      { contentType: 'stagesPageContent', title: 'Stages Page' },
      { contentType: 'formationProPageContent', title: 'Formation Pro Page' },
      { contentType: 'aboutPageContent', title: 'About Page' },
      { contentType: 'contactPageContent', title: 'Contact Page' },
      { contentType: 'blogPageContent', title: 'Blog Page' },
    ];

    for (const req of requiredEntries) {
      try {
        const entries = await client.getEntries({
          content_type: req.contentType,
          'fields.title': req.title,
          limit: 1,
        });
        if (entries.items.length > 0) {
          console.log(`   ✓ ${req.title} trouvé`);
        } else {
          console.log(`   ✗ ${req.title} manquant (content type existe mais entrée manquante)`);
        }
      } catch (err) {
        console.log(`   ✗ ${req.title} manquant (content type non trouvé)`);
      }
    }

    console.log('\n✅ Test terminé avec succès');
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    process.exit(1);
  }
}

testConnection();
