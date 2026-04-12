import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes');
  console.error('Veuillez ajouter SUPABASE_SERVICE_ROLE_KEY dans le fichier .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function resetAdminPassword() {
  const email = 'ventsetcourbes@gmail.com';
  const newPassword = 'Ventsetcourbes2230';

  console.log('🔄 Réinitialisation du mot de passe admin...');

  try {
    // Réinitialiser le mot de passe
    const { data, error } = await supabase.auth.admin.updateUserById(
      '67ede706-f216-422d-9ab6-574bf073a40a', // ID de l'utilisateur
      { password: newPassword }
    );

    if (error) {
      console.error('❌ Erreur:', error.message);
      process.exit(1);
    }

    console.log('✅ Mot de passe réinitialisé avec succès!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Mot de passe: ${newPassword}`);
  } catch (err) {
    console.error('❌ Erreur inattendue:', err);
    process.exit(1);
  }
}

resetAdminPassword();
