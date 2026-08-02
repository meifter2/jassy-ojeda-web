import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main home sections', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('#hero')).not.toBeNull();
    expect(element.querySelector('#conciertos')).not.toBeNull();
    expect(element.querySelector('#bio')).not.toBeNull();
  });

  it('should prioritize the hero image and lazy-load the biography image', () => {
    const element = fixture.nativeElement as HTMLElement;
    const heroImage = element.querySelector('.hero-image') as HTMLImageElement;
    const biographyImage = element.querySelector('.bio-right img') as HTMLImageElement;

    expect(heroImage.getAttribute('fetchpriority')).toBe('high');
    expect(heroImage.loading).toBe('eager');
    expect(heroImage.getAttribute('width')).toBe('1920');
    expect(heroImage.getAttribute('height')).toBe('640');
    expect(biographyImage.loading).toBe('lazy');
    expect(biographyImage.decoding).toBe('async');
  });

  it('should render the concerts from data without the commented example', () => {
    const element = fixture.nativeElement as HTMLElement;
    const renderedConcerts = Array.from(element.querySelectorAll<HTMLElement>('.gig'));
    const cocheraConcert = renderedConcerts.find((concert) =>
      concert.querySelector('.gig__venue')?.textContent?.includes('Cochera Cabaret'),
    );

    expect(renderedConcerts.length).toBe(component.concerts.length);
    expect(element.querySelectorAll('.gig--upcoming').length).toBe(0);
    expect(cocheraConcert?.classList.contains('gig--past')).toBeTrue();
    expect(cocheraConcert?.querySelector('.gig__badge')?.textContent).toContain(
      'Concierto realizado',
    );
  });
});
