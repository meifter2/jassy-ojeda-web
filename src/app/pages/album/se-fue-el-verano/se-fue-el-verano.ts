import { Component } from '@angular/core';
import { AlbumGalleryComponent } from '../shared/album-gallery/album-gallery';
import { GalleryImage, MemoryImage } from '../shared/album-gallery/album-gallery.models';

@Component({
  selector: 'app-se-fue-el-verano',
  templateUrl: './se-fue-el-verano.html',
  styleUrls: ['./se-fue-el-verano.scss'],
  standalone: true,
  imports: [AlbumGalleryComponent],
})
export class SeFueElVeranoComponent {
  public galleryImages: GalleryImage[] = [
    {
      src: 'assets/images/caratulas/se-fue-el-verano/SeFueElVerano.webp',
      alt: 'Portada principal Se Fue El Verano',
      title: 'El Adiós al Sol',
      description:
        'Concepto visual del fin de la temporada - La portada principal captura la nostalgia del último atardecer de verano',
    },
    {
      src: 'assets/images/caratulas/se-fue-el-verano/baile-del-calor.webp',
      alt: 'Portada alternativa playa',
      title: 'Horizonte Dorado',
      description: 'Variante con tonos cálidos y reflejos en el agua - Edición especial para streaming',
    },
    {
      src: 'assets/images/caratulas/se-fue-el-verano/llega-el-sol.webp',
      alt: 'Portada alternativa atardecer',
      title: 'Crepúsculo Marino',
      description: 'Versión con enfoque en los colores del ocaso - Arte para plataformas digitales',
    },
    {
      src: 'assets/images/caratulas/se-fue-el-verano/alta-mar.webp',
      alt: 'Portada alternativa olas',
      title: 'Olas de Despedida',
      description: 'Diseño con texturas acuáticas - Arte conceptual para medios físicos',
    },
  ];

  public eraMemories: MemoryImage[] = [
    { src: 'assets/images/Portadas/jassy-tocando.webp', alt: '', size: 'big' },
    { src: 'assets/images/collages/SeFueElVerano/jassydj.webp', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/jassyflor.webp', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/jassypromocion.webp', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/colectivoojeda.webp', alt: '', size: 'tall' },
    { src: 'assets/images/collages/SeFueElVerano/jassymesa.webp', alt:"", size: 'big' }
  ];

  public scrollToSpotify(): void {
    document.getElementById('listen')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public openGallery(): void {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
