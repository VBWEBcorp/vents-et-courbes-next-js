'use client';
import { useEffect, useState } from 'react';
import { getSiteSettings, SiteSettings } from '../services/supabaseAdmin';

// Valeurs par défaut = contenu actuel du site. Elles servent de fallback
// au premier rendu (export statique) et si la base ne contient encore
// aucun réglage.
export const DEFAULT_SETTINGS: SiteSettings = {
  business_name: 'Atelier Vents et Courbes',
  address: '33 Rue Danton',
  postal_code: '93310',
  city: 'Le Pré-Saint-Gervais',
  country: 'France',
  phone: '+33 6 80 89 39 27',
  phone_display: '06 80 89 39 27',
  email: 'contact@ventsetcourbes.org',
  hours: {
    lundi: ['14h – 17h', '19h – 22h'],
    mardi: ['9h30 – 12h30', '14h – 17h'],
    mercredi: ['9h30 – 12h30', '19h – 22h'],
    jeudi: ['19h – 22h'],
    vendredi: ['Fermé'],
    samedi: ['Fermé'],
    dimanche: ['Fermé'],
  },
  hours_note: 'Atelier fermé pendant les vacances scolaires',
  rating_value: '4.9',
  rating_count: '938',
};

let cache: SiteSettings | null = null;
let inflight: Promise<SiteSettings> | null = null;

function merge(data: Partial<SiteSettings> | null): SiteSettings {
  if (!data) return DEFAULT_SETTINGS;
  return {
    ...DEFAULT_SETTINGS,
    ...data,
    // On garde les horaires par défaut si la base n'en fournit pas.
    hours:
      data.hours && Object.keys(data.hours).length
        ? data.hours
        : DEFAULT_SETTINGS.hours,
  };
}

async function load(): Promise<SiteSettings> {
  if (cache) return cache;
  if (!inflight) {
    inflight = getSiteSettings()
      .then(({ data }) => {
        cache = merge(data);
        return cache;
      })
      .catch(() => DEFAULT_SETTINGS);
  }
  return inflight;
}

/**
 * Hook client : renvoie les réglages du site (coordonnées, horaires…).
 * Premier rendu = valeurs par défaut, puis mise à jour avec la base.
 */
export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(
    cache || DEFAULT_SETTINGS,
  );
  useEffect(() => {
    let mounted = true;
    load().then((s) => {
      if (mounted) setSettings(s);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return settings;
}
