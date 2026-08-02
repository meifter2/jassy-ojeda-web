import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumGalleryComponent } from './album-gallery';
import { GalleryImage, MemoryImage } from './album-gallery.models';

describe('AlbumGalleryComponent', () => {
  const images: GalleryImage[] = [
    {
      src: 'assets/images/first.webp',
      alt: 'Primera imagen',
      title: 'Primera',
      description: 'Primera descripción',
    },
    {
      src: 'assets/images/second.webp',
      alt: 'Segunda imagen',
      title: 'Segunda',
      description: 'Segunda descripción',
    },
  ];
  const memories: MemoryImage[] = [
    { src: 'assets/images/memory.webp', alt: 'Recuerdo', size: 'wide' },
  ];

  let component: AlbumGalleryComponent;
  let fixture: ComponentFixture<AlbumGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumGalleryComponent);
    fixture.componentRef.setInput('images', images);
    fixture.componentRef.setInput('memories', memories);
    fixture.componentRef.setInput('heading', 'Universo visual');
    fixture.componentRef.setInput('description', 'Arte del álbum');
    fixture.componentRef.setInput('memoriesHeading', 'Recuerdos');
    fixture.componentRef.setInput('memoriesDescription', 'Momentos de la etapa');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the supplied content', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h2')?.textContent).toContain('Universo visual');
    expect(element.querySelectorAll('.thumbnail-item').length).toBe(images.length);
    expect(element.querySelectorAll('.memory-item').length).toBe(memories.length);
  });

  it('should lazy-load and asynchronously decode gallery images', () => {
    const renderedImages = fixture.nativeElement.querySelectorAll(
      '.album-gallery img',
    ) as NodeListOf<HTMLImageElement>;

    expect(renderedImages.length).toBeGreaterThan(0);
    renderedImages.forEach((image) => {
      expect(image.loading).toBe('lazy');
      expect(image.decoding).toBe('async');
    });
  });

  it('should select another gallery image', () => {
    const thumbnails = fixture.nativeElement.querySelectorAll(
      '.thumbnail-item',
    ) as NodeListOf<HTMLElement>;

    thumbnails[1].click();
    fixture.detectChanges();

    expect(component.selectedIndex()).toBe(1);
    expect((fixture.nativeElement as HTMLElement).querySelector('.main-image img')?.getAttribute('src'))
      .toBe(images[1].src);
  });

  it('should apply the summer variant', () => {
    fixture.componentRef.setInput('variant', 'summer');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.album-gallery--summer')).not.toBeNull();
    expect(element.querySelector('.summer-divider')).not.toBeNull();
    expect(element.querySelector('.summer-thumb')).not.toBeNull();
    expect(element.querySelector('.summer-tilt')).not.toBeNull();
  });
});
