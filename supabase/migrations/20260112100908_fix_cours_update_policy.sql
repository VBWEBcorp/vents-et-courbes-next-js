/*
  # Fix RLS Policies pour les cours
  
  Cette migration ajoute les policies manquantes pour permettre aux utilisateurs authentifiés de:
  - Créer de nouveaux cours (INSERT)
  - Modifier les cours existants (UPDATE)
  - Supprimer des cours (DELETE)
  
  Les utilisateurs anonymes (public) peuvent uniquement lire les cours actifs.
*/

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Admin peut créer des cours" ON cours;
DROP POLICY IF EXISTS "Admin peut modifier les cours" ON cours;
DROP POLICY IF EXISTS "Admin peut supprimer les cours" ON cours;

-- Ajouter une policy pour permettre aux utilisateurs authentifiés de créer des cours
CREATE POLICY "Admin peut créer des cours"
  ON cours FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ajouter une policy pour permettre la mise à jour
CREATE POLICY "Admin peut modifier les cours"
  ON cours FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permettre la suppression
CREATE POLICY "Admin peut supprimer les cours"
  ON cours FOR DELETE
  TO authenticated
  USING (true);
