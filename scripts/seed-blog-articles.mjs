// Ajoute 3 articles de blog thematiques (ceramique) dans MongoDB.
// Idempotent : upsert sur le slug, donc relançable sans creer de doublon.
//
//   node scripts/seed-blog-articles.mjs
//
import 'dotenv/config';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { randomUUID } from 'node:crypto';

config({ path: '.env.local' });

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('❌ MONGODB_URI manquant.');
  process.exit(1);
}

// Auteur "Philippe Paumier" (utilise par tous les articles techniques existants).
const AUTHOR_ID = '54774b7a-3640-42b5-b8fb-538446e17b03';

const ARTICLES = [
  {
    slug: 'cuisson-ceramique-biscuit-email',
    title: 'La cuisson en ceramique : comprendre le biscuit et l emaillage',
    published_date: '2026-06-25',
    order_index: 12,
    image_url:
      'https://pub-e3a8222f57b944158e63ec00767bf15f.r2.dev/vents-et-courbes/3214b2c7-504a-4742-819e-92d29f56c67d-1782908209589.jpg',
    excerpt:
      'La cuisson transforme la terre fragile en ceramique solide et durable. Entre la cuisson biscuit et la cuisson d emaillage, decouvrez le role de chaque etape et les cles pour reussir la transformation de vos pieces.',
    content: `# La cuisson en ceramique : comprendre le biscuit et l emaillage

## La cuisson, l etape qui revele la ceramique

Apres le faconnage, le sechage et parfois l emaillage, vient l etape la plus attendue : la cuisson. C est elle qui transforme la terre fragile en ceramique solide, resistante et durable.

En ceramique, on distingue le plus souvent deux cuissons successives : la cuisson biscuit et la cuisson d emaillage. Chacune joue un role bien precis dans la transformation de la piece.

## La cuisson biscuit : durcir la terre

La premiere cuisson, appelee cuisson biscuit (ou degourdi), intervient une fois la piece parfaitement seche.

Elle se realise generalement autour de 900 a 1000 degres. A cette temperature, la terre perd son eau chimique et devient dure, poreuse et manipulable sans risque de se deformer.

Cette porosite est essentielle : elle permet a la piece d absorber l email lors de l etape suivante. Le biscuit rend aussi la piece plus facile a emailler, car elle ne se delite plus au contact de l eau.

## La cuisson d emaillage : sublimer et vitrifier

Une fois emaillee, la piece part pour une seconde cuisson, souvent plus haute en temperature.

Selon la terre utilisee, cette cuisson se situe entre 1000 et 1280 degres. C est a ce moment que l email fond, se vitrifie et vient recouvrir la piece d une surface lisse, coloree et impermeable.

C est aussi lors de cette cuisson que la terre atteint sa maturite : le gres et la porcelaine se vitrifient et deviennent particulierement solides.

## Le role de la montee et de la descente en temperature

Une cuisson reussie ne depend pas seulement de la temperature finale. La vitesse de montee et surtout de refroidissement sont determinantes.

Une montee trop rapide peut provoquer des eclats, notamment si de l humidite reste emprisonnee dans la terre. Une descente trop brutale peut fissurer l email ou la piece.

Le four doit donc suivre une courbe de cuisson progressive, adaptee au type de terre et d email.

## Les incidents de cuisson les plus courants

Plusieurs defauts peuvent apparaitre a la sortie du four :
- des fissures dues a un sechage ou une montee trop rapides
- des cloques ou bulles dans l email
- des coulures d email au fond du four
- des variations de couleur liees a la temperature

Chaque defaut raconte quelque chose du processus et permet d ajuster les cuissons suivantes.

## En resume

La cuisson est l aboutissement du travail ceramique. Entre le biscuit qui durcit la terre et l emaillage qui la vitrifie, ces deux etapes transforment durablement la matiere.

Chez Vents & Courbes, comprendre la logique de la cuisson permet d aborder le four avec confiance et de mieux anticiper le resultat final de chaque piece.`,
  },
  {
    slug: 'choisir-terre-gres-faience-porcelaine',
    title: 'Bien choisir sa terre : gres, faience ou porcelaine',
    published_date: '2026-06-18',
    order_index: 13,
    image_url:
      'https://pub-e3a8222f57b944158e63ec00767bf15f.r2.dev/vents-et-courbes/3e1da2dd-df8a-4080-a1ef-e8fecfd5c6d7-1782908206588.jpg',
    excerpt:
      'Gres, faience, porcelaine : chaque terre possede ses proprietes, ses temperatures de cuisson et ses usages. Decouvrez comment choisir l argile la plus adaptee a vos projets ceramiques.',
    content: `# Bien choisir sa terre : gres, faience ou porcelaine

## Le choix de la terre, une decision fondamentale

Avant meme de toucher le tour ou de modeler, un ceramiste doit choisir sa terre. Ce choix n a rien d anodin : il conditionne le comportement de la piece, sa cuisson, sa solidite et son rendu final.

Les trois grandes familles de terres les plus utilisees sont la faience, le gres et la porcelaine. Chacune possede ses caracteristiques propres.

## La faience : douce et accessible

La faience est une terre tendre, souvent claire ou rouge, qui cuit a basse temperature, generalement entre 950 et 1050 degres.

Elle est appreciee des debutants pour sa facilite de faconnage et sa grande tolerance. Elle offre des couleurs d emaux vives et lumineuses.

Son principal inconvenient : elle reste poreuse apres cuisson et moins resistante que le gres. Elle convient donc davantage aux pieces decoratives ou a un usage doux.

## Le gres : robuste et polyvalent

Le gres est sans doute la terre la plus utilisee en atelier. Il cuit a haute temperature, entre 1200 et 1280 degres, et se vitrifie completement.

Le resultat est une ceramique dense, solide, impermeable et resistante, ideale pour la vaisselle du quotidien.

Sa palette de couleurs est plus sourde et naturelle que celle de la faience, avec des tons de terre, de sable ou de gris. Le gres offre un excellent equilibre entre facilite de travail et solidite.

## La porcelaine : finesse et exigence

La porcelaine est la plus noble et la plus delicate des terres. Blanche, fine et translucide apres cuisson, elle cuit egalement a haute temperature.

Elle demande cependant une grande maitrise : elle est peu plastique, se deforme facilement et pardonne peu les erreurs.

Reservee aux ceramistes plus experimentes, elle permet des pieces d une grande finesse et d une elegance particuliere.

## Comment choisir selon son projet

Le choix de la terre depend de plusieurs criteres :
- le niveau de pratique
- le type de piece (decorative ou utilitaire)
- la temperature de cuisson disponible
- le rendu esthetique recherche

Un debutant privilegiera souvent la faience ou un gres tendre, tandis qu un ceramiste confirme explorera la porcelaine.

## En resume

Faience, gres et porcelaine ne s opposent pas : elles repondent a des besoins et des envies differents. Comprendre leurs proprietes permet de choisir la terre la plus adaptee a chaque creation.

Chez Vents & Courbes, le choix de la terre fait partie des premiers apprentissages. Bien connaitre sa matiere, c est deja poser les bases d une piece reussie.`,
  },
  {
    slug: 'technique-colombin-modelage',
    title: 'La technique du colombin : monter ses pieces sans tour',
    published_date: '2026-06-10',
    order_index: 14,
    image_url:
      'https://pub-e3a8222f57b944158e63ec00767bf15f.r2.dev/vents-et-courbes/b6b17e45-6a68-45a5-b457-c8b86db9d1d0-1782908210548.jpg',
    excerpt:
      'Le colombin est l une des plus anciennes techniques de la ceramique. En superposant des boudins de terre, on peut monter des pieces de toutes tailles sans tour. Decouvrez les gestes essentiels pour maitriser cette methode accessible.',
    content: `# La technique du colombin : monter ses pieces sans tour

## Une technique ancestrale toujours d actualite

Le colombin est l une des plus anciennes techniques de la ceramique. Bien avant l invention du tour, les potiers montaient deja leurs pieces en superposant des boudins de terre.

Aujourd hui encore, cette methode reste incontournable pour creer des formes variees, sans avoir besoin de tour.

## Le principe du colombin

Le colombin consiste a rouler des boudins de terre reguliers, puis a les empiler les uns sur les autres pour construire progressivement les parois d une piece.

Chaque boudin est soude au precedent, puis lisse pour assurer la solidite et l homogeneite de la forme. Cette technique permet de monter aussi bien de petits contenants que de grandes pieces impossibles a realiser au tour.

## Preparer sa terre et ses colombins

Tout commence par une terre bien homogene, sans bulles d air. Le boudin se roule a la main sur un plan de travail, avec un geste regulier pour obtenir une epaisseur constante.

Un colombin trop fin se cassera, tandis qu un colombin trop epais sera difficile a assembler. La regularite est la cle.

## Assembler et souder les colombins

Chaque nouveau colombin doit etre solidement soude au precedent. Pour cela, on griffe legerement la surface et on ajoute un peu de barbotine (terre liquide) afin d assurer l adhesion.

Les boudins sont ensuite lisses a l interieur et a l exterieur, afin d effacer les jointures et de renforcer la paroi. C est ce travail de soudure qui garantit la solidite de la piece une fois cuite.

## Maitriser la forme

L un des grands avantages du colombin est la liberte qu il offre. En resserrant ou en elargissant les boudins, on peut faire evoluer la forme a volonte.

Il est important de laisser la piece raffermir legerement entre les etapes, pour eviter qu elle ne s affaisse sous son propre poids.

Cette montee progressive demande patience et attention, mais elle offre un controle total sur la forme finale.

## Les erreurs a eviter

Quelques pieges classiques guettent le debutant :
- des colombins d epaisseur irreguliere
- des soudures insuffisantes qui fragilisent la piece
- une montee trop rapide sans laisser la terre raffermir
- un lissage neglige qui laisse des points de faiblesse

Prendre son temps a chaque etape evite la plupart des deconvenues.

## En resume

Le colombin est une technique accessible, riche et pleine de possibilites. Elle permet de creer sans tour, en developpant le sens de la forme et le rapport a la matiere.

Chez Vents & Courbes, le montage au colombin fait partie des premiers gestes enseignes. Simple en apparence, il ouvre la porte a une infinie variete de creations.`,
  },
];

async function run() {
  const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  await client.connect();
  const col = client.db().collection('blog_posts');
  const now = new Date().toISOString();

  for (const a of ARTICLES) {
    const res = await col.updateOne(
      { slug: a.slug },
      {
        $set: {
          title: a.title,
          slug: a.slug,
          published_date: a.published_date,
          author_id: AUTHOR_ID,
          image_url: a.image_url,
          excerpt: a.excerpt,
          content: a.content,
          seo_title: a.title,
          seo_description: a.excerpt,
          active: true,
          order_index: a.order_index,
          updated_at: now,
        },
        $setOnInsert: { id: randomUUID(), created_at: now },
      },
      { upsert: true },
    );
    const state = res.upsertedCount ? 'CREE' : 'MIS A JOUR';
    console.log(`✅ ${state} : ${a.slug}`);
  }

  const total = await col.countDocuments();
  console.log(`\n📚 Total articles en base : ${total}`);
  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
