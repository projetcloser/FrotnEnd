import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { Caisse } from '../../models/caisse';
import { Observable, throwError } from 'rxjs';
import { Personnel } from '../personnel/personnel';

@Injectable({
  providedIn: 'root'
})
export class CaisseServiceService {

  private apiRecup =  environment.apiUrl+"personnels"
  private apiURL = environment.apiUrl+"cashflows";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Caisse[]> {
    return this.httpclient.get<any>(this.apiURL)
      .pipe(
        // map(response=> response.body.data),
        catchError(this.errorHandler)
      );
  }

  create(data: Caisse): Observable<any> {
    return this.httpclient.post(this.apiURL , JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<any> {
    return this.httpclient.get(this.apiURL +'/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // update(id: number, data: Caisse): Observable<any> {
  //   return this.httpclient.put(this.apiURL + '/' + id, JSON.stringify(data), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     );
  // }
  update(caisse: Caisse): Observable<Caisse> {
    return this.httpclient.put<Caisse>(`${this.apiURL}/${caisse.id}`, caisse);
  }

  delete(id: number) {
    return this.httpclient.delete(this.apiURL +'/'+ id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


   // Récupérer la liste des personnels
   getPersonnels(): Observable<Personnel[]> {
    return this.httpclient.get<Personnel[]>(this.apiRecup);
  }
}
