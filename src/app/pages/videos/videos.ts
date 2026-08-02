import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VIDEOS, Video } from './videos.data';

type VideoViewModel = Omit<Video, 'embedUrl'> & {
  embedUrl: SafeResourceUrl;
};

@Component({
  selector: 'app-videos',
  standalone: true,
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class VideosComponent {
  private readonly sanitizer = inject(DomSanitizer);

  public readonly videos: readonly VideoViewModel[] = VIDEOS.map((video) => ({
    ...video,
    embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl),
  }));
}
