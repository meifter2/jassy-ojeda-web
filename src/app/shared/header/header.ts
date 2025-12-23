// src/app/shared/header/header.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importado para routerLink

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  // controla si el menú de "Proyectos" está abierto o cerrado
  projectsMenuOpen = false;

  // alterna el estado al hacer clic
  toggleProjectsMenu(): void {
    this.projectsMenuOpen = !this.projectsMenuOpen;
  }
}
