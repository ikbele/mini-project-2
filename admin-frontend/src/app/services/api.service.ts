import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:8000/etudiants/'; // Remplace avec ton URL FastAPI

  constructor(private http: HttpClient) {}

  // Étudiants
  getEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/etudiants`);
  }

  ajouterEtudiant(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/etudiants`, data);
  }

  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/etudiants/${id}`);
  }

  updateEtudiant(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/etudiants/${id}`, data);
  }
  getDepartements() {
    return this.http.get<any[]>('/api/departements');
  }

  ajouterDepartement(departement: any) {
    return this.http.post('/api/departements', departement);
  }

  deleteDepartement(id: number) {
    return this.http.delete(`/api/departements/${id}`);
  }
  getStats(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/stats`);
}

getFormations(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/formations`);
}

// Méthode pour ajouter une formation
ajouterFormation(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/formations`, data);
}

// Méthode pour supprimer une formation
deleteFormation(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/formations/${id}`);
}
  // Pareil pour formations, départements, stats...
}
