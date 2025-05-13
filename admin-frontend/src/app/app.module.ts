import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { DepartementsComponent } from './pages/departements/departements.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EtudiantsComponent } from './pages/etudiants/etudiants.component';
import { ApiService } from './services/api.service';
import { FavorisComponent } from './pages/favoris/favoris.component';
import { FormationCardComponent } from './components/formation-card/formation-card.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormationsComponent,
    DepartementsComponent,
    EtudiantsComponent,
    FavorisComponent,
    FormationCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()), ApiService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
