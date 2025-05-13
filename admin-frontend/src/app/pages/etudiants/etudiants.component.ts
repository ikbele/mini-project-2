import { Component , OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-etudiants',
  standalone: false,
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.scss'
})
export class EtudiantsComponent implements OnInit {
 isEdit = false;
  etudiantEnEdition: any = null;
  etudiants: any[] = [];  // Ajoute cette ligne pour stocker les étudiants
  nouvelEtudiant = { nom: '', email: '', age: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.api.getEtudiants().subscribe(data => this.etudiants = data);
  }

  ajouterEtudiant(): void {
    this.api.ajouterEtudiant(this.nouvelEtudiant).subscribe(() => {
      this.nouvelEtudiant = { nom: '', email: '', age: null };
      this.loadEtudiants();
    });
  }

  supprimerEtudiant(id: number): void {
    this.api.deleteEtudiant(id).subscribe(() => this.loadEtudiants());
  }

  modifierEtudiant(etudiant: any): void {
    this.isEdit = true;
    this.etudiantEnEdition = { ...etudiant };
  }

  validerModification(): void {
    this.api.updateEtudiant(this.etudiantEnEdition.id, this.etudiantEnEdition)
      .subscribe(() => {
        this.isEdit = false;
        this.etudiantEnEdition = null;
        this.loadEtudiants();
      });
  }

  annulerEdition(): void {
    this.isEdit = false;
    this.etudiantEnEdition = null;
  }
}
