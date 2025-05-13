import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EtudiantsComponent } from './pages/etudiants/etudiants.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { DepartementsComponent } from './pages/departements/departements.component';

const routes: Routes = [ 
  
  { path: 'dashboard', component: DashboardComponent },
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'departements', component: DepartementsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
