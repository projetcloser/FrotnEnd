export class AttestPersonnel {

  id!:number
  author: string ="";
  ref_dem_part: string ="";
  date_certification!: Date;
  amount!: number;
  open_close!:boolean;
  status?:number;
  object :string="usage personnel";
  member_id!:number;
  cashflow_id!:number;
  staff_id!:number;
  created_at?:Date;
  updated_at?:Date
}
// email:string="";
// nui:string="";
// country_id!:number;
// city_id!:number;
// phone: string="";
// contact_person:string="";
//   contact_person_phone:string ="";
//   neighborhood:string="";
//   social_reason:string="";
