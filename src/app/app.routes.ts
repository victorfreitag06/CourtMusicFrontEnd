import { Routes } from '@angular/router';
import { FormMusicaComponent } from './form-musica/form-musica.component';
import { MusicaComponent } from './musica/musica.component';

export const routes: Routes = [
    { path: 'musica', component: FormMusicaComponent },
    { path: 'home', component: MusicaComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ];