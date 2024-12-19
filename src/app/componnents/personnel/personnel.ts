

export class Personnel {
  id!: number;
  statut!: number; // Ex: 1 pour actif, 0 pour inactif
  lastname: string = '';
  firstname: string = '';
  author: string = '';
  email: string = '';
  date_card_validity?: Date; // Date de validité de la carte (optionnel)
  phone?: string; // Numéro de téléphone (optionnel)
  phone2?: string; // Deuxième numéro de téléphone (optionnel)
  father_name?: string; // Nom du père (optionnel)
  father_phone?: string; // Téléphone du père (optionnel)
  mother_name?: string; // Nom de la mère (optionnel)
  birthday!: Date; // Format de date : 'YYYY-MM-DD'
  place_birth?: string; // Lieu de naissance (optionnel)
  profession?: string; // Profession (optionnel)
  gender!: string; // 'male' ou 'female'
  contract_type!: string; // 'CDD', 'CDI', 'TEMPORAIRE'
  marital_status?: string; // 'married' ou 'celibataire' (optionnel)
  position?: string; // Poste occupé (optionnel)
  num_children?: number; // Nombre d'enfants (optionnel)
  // open_close: boolean = 0; // Ouvert/fermé (true/false)
  city_id!: number; // ID de la ville (clé étrangère)
  country_id!: number; // ID du pays (clé étrangère)
  attachment_file?: File[]; // Fichier d'attachement (optionnel)
  created_at?: Date; // Date de création (optionnel)
  updated_at?: Date; // Date de mise à jour (optionnel)
}

