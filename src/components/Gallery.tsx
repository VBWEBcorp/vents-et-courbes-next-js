'use client';
import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';

interface GalleryProps {
  title?: string;
  description?: string;
  images?: string[];
}

const DEFAULT_GALLERY = [
  "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg",
  "https://i.ibb.co/YBH2d6WY/VC-image-galerie02.jpg",
  "https://i.ibb.co/B2D11tpV/VC-image-galerie03.jpg",
  "https://i.ibb.co/MyFKFS6q/VC-image-galerie04.jpg",
  "https://i.ibb.co/5hfqjpVq/VC-image-galerie05.jpg",
  "https://i.ibb.co/hJ6TxyrW/VC-image-galerie06.jpg",
  "https://i.ibb.co/S70yQr6N/VC-image-galerie07.jpg",
  "https://i.ibb.co/r2pTGFy7/Artisanat-Paumier-02-2017-EH-21-1-1-scaled-1.jpg",
];

const Gallery: React.FC<GalleryProps> = ({ title, description, images: imagesProp }) => {
  const sources =
    imagesProp && imagesProp.length > 0 ? imagesProp : DEFAULT_GALLERY;
  const images = sources.map((src, i) => ({
    id: i + 1,
    src,
    alt: `Atelier Vents et Courbes - photo ${i + 1}`,
  }));

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 fade-in">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-6 h-6 text-primary-400 mr-3 pulse-soft" strokeWidth={1.5} />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-primary-400 float-delay">
              {title || "L'atelier en images"}
            </h2>
          </div>
          <div className="w-16 h-1 bg-primary-400 mx-auto mb-4 scale-in"></div>
          <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto leading-relaxed fade-in-delay">
            {description || "Découvrez l'univers de Vents & Courbes à travers notre galerie"}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 fade-in-delay">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className="gallery-item group relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 stagger-item bg-stone-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                loading="lazy"
              />
              
              {/* Overlay effet */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/10 transition-all duration-500"></div>
              
              {/* Zoom indicator */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <ArrowRight className="w-3 h-3 text-primary-400 rotate-45" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;