// src/app/pages/album/se-fue-el-verano/se-fue-el-verano.component.ts
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
  size: 'big' | 'wide' | 'normal' | 'tall';
};

@Component({
  selector: 'app-se-fue-el-verano',
  templateUrl: './se-fue-el-verano.html',
  styleUrls: ['./se-fue-el-verano.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SeFueElVeranoComponent implements OnInit {
  public galleryImages: GalleryImage[] = [
    {
      src: 'assets/images/caratulas/se-fue-el-verano/SeFueElVerano.jpg',
      alt: 'Portada principal Se Fue El Verano',
      title: 'El Adiós al Sol',
      description:
        'Concepto visual del fin de la temporada - La portada principal captura la nostalgia del último atardecer de verano',
    },
    {
      src: 'assets/images/caratulas/se-fue-el-verano/baile-del-calor.jpg',
      alt: 'Portada alternativa playa',
      title: 'Horizonte Dorado',
      description: 'Variante con tonos cálidos y reflejos en el agua - Edición especial para streaming',
    },
    {
      src: 'assets/images/caratulas/se-fue-el-verano/llega-el-sol.jpg',
      alt: 'Portada alternativa atardecer',
      title: 'Crepúsculo Marino',
      description: 'Versión con enfoque en los colores del ocaso - Arte para plataformas digitales',
    },
    {
      src: 'assets/images/caratulas/se-fue-el-verano/alta-mar.jpg',
      alt: 'Portada alternativa olas',
      title: 'Olas de Despedida',
      description: 'Diseño con texturas acuáticas - Arte conceptual para medios físicos',
    },
  ];

  public eraMemories: MemoryImage[] = [
    { src: 'assets/images/Portadas/jassy-tocando.jpeg', alt: '', size: 'big' },
    { src: 'assets/images/collages/SeFueElVerano/jassydj.jpeg', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/jassyflor.jpg', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/jassypromocion.jpg', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/colectivoojeda.jpg', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/jassymesa.jpg', alt:"", size: 'big' }
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
