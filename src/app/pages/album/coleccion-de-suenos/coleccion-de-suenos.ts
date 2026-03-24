import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type MemoryImage = {
  src: string;
  alt: string;
  size: 'big' | 'wide' | 'tall' | 'normal';
};

@Component({
  selector: 'app-coleccion-de-suenos',
  templateUrl: './coleccion-de-suenos.html',
  styleUrls: ['./coleccion-de-suenos.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ColeccionDeSuenosComponent implements OnInit {
  // HERO (portada)
  public heroImage = 'assets/images/Portadas/ColeccionDeSuenos.jpeg';

  /**
   * Ajusta la “posición vertical” del fondo del hero (portada)
   * - 50% = centrado
   * - 65%/75% = el encuadre baja (el título sube a una zona más limpia)
   */
  public heroFocusY = '72%';

  public galleryImages: GalleryImage[] = [
    {
      src: 'assets/images/caratulas/coleccion-de-suenos/coleccion-de-suenos.jpg',
      alt: 'Portada álbum',
      title: 'Portada Principal',
      description: 'La imagen que define el universo de Colección de Sueños',
    },
    {
      src: 'assets/images/caratulas/coleccion-de-suenos/golden.jpg',
      alt: 'Golden',
      title: 'Golden',
      description: 'Single destacado del álbum',
    },
    {
      src: 'assets/images/caratulas/coleccion-de-suenos/has-roto-mi-corazon.jpg',
      alt: 'Has Roto Mi Corazón',
      title: 'Has Roto Mi Corazón',
      description: 'La canción más personal del álbum',
    },
    {
      src: 'assets/images/caratulas/coleccion-de-suenos/intenso.jpg',
      alt: 'Intenso',
      title: 'Intenso',
      description: 'Explorando emociones profundas',
    },
    {
      src: 'assets/images/caratulas/coleccion-de-suenos/otro-lugar.jpg',
      alt: 'Otro Lugar',
      title: 'Otro Lugar',
      description: 'Buscando refugio en la música',
    },
    {
      src: 'assets/images/caratulas/coleccion-de-suenos/antes-de-caer.jpg',
      alt: 'Antes de Caer',
      title: 'Antes de Caer',
      description: 'El momento previo al cambio',
    },
  ];

  // ✅ Collage dinámico: mete aquí “todas” las fotos que quieras
  public eraMemories: MemoryImage[] = [
    { src: 'assets/images/collages/ColeccionDeSuenos/jassy-004.jpeg', alt: 'Ensayo de Colección de Sueños', size: 'big' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_6774.jpeg', alt: 'Detalles de la habitación', size: 'tall' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_8783.jpeg', alt: 'Grabación en estudio', size: 'normal' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_8271.jpeg', alt: 'Momentos con amigos', size: 'wide' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_6779.jpeg', alt: 'Juguetes y recuerdos de la infancia', size: 'normal' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_8230.jpeg', alt: 'Backstage', size: 'normal' },
    { src: 'assets/images/collages/ColeccionDeSuenos/DSC06152.jpeg', alt: 'Cartel', size: 'normal' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_8273.jpeg', alt: 'Foto vertical', size: 'big' },
    { src: 'assets/images/collages/ColeccionDeSuenos/IMG_6879.jpeg', alt: 'Grupo', size: 'normal' },
    { src: 'assets/images/Portadas/banda_temporada1.jpeg', alt: 'Grupo', size: 'tall' },
    { src: 'assets/images/collages/ColeccionDeSuenos/jassy_mafioso.jpeg', alt: 'Grupo', size: 'normal' }
  ];

  public selectedIndex = 0;
  public selectedImage = this.galleryImages[0]?.src ?? '';
  public selectedAlt = this.galleryImages[0]?.alt ?? '';
  public selectedTitle = this.galleryImages[0]?.title ?? '';
  public selectedDescription = this.galleryImages[0]?.description ?? '';
  public imageLoaded = false;

  ngOnInit(): void {
    this.preloadImages();
  }

  public scrollToSpotify(): void {
    document.getElementById('listen')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public openGallery(): void {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public selectImage(index: number): void {
    if (index < 0 || index >= this.galleryImages.length) return;

    this.selectedIndex = index;
    this.selectedImage = this.galleryImages[index].src;
    this.selectedAlt = this.galleryImages[index].alt;
    this.selectedTitle = this.galleryImages[index].title;
    this.selectedDescription = this.galleryImages[index].description;
    this.imageLoaded = false;
  }

  public onImageLoad(): void {
    this.imageLoaded = true;
  }

  private preloadImages(): void {
    for (const img of this.galleryImages) {
      const i = new Image();
      i.src = img.src;
    }
    for (const mem of this.eraMemories) {
      const i = new Image();
      i.src = mem.src;
    }
  }
}
