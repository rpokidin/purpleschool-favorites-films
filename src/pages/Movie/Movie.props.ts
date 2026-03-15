export interface Genre {
  name: string;
}

export interface Poster {
  previewUrl: string;
}

export interface Premiere {
  world?: string;
}

export interface Rating {
  imdb?: number;
}

export interface MovieData {
  id: number; 
  name: string;
  description?: string;
  rating?: {
    imdb?: number;
  };
  poster?: {
    previewUrl?: string;
  };
  type?: string;
  premiere?: {
    world?: string;
  };
  movieLength?: number;
  genres?: Array<{ name: string }>;
}