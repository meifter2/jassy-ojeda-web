export type AlbumGalleryVariant = 'dreams' | 'summer';

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export type MemoryImage = {
  src: string;
  alt: string;
  size: 'big' | 'wide' | 'tall' | 'normal';
};
