/*
  # Fix RLS Policies pour les stages
  
  Cette migration ajoute les policies manquantes pour permettre aux utilisateurs authentifiés de:
  - Créer de nouveaux stages (INSERT)
  - Modifier les stages existants (UPDATE)
  - Supprimer des stages (DELETE)
  
  Les utilisateurs anonymes (public) peuvent uniquement lire les stages actifs.
*/

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Admin peut créer des stages" ON stages;
DROP POLICY IF EXISTS "Admin peut modifier les stages" ON stages;
DROP POLICY IF EXISTS "Admin peut supprimer les stages" ON stages;

-- Ajouter une policy pour permettre aux utilisateurs authentifiés de créer des stages
CREATE POLICY "Admin peut créer des stages"
  ON stages FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ajouter une policy pour permettre la mise à jour
CREATE POLICY "Admin peut modifier les stages"
  ON stages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permettre la suppression
CREATE POLICY "Admin peut supprimer les stages"
  ON stages FOR DELETE
  TO authenticated
  USING (true);
