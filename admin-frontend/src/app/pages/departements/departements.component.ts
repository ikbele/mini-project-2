import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service'; 
@Component({
  selector: 'app-departements',
  standalone: false,
  templateUrl: './departements.component.html',
  styleUrl: './departements.component.scss'
})
export class DepartementsComponent implements OnInit{
 departements: any[] = [];
  nouveauDepartement = { nom: '', description: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.api.getDepartements().subscribe(data => this.departements = data);
  }

  ajouterDepartement(): void {
    this.api.ajouterDepartement(this.nouveauDepartement).subscribe(() => {
      this.nouveauDepartement = { nom: '', description: '' };
      this.loadDepartements();
    });

}
supprimerDepartement(id: number): void {
  this.api.deleteDepartement(id).subscribe(() => this.loadDepartements());
}
}
