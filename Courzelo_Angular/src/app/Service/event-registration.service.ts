import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { EventRegistration } from '../models/Event/EventRegistration';

@Injectable({
  providedIn: 'root'
})
export class EventRegistrationService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:6085/register'; // Adjust this URL based on your actual API endpoint
  private api = 'http://localhost:6085'; // Adjust this URL based on your actual API endpoint


  registerUserToEvents(userId: string, eventId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ userId, eventIds: [eventId] });
    return this.http.post(this.apiUrl, body, { headers })
      .pipe(
        catchError((error: any) => {
          throw 'Error in posting data: ' + error;
        })
      );
  }
  getEventRegistrations(): Observable<EventRegistration[]> {
    return this.http.get<EventRegistration[]>(this.api);
}

confirmRegistration(registrationId: string): Observable<any> {
  return this.http.post(`/api/confirm-registration/${registrationId}`, {});
}


  }
