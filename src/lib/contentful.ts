import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Types pour nos modèles Contentful
export interface Author {
  nom: string;
  bio?: string;
  photo?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface BlogPost {
  titre: string;
  slug: string;
  dateDePublication: string;
  auteur: Author;
  imagePrincipale: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  extrait: string;
  contenu: Document; // Le contenu est toujours un Document Rich Text
  titreSeo?: string;
  descriptionSeo?: string;
}

// Configuration du client Contentful
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

let client: ReturnType<typeof createClient> | null = null;

if (spaceId && accessToken) {
  client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });
} else {
  console.error('⚠️ Variables Contentful manquantes. Configurez VITE_CONTENTFUL_SPACE_ID et VITE_CONTENTFUL_ACCESS_TOKEN');
}

export default client;