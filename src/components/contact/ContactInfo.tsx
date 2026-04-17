'use client';
import React from 'react';
import NAP from '../NAP';
import { SectionContent } from '../../services/pagesContent';

interface ContactInfoProps {
  content: SectionContent;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ content }) => {
  return (
    <section className="bg-stone-50 py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {content.info_title?.title && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              {content.info_title.title}
            </h2>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <NAP variant="contact" className="text-left" />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
