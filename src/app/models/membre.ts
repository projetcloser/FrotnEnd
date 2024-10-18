export class Membre {
  id!: number;
  matricule: string = "";
  lastname: string = "";
  firstname: string = "";
  email:string ="";
  order_number:string =""
  picture?: File[];
  folder?: File[];
  debt: string = "";
  phone: string = "";
  phone_2: string = "";
  author: string = "";
  gender: string = "";
  status?: number;
  open_close?:boolean;
  city_id?:number;
  country_id?:number;
  created_at!: Date;
}

