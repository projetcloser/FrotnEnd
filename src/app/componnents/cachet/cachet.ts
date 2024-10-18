export class Cachet {
  id!: number;
  member_id!: number;
  receipt_number: string = "";
  status!: number; // 1: en cours de fabrication, 2: disponible, 3: envoyée, 4: livrée
  city_id!: number;
  phone: string = "";
  year!: number;
  author: string = "";
}
