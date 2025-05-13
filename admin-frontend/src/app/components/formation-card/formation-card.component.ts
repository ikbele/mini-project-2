import { Component, Input, OnInit } from '@angular/core';
import { FavoriService } from '../../services/favori.service';
import { Favori } from '../../models/favori.model';
@Component({
  selector: 'app-formation-card',
  standalone: false,
  templateUrl: './formation-card.component.html',
  styleUrl: './formation-card.component.scss'
})
export class FormationCardComponent implements OnInit {
  @Input() formation: any;
  @Input() userId!: string;
  estFavori = false;

  constructor(private favoriService: FavoriService) {}

  ngOnInit() {
    this.favoriService.getFavoris(this.userId).subscribe(favoris => {
      this.estFavori = favoris.some(f => f.formationId === this.formation.id);
    });
  }

  toggleFavori() {
    if (this.estFavori) {
      this.favoriService.supprimerFavori(this.userId, this.formation.id).subscribe(() => {
        this.estFavori = false;
      });
    } else {
      const favori: Favori = {
        userId: this.userId,
        formationId: this.formation.id
      };
      this.favoriService.ajouterFavori(favori).subscribe(() => {
        this.estFavori = true;
      });
    }
  }

}
