export type PersonId = number | undefined;

export type PersonDetails = {
  id?: number;
  birthday?: string | null;
  known_for_department?: string;
  deathday?: string | null;
  name?: string;
  also_known_as?: Array<string>;
  gender?: number;
  biography?: string;
  popularity?: number;
  place_of_birth?: string | null;
  profile_path?: string | null;
  adult?: boolean;
  imdb_id?: string;
  homepage?: string | null;
};
