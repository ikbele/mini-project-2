import { Component , OnInit  } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-formations',
  standalone: false,
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.scss'
})
export class FormationsComponent implements OnInit{
 formations: any[] = [];
  nouvelleFormation = { titre: '', niveau: '' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.api.getFormations().subscribe(data => this.formations = data);
  }

  ajouterFormation(): void {
    this.api.ajouterFormation(this.nouvelleFormation).subscribe(() => {
      this.nouvelleFormation = { titre: '', niveau: '' };
      this.loadFormations();
    });
  }

  supprimerFormation(id: number): void {
    this.api.deleteFormation(id).subscribe(() => this.loadFormations());
  }
}
