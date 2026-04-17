'use client';
import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

const ContactInstagram = () => {
  const instagramPosts = [
    {
      id: 0,
      image: "https://images.pexels.com/photos/1094770/pexels-photo-1094770.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      alt: "Post Instagram tournage céramique"
    },
    {
      id: 1,
      image: "https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      alt: "Post Instagram modelage"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      alt: "Post Instagram atelier"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      alt: "Post Instagram formation"
    }
  ];

  return (
    <section className="bg-stone-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-orange-500 mr-3" strokeWidth={1.5} />
            <h2 className="text-3xl font-light text-gray-900">
              Suivez-nous sur Instagram
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Découvrez nos dernières créations et l'ambiance de l'atelier
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={`#instagram-post-${post.id}`}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
              </div>
            </a>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com/ventsetcourbes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors"
          >
            <Instagram className="w-5 h-5 mr-2" strokeWidth={1.5} />
            Voir tous nos posts
            <ExternalLink className="w-4 h-4 ml-2" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInstagram;