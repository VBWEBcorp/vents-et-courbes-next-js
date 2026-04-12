import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object[];
  pageType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogImage = "https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png",
  structuredData = [],
  pageType = 'website',
  publishedTime,
  modifiedTime,
  author
}) => {
  const baseUrl = "https://ventsetcourbes.org";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  // NAP consistency data
  const businessInfo = {
    name: "Atelier Vents et Courbes",
    address: "33 Rue Danton, 93310 Le Pré-Saint-Gervais, France", 
    phone: "+33 6 80 89 39 27",
    email: "contact@ventsetcourbes.org"
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Atelier Vents et Courbes" />
      
      {/* Article specific Open Graph */}
      {pageType === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          <meta property="article:section" content="Céramique" />
          <meta property="article:tag" content="céramique" />
          <meta property="article:tag" content="tournage" />
          <meta property="article:tag" content="modelage" />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Local SEO */}
      <meta name="geo.region" content="FR-93" />
      <meta name="geo.placename" content="Le Pré-Saint-Gervais" />
      <meta name="geo.position" content="48.8854;2.4103" />
      <meta name="ICBM" content="48.8854, 2.4103" />
      
      {/* Business Info */}
      <meta name="business:contact_data:street_address" content="33 Rue Danton" />
      <meta name="business:contact_data:locality" content="Le Pré-Saint-Gervais" />
      <meta name="business:contact_data:region" content="Seine-Saint-Denis" />
      <meta name="business:contact_data:postal_code" content="93310" />
      <meta name="business:contact_data:country_name" content="France" />
      <meta name="business:contact_data:phone_number" content="+33680893927" />
      <meta name="business:contact_data:email" content="contact@ventsetcourbes.org" />
      
      {/* Additional Meta */}
      <meta name="author" content={businessInfo.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#C4553C" />
      
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Helmet>
  );
};

export default SEOHead;