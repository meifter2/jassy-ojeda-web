// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { VideosComponent } from './pages/videos/videos';
import { ColeccionDeSuenosComponent } from './pages/album/coleccion-de-suenos/coleccion-de-suenos';
import { SeFueElVeranoComponent } from './pages/album/se-fue-el-verano/se-fue-el-verano';
// IMPORTA AQUÍ TU NUEVO COMPONENTE
import { ContactoComponent } from './pages/contact/contact'; 

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Página de vídeos
  { path: 'videos', component: VideosComponent },

  { path: 'album/coleccion-de-suenos', component: ColeccionDeSuenosComponent },

  { path: 'album/se-fue-el-verano', component: SeFueElVeranoComponent },

  // AÑADE ESTA LÍNEA PARA EL CONTACTO
  { path: 'contacto', component: ContactoComponent },

  // Redirección para cualquier ruta no encontrada
  { path: '**', redirectTo: '' }
];