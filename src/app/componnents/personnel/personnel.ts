export class Personnel {
  id!: number;
  statut: string = ''; // 'married' or 'celibataire'
  lastname: string = '';
  firstname: string = '';
  email: string = '';
  date_card_validity: string = '';
  phone: string = '';
  father_name: string = '';
  father_phone: string = '';
  mother_name: string = '';
  birthday: string = ''; // Date format: 'YYYY-MM-DD'
  place_birth: string = '';
  profession: string = '';
  genre: string = ''; // 'male' or 'female'
  contract_type: string = '';
  marital_status: string = ''; // married or celibataire
  position: string = '';
  num_children: number = 0;
  open_close: boolean = false;
  city_id!: number; // Foreign key
  country_id!: number; // Foreign key
  attachment?: File[]; // Attachment field for file upload
  created_at?: Date;
  updated_at?: Date;
}
