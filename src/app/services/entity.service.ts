import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }

  getDatas(entityName:String){
    return this.http.get(environment.apiUrl+entityName)
  }

  getDatasByPage(entityName:String , pageNumber: Number =1, pageLimit:Number = 5){
    return this.http.get(environment.apiUrl+entityName+"/by/page?pageNumber" +pageNumber+"&pageLimit="+pageLimit)
  }

  getDataById(entityName:String,id:String){
    return this.http.get(environment.apiUrl+entityName+"/"+id)
  }
}
