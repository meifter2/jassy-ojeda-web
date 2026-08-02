import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideosComponent } from './videos';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the videos page and its video items', () => {
    const element = fixture.nativeElement as HTMLElement;
    const renderedTitles = Array.from(element.querySelectorAll('.video-title')).map((title) =>
      title.textContent?.trim(),
    );

    expect(element.querySelector('.videos-page')).not.toBeNull();
    expect(element.querySelector('.videos-title')?.textContent).toContain('Mis vídeos');
    expect(element.querySelectorAll('.video-item').length).toBe(component.videos.length);
    expect(element.querySelectorAll('iframe').length).toBe(component.videos.length);
    expect(renderedTitles).toEqual(component.videos.map((video) => video.title));
    expect(element.querySelectorAll('iframe[referrerpolicy]').length).toBe(3);
  });
});
