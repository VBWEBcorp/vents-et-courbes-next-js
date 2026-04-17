'use client';
import React from 'react';
import { Star } from 'lucide-react';

const AboutTestimonials = () => {
  const testimonials = [
    {
      name: "Sonia Soowambar",
      date: "il y a 3 jours",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "J'ai participé au cours 'Les Bols du Samedi', une session de quatre heures, et avons été chaleureusement accueillis par Fred, qui nous a mis à l'aise dès le début en nous offrant du thé et du café. Le cours se déroulait en petit groupe (cinq personnes), ce qui a permis à chacun de bénéficier d'une attention personnalisée et de vivre une expérience optimale."
    },
    {
      name: "Juju b",
      date: "il y a 1 semaine",
      rating: 5,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "J'ai reçu comme cadeau une journée d'initiation moulage et tournassage (via le site wecandoo). J'ai été reçu par Frédérique qui nous a accueilli tous.tes chaleureusement. Un super lieu !"
    },
    {
      name: "Clarence Benoist",
      date: "il y a 1 semaine",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "Un atelier d'initiation au tournage génial avec Frédérique ! Merci beaucoup, appris plein de choses et très fière du résultat !"
    },
    {
      name: "Guillaume Labat",
      date: "il y a 2 semaines",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "Cours d'initiation à l'émaillage ! Trop bien ! Super idée cadeau et super activité ! Nous avons adoré 🥰"
    },
    {
      name: "Marine",
      date: "il y a 1 mois",
      rating: 5,
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "Une formidable école de céramique pour apprendre ou se perfectionner, que ce soit en tournage, modelage ou émaillage, avec des professeurs qui ont à cœur de transmettre leurs connaissances et savoir-faire."
    },
    {
      name: "Sophie Martin",
      date: "il y a 2 mois",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "Excellente formation CAP tournage ! Philippe est un formateur exceptionnel, très patient et à l'écoute. Je recommande vivement !"
    },
    {
      name: "Thomas Dubois",
      date: "il y a 3 mois",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      text: "Stage de 3 jours fantastique ! L'atelier est très bien équipé et l'ambiance conviviale. Parfait pour débuter ou se perfectionner."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        strokeWidth={1}
      />
    ));
  };

  const ReviewCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-w-[320px] max-w-[320px] mx-3">
      {/* Header */}
      <div className="flex items-start mb-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
         className="w-10 h-10 rounded-full mr-3 object-cover"
         loading="lazy"
        />
        <div className="flex-grow min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate">
            {testimonial.name}
          </h4>
          <p className="text-gray-500 text-xs mb-1">
            {testimonial.date}
          </p>
          <div className="flex items-center">
            {renderStars(testimonial.rating)}
          </div>
        </div>
        {/* Google Logo */}
        <img 
          src="https://i.ibb.co/Df5krkD6/GOOGLR.png" 
          alt="Google" 
          className="w-4 h-4 ml-2 flex-shrink-0"
        />
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
        {testimonial.text}
      </p>
    </div>
  );

  return (
    <section className="bg-stone-50 py-16 md:py-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-400 mb-4">
            Avis Google
          </h2>
          <div className="w-24 h-1 bg-primary-400 mx-auto mb-6 md:mb-8"></div>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
              <span className="text-blue-500 font-bold text-xl mr-2">G</span>
              <span className="text-gray-700 font-medium text-lg">4,9</span>
              <div className="flex ml-2 mr-3">
                {renderStars(5)}
              </div>
              <span className="text-gray-500 text-sm">({testimonials.length} avis)</span>
            </div>
          </div>
        </div>

        {/* Google Reviews Widget */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          {/* Widget Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img 
                src="https://i.ibb.co/Df5krkD6/GOOGLR.png" 
                alt="Google" 
                className="w-8 h-8 mr-3"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Vents & Courbes</h3>
                <p className="text-sm text-gray-600">Avis Google</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <span className="text-2xl font-bold text-gray-900 mr-2">4,9</span>
                <div className="flex">
                  {renderStars(5)}
                </div>
              </div>
              <p className="text-sm text-gray-600">{testimonials.length} avis</p>
            </div>
          </div>

          {/* Scrolling Reviews - First Row (Left to Right) */}
          <div className="mb-4 overflow-hidden">
            <div className="flex animate-scroll-left">
              {/* Double the testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <ReviewCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Scrolling Reviews - Second Row (Right to Left) */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-right">
              {/* Double the testimonials for seamless loop, reversed */}
              {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                <ReviewCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-8">
          <a 
            href="#"
            className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-sm font-medium transition-colors"
          >
            <img 
              src="https://i.ibb.co/Df5krkD6/GOOGLR.png" 
              alt="Google" 
              className="w-5 h-5 mr-3"
            />
            Voir tous nos avis sur Google
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AboutTestimonials;