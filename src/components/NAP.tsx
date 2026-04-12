import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface NAPProps {
  variant?: 'full' | 'minimal' | 'contact' | 'footer';
  showIcons?: boolean;
  className?: string;
}

const NAP: React.FC<NAPProps> = ({ 
  variant = 'full', 
  showIcons = true, 
  className = '' 
}) => {
  const businessInfo = {
    name: "Atelier Vents et Courbes",
    address: "33 Rue Danton",
    city: "Le Pré-Saint-Gervais", 
    postalCode: "93310",
    country: "France",
    phone: "+33 6 80 89 39 27",
    phoneDisplay: "06 80 89 39 27",
    email: "contact@ventsetcourbes.org",
    hours: {
      "lundi": "10:00-18:00",
      "mardi": "10:00-18:00", 
      "mercredi": "10:00-18:00",
      "jeudi": "10:00-18:00",
      "vendredi": "10:00-18:00",
      "samedi": "10:00-16:00",
      "dimanche": "Fermé"
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>
        <div className="mb-1">
          <strong itemProp="name">{businessInfo.name}</strong>
        </div>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">{businessInfo.address}</span>,{' '}
          <span itemProp="postalCode">{businessInfo.postalCode}</span>{' '}
          <span itemProp="addressLocality">{businessInfo.city}</span>
        </div>
        <div>
          <a 
            href={`tel:${businessInfo.phone}`}
            itemProp="telephone"
            className="text-primary-400 hover:text-primary-500 transition-colors"
          >
            {businessInfo.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`space-y-4 ${className}`} itemScope itemType="https://schema.org/LocalBusiness">
        <div className="flex items-center">
          {showIcons && <MapPin className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />}
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <div className="font-medium text-gray-900" itemProp="name">{businessInfo.name}</div>
            <div className="text-gray-700">
              <span itemProp="streetAddress">{businessInfo.address}</span><br />
              <span itemProp="postalCode">{businessInfo.postalCode}</span>{' '}
              <span itemProp="addressLocality">{businessInfo.city}</span><br />
              <span itemProp="addressCountry">{businessInfo.country}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          {showIcons && <Phone className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />}
          <div>
            <div className="font-medium text-gray-900">Téléphone</div>
            <a 
              href={`tel:${businessInfo.phone}`}
              itemProp="telephone"
              className="text-primary-400 hover:text-primary-500 transition-colors"
            >
              {businessInfo.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-center">
          {showIcons && <Mail className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />}
          <div>
            <div className="font-medium text-gray-900">Email</div>
            <a 
              href={`mailto:${businessInfo.email}`}
              itemProp="email"
              className="text-primary-400 hover:text-primary-500 transition-colors"
            >
              {businessInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          {showIcons && <Clock className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />}
          <div>
            <div className="font-medium text-gray-900 mb-2">Horaires d'ouverture</div>
            <div className="text-sm text-gray-700 space-y-1" itemProp="openingHours">
              {Object.entries(businessInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between min-w-[200px]">
                  <span className="capitalize font-medium">{day}</span>
                  <span className={hours === 'Fermé' ? 'text-red-600' : ''}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={className} itemScope itemType="https://schema.org/LocalBusiness">
        <div className="mb-2">
          <strong itemProp="name">{businessInfo.name}</strong>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <div itemProp="streetAddress">{businessInfo.address}</div>
            <div>
              <span itemProp="postalCode">{businessInfo.postalCode}</span>{' '}
              <span itemProp="addressLocality">{businessInfo.city}</span>
            </div>
          </div>
          <div>
            <a 
              href={`tel:${businessInfo.phone}`}
              itemProp="telephone"
              className="hover:text-primary-400 transition-colors"
            >
              {businessInfo.phoneDisplay}
            </a>
          </div>
          <div>
            <a 
              href={`mailto:${businessInfo.email}`}
              itemProp="email"
              className="hover:text-primary-400 transition-colors"
            >
              {businessInfo.email}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className={className} itemScope itemType="https://schema.org/LocalBusiness">
      <h3 className="text-lg font-semibold text-gray-900 mb-4" itemProp="name">
        {businessInfo.name}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-start">
          {showIcons && <MapPin className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />}
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <div itemProp="streetAddress">{businessInfo.address}</div>
            <div>
              <span itemProp="postalCode">{businessInfo.postalCode}</span>{' '}
              <span itemProp="addressLocality">{businessInfo.city}</span>
            </div>
            <div itemProp="addressCountry">{businessInfo.country}</div>
          </div>
        </div>

        <div className="flex items-center">
          {showIcons && <Phone className="w-5 h-5 text-primary-400 mr-3" />}
          <a 
            href={`tel:${businessInfo.phone}`}
            itemProp="telephone"
            className="text-primary-400 hover:text-primary-500 transition-colors"
          >
            {businessInfo.phoneDisplay}
          </a>
        </div>

        <div className="flex items-center">
          {showIcons && <Mail className="w-5 h-5 text-primary-400 mr-3" />}
          <a 
            href={`mailto:${businessInfo.email}`}
            itemProp="email"
            className="text-primary-400 hover:text-primary-500 transition-colors"
          >
            {businessInfo.email}
          </a>
        </div>

        <div className="flex items-start">
          {showIcons && <Clock className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />}
          <div>
            <div className="font-medium mb-2">Horaires</div>
            <div className="text-sm space-y-1" itemProp="openingHours">
              {Object.entries(businessInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between min-w-[180px]">
                  <span className="capitalize">{day}</span>
                  <span className={hours === 'Fermé' ? 'text-red-600' : ''}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NAP;