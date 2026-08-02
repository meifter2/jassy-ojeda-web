import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((module) => module.HomeComponent),
  },
  {
    path: 'videos',
    loadComponent: () =>
      import('./pages/videos/videos').then((module) => module.VideosComponent),
  },
  {
    path: 'album/coleccion-de-suenos',
    loadComponent: () =>
      import('./pages/album/coleccion-de-suenos/coleccion-de-suenos').then(
        (module) => module.ColeccionDeSuenosComponent,
      ),
  },
  {
    path: 'album/se-fue-el-verano',
    loadComponent: () =>
      import('./pages/album/se-fue-el-verano/se-fue-el-verano').then(
        (module) => module.SeFueElVeranoComponent,
      ),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contact/contact').then((module) => module.ContactoComponent),
  },
  { path: '**', redirectTo: '' },
];
