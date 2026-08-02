import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeFueElVeranoComponent } from './se-fue-el-verano';

describe('SeFueElVeranoComponent', () => {
  let component: SeFueElVeranoComponent;
  let fixture: ComponentFixture<SeFueElVeranoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeFueElVeranoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeFueElVeranoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the album title and gallery', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.album-title')?.textContent).toContain('Se Fue El Verano');
    expect(element.querySelector('#gallery')).not.toBeNull();
    expect(element.querySelectorAll('.thumbnail-item').length).toBe(component.galleryImages.length);
  });
});
