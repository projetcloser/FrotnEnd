export class Postulant {
  id!:number;
  firstname:string ="";
  lastname:string ="";
  author:string="";
  phone:string ="";
  email:string ="";
  nui:string ="";
  date_card_validity?:Date;
  date_naiss?:Date;
  country_id?:number;
  city_id!:number;
  lieuNaiss:string ="";
  neighborhood:string =""
  child!:number;
  profession:string =""
  genre:string=""
  status?:number;
  marital_status:string ="";
  created_at?:Date;
  year?:Date;
}
