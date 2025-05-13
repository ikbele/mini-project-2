import { Component, OnInit } from '@angular/core';
import { FavoriService } from '../../services/favori.service';
import { Favori } from '../../models/favori.model';
@Component({
  selector: 'app-favoris',
  standalone: false,
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.scss'
})
export class FavorisComponent implements OnInit{
   userId = 'user123'; // À récupérer dynamiquement plus tard
  favoris: Favori[] = [];

  constructor(private favoriService: FavoriService) {}

  ngOnInit(): void {
    this.favoriService.getFavoris(this.userId).subscribe(favs => {
      this.favoris = favs;
    });
  }

}
