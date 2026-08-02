import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColeccionDeSuenosComponent } from './coleccion-de-suenos';

describe('ColeccionDeSuenosComponent', () => {
  let component: ColeccionDeSuenosComponent;
  let fixture: ComponentFixture<ColeccionDeSuenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColeccionDeSuenosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColeccionDeSuenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the album title and gallery', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.album-title')?.textContent).toContain('Colección De Sueños');
    expect(element.querySelector('#gallery')).not.toBeNull();
    expect(element.querySelectorAll('.thumbnail-item').length).toBe(component.galleryImages.length);
  });
});
