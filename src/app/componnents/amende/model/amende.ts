export class Amende {

  id!: number;
  fine_date: Date = new Date(); // Date d'enregistrement
  author: string = ""; // Session de l'utilisateur connecté
  object: string = ""; // Zone de texte pour l'objet
  amount: number = 0; // Montant de l'amende
  member_id!: number; // ID du membre concerné
}
