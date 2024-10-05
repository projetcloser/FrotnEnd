export class Entreprise {
  id!:number;
  name:string="";
  author: string ="";
  type: string ="";
  email:string="";
  nui:string="";
  country_id!:number;
  city_id!:number;
  phone: string="";
  status?:number;
  contact_person:string="";
  contact_person_phone:string ="";
  neighborhood:string="";
  created_at?:Date;
  social_reason:string="";
  updated_at?:Date

}
