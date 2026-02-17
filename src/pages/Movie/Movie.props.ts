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
  name: string;
  description?: string;
  rating?: Rating;
  poster?: Poster;
  type?: string;
  premiere?: Premiere;
  movieLength?: number;
  genres?: Genre[];
}