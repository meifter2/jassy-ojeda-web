import { afterNextRender, Component, computed, input, signal } from '@angular/core';
import { AlbumGalleryVariant, GalleryImage, MemoryImage } from './album-gallery.models';

@Component({
  selector: 'app-album-gallery',
  templateUrl: './album-gallery.html',
  styleUrl: './album-gallery.scss',
})
export class AlbumGalleryComponent {
  public readonly images = input.required<readonly GalleryImage[]>();
  public readonly memories = input.required<readonly MemoryImage[]>();
  public readonly heading = input.required<string>();
  public readonly description = input.required<string>();
  public readonly memoriesHeading = input.required<string>();
  public readonly memoriesDescription = input.required<string>();
  public readonly variant = input<AlbumGalleryVariant>('dreams');

  public readonly selectedIndex = signal(0);
  public readonly selectedImage = computed(() => this.images()[this.selectedIndex()] ?? null);
  public readonly imageLoaded = signal(false);

  constructor() {
    afterNextRender(() => this.preloadImages());
  }

  public selectImage(index: number): void {
    if (index < 0 || index >= this.images().length) return;

    this.selectedIndex.set(index);
    this.imageLoaded.set(false);
  }

  public onImageLoad(): void {
    this.imageLoaded.set(true);
  }

  private preloadImages(): void {
    for (const image of [...this.images(), ...this.memories()]) {
      const preload = new Image();
      preload.src = image.src;
    }
  }
}
