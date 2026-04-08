import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coleccion-de-suenos',
  templateUrl: './coleccion-de-suenos.html',
  styleUrls: ['./coleccion-de-suenos.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ColeccionDeSuenosComponent implements OnInit {
  tracks = [
    { title: 'Golden', duration: '3:45' },
    { title: 'Has Roto Mi Corazón', duration: '4:12' },
    { title: 'Intenso', duration: '3:58' },
    { title: 'Otro Lugar', duration: '4:25' },
    { title: 'Antes de Caer', duration: '3:40' },
    { title: 'Colección de Sueños', duration: '4:30' }
  ];

  galleryImages = [
    { 
      src: 'assets/images/caratulas/coleccion-de-suenos/coleccion-de-suenos.webp', 
      alt: 'Portada álbum',
      title: 'Portada Principal',
      description: 'La imagen que define el universo de Colección de Sueños'
    },
    { 
      src: 'assets/images/caratulas/coleccion-de-suenos/golden.webp', 
      alt: 'Golden',
      title: 'Golden',
      description: 'Single destacado del álbum'
    },
    { 
      src: 'assets/images/caratulas/coleccion-de-suenos/has-roto-mi-corazon.webp', 
      alt: 'Has Roto Mi Corazón',
      title: 'Has Roto Mi Corazón',
      description: 'La canción más personal del álbum'
    },
    { 
      src: 'assets/images/caratulas/coleccion-de-suenos/intenso.webp', 
      alt: 'Intenso',
      title: 'Intenso',
      description: 'Explorando emociones profundas'
    },
    { 
      src: 'assets/images/caratulas/coleccion-de-suenos/otro-lugar.webp', 
      alt: 'Otro Lugar',
      title: 'Otro Lugar',
      description: 'Buscando refugio en la música'
    },
    { 
      src: 'assets/images/caratulas/coleccion-de-suenos/antes-de-caer.webp', 
      alt: 'Antes de Caer',
      title: 'Antes de Caer',
      description: 'El momento previo al cambio'
    }
  ];

  currentTrack = 0;
  selectedIndex = 0;
  selectedImage = this.galleryImages[0].src;
  selectedAlt = this.galleryImages[0].alt;
  selectedTitle = this.galleryImages[0].title;
  selectedDescription = this.galleryImages[0].description;
  imageLoaded = false;

  ngOnInit() {
    // Simular reproducción de música
    setInterval(() => {
      this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    }, 5000);
  }

  scrollToSpotify() {
    const element = document.getElementById('listen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openGallery() {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  selectImage(index: number) {
    this.selectedIndex = index;
    this.selectedImage = this.galleryImages[index].src;
    this.selectedAlt = this.galleryImages[index].alt;
    this.selectedTitle = this.galleryImages[index].title;
    this.selectedDescription = this.galleryImages[index].description;
    this.imageLoaded = false;
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}