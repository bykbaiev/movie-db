import { Genre } from './Genre';

export type MovieId = number | undefined;

export type Movie = {
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: Array<number>;
  id?: MovieId;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
};

export type ProductionCompany = {
  name?: string;
  id?: number;
  logo_path?: string | null;
  origin_country?: string;
}

export type ProductionCountry = {
  iso_3166_1?: string;
  name?: string;
}

export type SpokenLanguage = {
  iso_639_1?: string;
  name?: string;
}

export type MovieDetails = {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: Record<string, string | number> | null;
  budget?: number;
  genres?: Array<Genre>;
  homepage?: string | null;
  id?: MovieId;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: Array<ProductionCompany>;
  production_countries?: Array<ProductionCountry>;
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: Array<SpokenLanguage>;
  status?: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
