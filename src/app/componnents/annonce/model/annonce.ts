export class Annonce {
  id!: number;
  object: string = "";
  auteur: string = ""; // Ce champ sera rempli avec l'utilisateur connecté
  contenu: string = "";
  fichiers?: string[]; // Tableau pour gérer les fichiers joints
  created_at!: Date;
}
