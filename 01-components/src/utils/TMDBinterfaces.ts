export interface MovieData {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title?: string;
  name?: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Genres {
  id: number;
  name: string;
}

export interface Videos {
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: true;
    published_at: string;
    id: string;
  }[];
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Record<string, unknown>;
  budget: 0;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date?: string;
  first_air_date?: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface MovieResponse {
  page: number;
  results: MovieData[];
  total_results: number;
  total_pages: number;
}

export interface MovieReqData {
  num?: number;
  date: string;
  description: string;
  files: FileList;
  genres: {
    action: boolean;
    comedy: boolean;
    drama: boolean;
    fantasy: boolean;
    other: boolean;
  };
  title: string;
  score: string;
  type: string;
  viewed: boolean;
}

export interface MovieApiQuery {
  query?: string;
  currentPage: number;
  itemsPerPage: number;
  model: string;
  adult: string;
  year: string;
}
