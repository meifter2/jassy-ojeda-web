import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  @ViewChild('menuToggle')
  private menuToggle?: ElementRef<HTMLButtonElement>;

  @ViewChild('closeButton')
  private closeButton?: ElementRef<HTMLButtonElement>;

  menuOpen = false;

  toggleMenu(): void {
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }

    this.openMenu();
  }

  openMenu(): void {
    this.menuOpen = true;
    setTimeout(() => this.closeButton?.nativeElement.focus());
  }

  closeMenu(): void {
    if (!this.menuOpen) {
      return;
    }

    this.menuOpen = false;
    setTimeout(() => this.menuToggle?.nativeElement.focus());
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeMenu();
  }
}
