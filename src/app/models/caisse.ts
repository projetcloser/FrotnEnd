export class Caisse {
  id!: number;
  code: string = "";
  name: string = "";
  balance!: number;  // Use number for frontend
  personnel_id!: number;  // Foreign key
  open_close!: boolean;
  created_at?: Date;
  updated_at?: Date;
}
