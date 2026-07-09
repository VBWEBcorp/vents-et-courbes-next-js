'use client';
import { useEffect, useState } from 'react';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

// Contenu partagé par tout le site (logo, certifications). Mis en cache au
// niveau module pour ne le charger qu'une fois, quel que soit le nombre de
// composants qui l'utilisent (Header, Footer, Hero…).
let cache: SectionContent | null = null;
let inflight: Promise<SectionContent> | null = null;

export function useGlobalContent(): SectionContent {
  const [content, setContent] = useState<SectionContent>(cache || {});

  useEffect(() => {
    if (cache) {
      setContent(cache);
      return;
    }
    if (!inflight) {
      inflight = getPageContentBySection('global').then((c) => {
        cache = c;
        return c;
      });
    }
    let alive = true;
    inflight.then((c) => {
      if (alive) setContent(c);
    });
    return () => {
      alive = false;
    };
  }, []);

  return content;
}
