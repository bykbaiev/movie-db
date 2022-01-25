import { Genre } from './Genre';
import { ProductionCompany, ProductionCountry } from './Movie';

export type TVShowId = number | undefined;

export type TVShow = {
  poster_path?: string;
  overview?: string;
  genre_ids?: Array<number>;
  id?: TVShowId;
  original_language?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  vote_average?: number;
  first_air_date?: string;
  origin_country?: Array<string>;
  name?: string;
  original_name?: string;
};

type Creator = {
  id?: number;
  credit_id?: string;
  name?: string;
  gender?: number;
  profile_path?: string | null;
};

export type TVShowDetails = {
  backdrop_path?: string | null;
  genres?: Array<Genre>;
  id?: TVShowId;
  created_by?: Array<Creator>;
  episode_run_time?: Array<number>;
  first_air_date?: string;
  name?: string;
  homepage?: string;
  in_production?: boolean;
  languages?: Array<string>;
  last_air_date?: string;
  last_episode_to_air?: {
    air_date?: string;
    episode_number?: number;
    id?: number;
    name?: string;
    overview?: string;
    production_code?: string;
    season_number?: number;
    still_path?: string | null;
    vote_average?: number;
    vote_count?: number;
  };
  next_episode_to_air?: null;
  networks?: Array<ProductionCompany>;
  number_of_episodes?: number;
  number_of_seasones?: number;
  origin_country?: Array<string>;
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: Array<ProductionCompany>;
  production_countries?: Array<ProductionCountry>;
  seasons?: Array<{
    air_date?: string;
    episode_count?: number;
    id?: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    season_number?: number;
  }>;
  spoken_languages: Array<{
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }>;
  status?: string;
  tagline?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
};
