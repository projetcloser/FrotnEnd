import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NonPaye } from './non-paye';

@Injectable({
  providedIn: 'root'
})
export class NonPayeService {

  private apiUrl = 'http://localhost:3000/attestations_companies';

  constructor(private http: HttpClient) { }

  getAttestations(): Observable<NonPaye[]> {
    return this.http.get<NonPaye[]>(this.apiUrl);
  }

  getAttestation(id: number): Observable<NonPaye> {
    return this.http.get<NonPaye>(`${this.apiUrl}/${id}`);
  }

  createAttestation(attestation: NonPaye): Observable<NonPaye> {
    return this.http.post<NonPaye>(this.apiUrl, attestation);
  }

  updateAttestation(id: number, attestation: NonPaye): Observable<NonPaye> {
    return this.http.put<NonPaye>(`${this.apiUrl}/${id}`, attestation);
  }

  deleteAttestation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
