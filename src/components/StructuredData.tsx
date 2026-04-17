'use client';
import React from 'react';

interface StructuredDataProps {
  pageType?: 'home' | 'about' | 'courses' | 'stages' | 'formation' | 'contact' | 'blog' | 'blogPost';
  blogPost?: {
    title: string;
    description: string;
    publishedDate: string;
    modifiedDate?: string;
    author: string;
    image?: string;
  };
}

const StructuredData: React.FC<StructuredDataProps> = ({ pageType = 'home', blogPost }) => {
  const getLocalBusinessStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://ventsetcourbes.org/#organization",
      "name": "Atelier Vents et Courbes",
      "alternateName": "Vents & Courbes",
      "description": "Atelier de céramique et centre de formation professionnelle certifié Qualiopi au Pré-Saint-Gervais. Cours de tournage, modelage, stages intensifs et formations CAP céramique.",
      "url": "https://ventsetcourbes.org",
      "telephone": "+33680893927",
      "email": "contact@ventsetcourbes.org",
      "foundingDate": "2015",
      "founders": {
        "@type": "Person",
        "name": "Philippe Paumier"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "33 Rue Danton",
        "addressLocality": "Le Pré-Saint-Gervais",
        "postalCode": "93310",
        "addressRegion": "Seine-Saint-Denis",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.8854,
        "longitude": 2.4103
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "00:00",
          "closes": "00:00",
          "validFrom": "2024-01-01",
          "validThrough": "2024-12-31"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "7",
        "bestRating": "5",
        "worstRating": "1"
      },
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 48.8854,
          "longitude": 2.4103
        },
        "geoRadius": "50000"
      },
      "serviceArea": {
        "@type": "Place",
        "name": "Paris et Île-de-France"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services de formation céramique",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Cours de tournage céramique",
              "description": "Formation au tournage en céramique pour tous niveaux"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Cours de modelage céramique",
              "description": "Apprentissage du modelage à la main en céramique"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Formation professionnelle CAP Céramique",
              "description": "Formation certifiante CAP Tournage en Céramique"
            }
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "EducationalOccupationalProgram",
            "name": "Formation CAP Tournage en Céramique",
            "provider": {
              "@type": "Organization",
              "name": "Atelier Vents et Courbes"
            },
            "programType": "Certificate"
          },
          "availability": "https://schema.org/InStock"
        }
      ],
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Tour de potier professionnel",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Four de cuisson céramique",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Bibliothèque spécialisée",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Parking nearby",
          "value": true
        }
      ],
      "image": [
        "https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png",
        "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg",
        "https://i.ibb.co/YBH2d6WY/VC-image-galerie02.jpg"
      ],
      "logo": "https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png",
      "sameAs": [
        "https://www.instagram.com/ventsetcourbes",
        "https://www.facebook.com/ventsetcourbes"
      ],
      "slogan": "L'art de la céramique aux portes de Paris",
      "keywords": "céramique, tournage, modelage, formation, CAP, Qualiopi, atelier, Paris, Pré-Saint-Gervais, poterie, argile, stages, cours"
    };
  };

  const getOrganizationStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://ventsetcourbes.org/#organization",
      "name": "Atelier Vents et Courbes",
      "url": "https://ventsetcourbes.org",
      "logo": {
        "@type": "ImageObject",
        "url": "https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png",
        "width": "500",
        "height": "500"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33680893927",
        "contactType": "customer service",
        "email": "contact@ventsetcourbes.org",
        "availableLanguage": "French",
        "areaServed": "FR"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "33 Rue Danton",
        "addressLocality": "Le Pré-Saint-Gervais",
        "postalCode": "93310",
        "addressCountry": "FR"
      }
    };
  };

  const getWebSiteStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://ventsetcourbes.org/#website",
      "url": "https://ventsetcourbes.org",
      "name": "Atelier Vents et Courbes - Céramique Paris",
      "description": "Centre de formation céramique certifié Qualiopi au Pré-Saint-Gervais. Cours, stages et formations professionnelles en tournage et modelage.",
      "publisher": {
        "@id": "https://ventsetcourbes.org/#organization"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://ventsetcourbes.org/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "fr-FR"
    };
  };

  const getBreadcrumbStructuredData = (pageType: string) => {
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://ventsetcourbes.org/"
      }
    ];

    switch (pageType) {
      case 'about':
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "À propos",
          "item": "https://ventsetcourbes.org/a-propos"
        });
        break;
      case 'courses':
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Loisirs céramique",
          "item": "https://ventsetcourbes.org/cours"
        });
        break;
      case 'stages':
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Stages céramique",
          "item": "https://ventsetcourbes.org/stages"
        });
        break;
      case 'formation':
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Formation professionnelle",
          "item": "https://ventsetcourbes.org/formation-pro"
        });
        break;
      case 'contact':
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://ventsetcourbes.org/contact"
        });
        break;
      case 'blog':
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Blog céramique",
          "item": "https://ventsetcourbes.org/blog"
        });
        break;
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
  };

  const getBlogPostStructuredData = () => {
    if (!blogPost) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogPost.title,
      "description": blogPost.description,
      "image": blogPost.image || "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg",
      "author": {
        "@type": "Person",
        "name": blogPost.author
      },
      "publisher": {
        "@id": "https://ventsetcourbes.org/#organization"
      },
      "datePublished": blogPost.publishedDate,
      "dateModified": blogPost.modifiedDate || blogPost.publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ventsetcourbes.org/blog/${blogPost.title.toLowerCase().replace(/ /g, '-')}`
      }
    };
  };

  const getFAQStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quels types de cours de céramique proposez-vous ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nous proposons des cours de tournage, de modelage, des stages intensifs et des formations professionnelles CAP céramique. Tous nos cours s'adressent à tous les niveaux, du débutant au professionnel."
          }
        },
        {
          "@type": "Question", 
          "name": "Êtes-vous un centre de formation certifié ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, Atelier Vents et Courbes est un centre de formation certifié Qualiopi, garantissant la qualité de nos formations professionnelles."
          }
        },
        {
          "@type": "Question",
          "name": "Où se trouve votre atelier de céramique ?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Notre atelier est situé au 33 Rue Danton, 93310 Le Pré-Saint-Gervais, aux portes de Paris. Accessible en métro ligne 5 et 11, tram T3 et bus."
          }
        },
        {
          "@type": "Question",
          "name": "Proposez-vous des formations financées ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nos formations professionnelles peuvent être prises en charge par les OPCO, CPF, Transition Pro, et autres dispositifs de financement de la formation continue."
          }
        }
      ]
    };
  };

  const structuredDataArray: Array<Record<string, unknown> | null> = [
    getLocalBusinessStructuredData(),
    getOrganizationStructuredData(),
    getWebSiteStructuredData(),
    getBreadcrumbStructuredData(pageType)
  ];

  if (pageType === 'home') {
    structuredDataArray.push(getFAQStructuredData());
  }

  if (pageType === 'blogPost' && blogPost) {
    structuredDataArray.push(getBlogPostStructuredData());
  }

  return (
    <>
      {structuredDataArray.map((data, index) => 
        data && (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        )
      )}
    </>
  );
};

export default StructuredData;