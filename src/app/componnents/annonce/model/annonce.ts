export class Annonce {
  id!: number;
  object: string = "";
  author: string = ""; // Ce champ sera rempli avec l'utilisateur connecté
  body: string = "";
  fichiers?: []=[]; // Tableau pour gérer les fichiers joints
  created_at!: Date;
}
