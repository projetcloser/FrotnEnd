export class Dette {
  id!: number;
  membre_id!: number;  // Référence au membre concerné
  montant: number = 0;  // Montant de la dette
  date_echeance!: Date;  // Date limite pour payer
  statut!: string;  // Statut : "non payé" ou "payé"
  created_at!: Date;  // Date de création de la dette
}
