export class Payment {

  id?: number;
  transaction_id?: number;
  cotisation_id?: number;
  company_attestation_id?: number;
  member_id!: number;
  customer_name?: string;
  amount!: number;
  description: string = "";
  customer_surname: string = "";
  currency: string = "";
  created_at?: Date;
}

