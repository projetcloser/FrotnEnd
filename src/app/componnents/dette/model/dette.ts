export class Dette {
  id!: number;
  membre_id!: number;  // Référence au membre concerné
  montant: number = 0;  // Montant de la dette
  date_echeance:number = new Date().getFullYear(); // Année de la dette;  // Date limite pour payer
  statut: string= "impayée";;  // Statut : "non payé" ou "payé"
  created_at!: Date;  // Date de création de la dette
}
