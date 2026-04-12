import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Présent' : 'Manquant');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupAdmin() {
  try {
    console.log('🔧 Création du compte admin...');

    const email = 'ventsetcourbes@gmail.com';
    const password = 'Ventsetcourbes2230';

    console.log('📧 Email:', email);

    // Essayer de créer le compte via signUp
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: undefined,
        data: {
          role: 'admin'
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('ℹ️  Le compte existe déjà !');
        console.log('\n✅ Vous pouvez vous connecter avec ces identifiants :');
        console.log('📧 Email:', email);
        console.log('🔑 Mot de passe:', password);
        console.log('\n🔗 URL de connexion: /admin/login');
      } else {
        console.error('❌ Erreur lors de la création:', error.message);
        process.exit(1);
      }
    } else {
      console.log('✅ Compte admin créé avec succès !');
      console.log('\n📧 Email:', email);
      console.log('🔑 Mot de passe:', password);
      console.log('\n🎉 Vous pouvez maintenant vous connecter sur /admin/login');

      if (data.user && !data.user.email_confirmed_at) {
        console.log('\n⚠️  Note: Si la confirmation par email est activée, vous devrez confirmer votre email.');
        console.log('    Sinon, vous pouvez vous connecter immédiatement.');
      }
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

setupAdmin();
