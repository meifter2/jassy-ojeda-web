import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header and navigation menu', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('header')).not.toBeNull();
    expect(element.querySelector('nav')).not.toBeNull();
    expect(element.querySelector('.menu-toggle')).not.toBeNull();
  });

  it('should expose the correct accessibility state when opening and closing', fakeAsync(() => {
    const element = fixture.nativeElement as HTMLElement;
    const menuToggle = element.querySelector('.menu-toggle') as HTMLButtonElement;
    const closeButton = element.querySelector('.close-btn') as HTMLButtonElement;
    const sidePanel = element.querySelector('.side-panel') as HTMLElement;

    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(menuToggle.getAttribute('aria-label')).toBe('Abrir menú');
    expect(sidePanel.getAttribute('aria-hidden')).toBe('true');
    expect(sidePanel.hasAttribute('inert')).toBeTrue();

    menuToggle.click();
    fixture.detectChanges();
    tick();

    expect(component.menuOpen).toBeTrue();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(menuToggle.getAttribute('aria-label')).toBe('Cerrar menú');
    expect(sidePanel.getAttribute('aria-hidden')).toBe('false');
    expect(sidePanel.hasAttribute('inert')).toBeFalse();

    closeButton.click();
    fixture.detectChanges();
    tick();

    expect(component.menuOpen).toBeFalse();
    expect(sidePanel.hasAttribute('inert')).toBeTrue();
  }));

  it('should close the menu when Escape is pressed', fakeAsync(() => {
    const menuToggle = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;

    menuToggle.click();
    fixture.detectChanges();
    tick();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    tick();

    expect(component.menuOpen).toBeFalse();
  }));

  it('should move focus into the menu and restore it when closing', fakeAsync(() => {
    const element = fixture.nativeElement as HTMLElement;
    const menuToggle = element.querySelector('.menu-toggle') as HTMLButtonElement;
    const closeButton = element.querySelector('.close-btn') as HTMLButtonElement;

    menuToggle.click();
    fixture.detectChanges();
    tick();

    expect(document.activeElement).toBe(closeButton);

    closeButton.click();
    fixture.detectChanges();
    tick();

    expect(document.activeElement).toBe(menuToggle);
  }));

  it('should mark social icons as decorative images', () => {
    const images = fixture.nativeElement.querySelectorAll(
      '.header-socials img',
    ) as NodeListOf<HTMLImageElement>;

    expect(images.length).toBe(2);
    images.forEach((image) => expect(image.getAttribute('alt')).toBe(''));
  });
});
