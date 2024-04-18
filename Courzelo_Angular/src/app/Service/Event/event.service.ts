import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Event } from 'src/app/models/Event/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/retrieveallevents`).pipe(
      catchError((error: any) => {
        console.error('Error retrieving events:', error);
        throw error; // Handle the error by the calling component
      })
    );
  }
  
  
  addEventWithSpeaker(event: Event, name: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addEventWithSpeaker/${name}`, event);
  }
  
  addEvent(event: Event): Observable<any> {
    return this.http.post(`${this.apiUrl}/addEvent`, event);
}

      
  deleteEvent(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deleteEvent/${id}`);
}

updateEvent(idevent: string, eventData: any): Observable<Event> {
  const url = `${this.apiUrl}/updateEvent/${idevent}`;
  return this.http.put<Event>(url, eventData);
}
retrieveEvent(idevent: string): Observable<Event> {
  const url = `${this.apiUrl}/retrieveEvent/${idevent}`;
  return this.http.get<Event>(url);
}

searchEventsByTitle(title: string): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.apiUrl}/search`, { params: { title: title } });
}

uploadEventPhoto(eventId: string, formData: FormData): Observable<any> {
  return this.http.post(`http://localhost:6085/uploadEventPhoto/${eventId}`, formData, { responseType: 'text' });
}
getAllEvents(page: number, itemsPerPage: number): Observable<any> {
  const params = new HttpParams()
    .set('page', page - 1) // API might expect page index starting from 0
    .set('size', itemsPerPage);

  return this.http.get(`${this.apiUrl}`, { params });
}
// Vous pourriez avoir une fonction comme ceci pour récupérer tous les événements, incluant leurs photos
getEventPhoto(idevent: string): Observable<string> {
  return this.http.get(`${this.apiUrl}/contenu/${idevent}`, { responseType: 'blob' }).pipe(
    map(blob => {
      const urlCreator = window.URL || window.webkitURL;
      return urlCreator.createObjectURL(blob);
    })
  );
}
getAllEventSorted(): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.apiUrl}/events`);
}
getTopParticipatedEvents(limit: number = 10): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.apiUrl}/top-participated?limit=${limit}`);
}

}














