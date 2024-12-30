export class NonPaye {
  id!: number;
  member_id!: number;
  ref_dem_part?:string;
  payment_amount!: number;
  cashflow_id!: number;
  year: string = "";
  company_id!: number;
  motif: string = "";
  status!: number; // 1: non payé, 2: initier, 3: payé
  author: string = "";
  created_at?:Date;
}


