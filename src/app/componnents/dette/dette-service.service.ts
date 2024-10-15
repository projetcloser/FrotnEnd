import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dette } from './model/dette';

@Injectable({
  providedIn: 'root'
})
export class DetteServiceService {

  private apiUrl = 'http://localhost:3000/dettes';  // URL du serveur JSON

  constructor(private http: HttpClient) {}

  getDettes(): Observable<Dette[]> {
    return this.http.get<Dette[]>(this.apiUrl);
  }

  addDette(dette: Dette): Observable<Dette> {
    return this.http.post<Dette>(this.apiUrl, dette);
  }

  updateDette(id: number, dette: Dette): Observable<Dette> {
    return this.http.put<Dette>(`${this.apiUrl}/${id}`, dette);
  }

  deleteDette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDetteById(id: number): Observable<Dette> {
    return this.http.get<Dette>(`${this.apiUrl}/${id}`);
  }

}
// C:\wamp64\bin\php\php8.1.0
