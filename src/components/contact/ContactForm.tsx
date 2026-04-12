import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionContent } from '../../services/pagesContent';

interface ContactFormProps {
  content: SectionContent;
}

const ContactForm: React.FC<ContactFormProps> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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

    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

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
      const response = await fetch('https://formspree.io/f/mvgbjbgd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `Nouveau message depuis Vents & Courbes - ${formData.subject || 'Contact'}`,
          _replyto: formData.email,
          _format: 'plain',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          source: 'Site Web Vents & Courbes - Page Contact'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(
        'Une erreur s\'est produite lors de l\'envoi de votre message. ' +
        'Veuillez réessayer dans quelques minutes ou nous contacter directement par téléphone au 06 80 89 39 27 ' +
        'ou par email à contact@ventsetcourbes.org'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-12 md:py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            {content.form_title?.title || 'Envoyez-nous un message'}
          </h2>
        </div>

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

        <div className="bg-stone-50 rounded-3xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors resize-vertical"
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center bg-primary-400 hover:bg-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium text-lg transition-colors"
              >
                <Send className="w-5 h-5 mr-2" strokeWidth={1.5} />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
