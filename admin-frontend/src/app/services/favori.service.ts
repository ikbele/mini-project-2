import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favori } from '../models/favori.model';
@Injectable({
  providedIn: 'root'
})
export class FavoriService {
private apiUrl = 'http://localhost:8080/api/favoris';

  constructor(private http: HttpClient) {}

  getFavoris(userId: string): Observable<Favori[]> {
    return this.http.get<Favori[]>(`${this.apiUrl}/${userId}`);
  }

  ajouterFavori(favori: Favori): Observable<Favori> {
    return this.http.post<Favori>(this.apiUrl, favori);
  }

  supprimerFavori(userId: string, formationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?userId=${userId}&formationId=${formationId}`);
  }
}
