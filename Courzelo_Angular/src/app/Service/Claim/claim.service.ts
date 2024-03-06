import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Claim } from 'src/app/models/Claim/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }


  addClaim(data: Claim): Observable<any> {
    return this.http.post(`${this.apiUrl}/addClaim`, data);
  }

  getAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/retrieveallClaims`).pipe(
      catchError((error: any) => {
        console.error('Error retrieving claims:', error);
        return throwError(error); // Renvoie l'erreur pour qu'elle soit gérée par le composant appelant
      })
    );
  }
  deleteClaim(idclaim: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteClaim/${idclaim}`);
  }


}
