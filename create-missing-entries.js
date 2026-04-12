import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';

dotenv.config();

const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = process.env.VITE_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;

console.log('🔧 Création des entrées manquantes dans Contentful...\n');

if (!spaceId || !accessToken) {
  console.error('❌ Variables d\'environnement manquantes');
  process.exit(1);
}

const client = contentfulManagement.createClient({ accessToken });

async function createMissingEntries() {
  try {
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment('master');

    console.log('📝 Création des entrées...\n');

    // 1. About Page
    console.log('1️⃣ Création de About Page...');
    try {
      const aboutPage = await environment.createEntry('aboutPageContent', {
        fields: {
          title: { 'en-US': 'About Page' },
          heroMainTitle: { 'en-US': 'L\'histoire de Vents & Courbes' },
          heroSubTitle: { 'en-US': 'Notre passion' },
          heroDescription: { 'en-US': 'Une équipe dédiée à la céramique' },
          presentationTitle: { 'en-US': 'Présentation' },
          equipeTitle: { 'en-US': 'Notre équipe' },
          equipeDescription: { 'en-US': 'Des artistes passionnés et expérimentés' },
          temoignagesTitle: { 'en-US': 'Témoignages' },
          temoignagesDescription: { 'en-US': 'Ce que disent nos élèves' }
        }
      });
      await aboutPage.publish();
      console.log('   ✓ About Page créée et publiée');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('   ⚠️ About Page existe déjà');
      } else {
        console.error('   ✗ Erreur:', err.message);
      }
    }

    // 2. Contact Page
    console.log('2️⃣ Création de Contact Page...');
    try {
      const contactPage = await environment.createEntry('contactPageContent', {
        fields: {
          title: { 'en-US': 'Contact Page' },
          heroMainTitle: { 'en-US': 'Contactez-nous' },
          heroDescription: { 'en-US': 'Nous sommes là pour vous accompagner' },
          contactInfoTitle: { 'en-US': 'Nos informations de contact' },
          contactFormTitle: { 'en-US': 'Envoyez-nous un message' },
          contactFormDescription: { 'en-US': 'Une question, un projet ? Contactez-nous !' },
          mapTitle: { 'en-US': 'Nous trouver' },
          mapDescription: { 'en-US': '33 rue Danton — 93310 Le Pré-Saint-Gervais' },
          contactInfoData: {
            'en-US': [
              {
                icon: 'Mail',
                title: 'Email',
                content: 'contact@ventsetcourbes.org',
                link: 'mailto:contact@ventsetcourbes.org'
              },
              {
                icon: 'Phone',
                title: 'Téléphone',
                content: '06 80 89 39 27',
                link: 'tel:+33680893927',
                additionalInfo: 'Lun-Sam 9h-19h'
              },
              {
                icon: 'MapPin',
                title: 'Adresse',
                content: '33 rue Danton\n93310 Le Pré-Saint-Gervais'
              }
            ]
          },
          contactFormFields: {
            'en-US': {
              nameLabel: 'Nom *',
              emailLabel: 'Email *',
              phoneLabel: 'Téléphone',
              subjectLabel: 'Sujet',
              messageLabel: 'Message',
              submitButton: 'Envoyer'
            }
          },
          mapData: {
            'en-US': {
              address: '33 rue Danton — 93310 Le Pré-Saint-Gervais',
              mapImage: 'https://i.ibb.co/TDVGN5c7/MAP-VC.png',
              mapAlt: 'Plan d\'accès à l\'atelier Vents et Courbes',
              transportInfo: 'Métro 11 & 5, Tram T3, Bus 48/61/170'
            }
          }
        }
      });
      await contactPage.publish();
      console.log('   ✓ Contact Page créée et publiée');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('   ⚠️ Contact Page existe déjà');
      } else {
        console.error('   ✗ Erreur:', err.message);
      }
    }

    // 3. Blog Page
    console.log('3️⃣ Création de Blog Page...');
    try {
      const blogPage = await environment.createEntry('blogPageContent', {
        fields: {
          title: { 'en-US': 'Blog Page' },
          heroMainTitle: { 'en-US': 'Nos actualités' },
          heroDescription: { 'en-US': 'Découvrez nos derniers articles et actualités' }
        }
      });
      await blogPage.publish();
      console.log('   ✓ Blog Page créée et publiée');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('   ⚠️ Blog Page existe déjà');
      } else {
        console.error('   ✗ Erreur:', err.message);
      }
    }

    console.log('\n✅ Toutes les entrées ont été créées avec succès !');
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    if (error.details) {
      console.error('Détails:', error.details);
    }
    process.exit(1);
  }
}

createMissingEntries();
