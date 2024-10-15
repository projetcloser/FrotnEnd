export class Amende {

  id!: number;
  date: Date = new Date(); // Date d'enregistrement
  auteur: string = ""; // Session de l'utilisateur connecté
  objet: string = ""; // Zone de texte pour l'objet
  montant: number = 0; // Montant de l'amende
  membre_id!: number; // ID du membre concerné
}
