import { Component , OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit  {
  totalEtudiants = 0;
  totalFormations = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStats().subscribe(stats => {
      this.totalEtudiants = stats.total_etudiants;
      this.totalFormations = stats.total_formations;
    });
  }

}
