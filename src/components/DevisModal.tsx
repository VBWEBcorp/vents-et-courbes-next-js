import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface DevisModalProps {
  isOpen: boolean;
  onClose: () => void;
  formationType?: string;
}

const DevisModal: React.FC<DevisModalProps> = ({ isOpen, onClose, formationType = "Formation CAP Tournage" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation côté client
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setStatusMessage('Veuillez entrer une adresse email valide.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');
    
    try {
      console.log('Envoi de la demande de devis vers Formspree...');
      
      const response = await fetch('https://formspree.io/f/mvgbjbgd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `Demande de devis - ${formationType} - ${formData.name}`,
          _replyto: formData.email,
          _format: 'plain',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          formationType: formationType,
          source: 'Site Web Vents & Courbes - Demande de devis'
        }),
      });

      console.log('Réponse reçue:', response.status, response.statusText);
      
      if (response.ok) {
        console.log('Demande de devis envoyée avec succès');
        setSubmitStatus('success');
        setStatusMessage('Votre demande de devis a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        const errorData = await response.text();
        console.error('Erreur Formspree:', response.status, errorData);
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      setStatusMessage(
        'Une erreur s\'est produite lors de l\'envoi de votre demande. ' +
        'Veuillez réessayer dans quelques minutes ou nous contacter directement par téléphone au 06 80 89 39 27 ' +
        'ou par email à contact@ventsetcourbes.org'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div className="bg-blue-400 text-white p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Demande de devis</h2>
          <p className="text-blue-100 text-sm">{formationType}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-green-700 text-sm leading-relaxed">{statusMessage}</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-red-700 text-sm leading-relaxed">{statusMessage}</p>
            </div>
          )}

          {submitStatus !== 'success' && (
            <>
              <p className="text-gray-700 mb-6 text-sm">
                Remplissez ce formulaire pour recevoir un devis personnalisé pour votre formation.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-sm">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Précisez vos besoins, votre niveau, vos disponibilités..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-vertical text-sm"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-400 hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    {isSubmitting ? 'Envoi en cours...' : 'Demander un devis'}
                  </button>
                </div>
              </form>
            </>
          )}

          {submitStatus === 'success' && (
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevisModal;