import { fetchUpcomingMovies } from 'api';
import { UpcomingMoviesState } from 'models/UpcomingMoviesState';
import { atom, AtomEffect } from 'recoil';

const upcomingMoviesEffect: AtomEffect<UpcomingMoviesState> = ({ setSelf }) => {
  setSelf({ tag: 'Loading' });
  setSelf(fetchUpcomingMovies());
};

export const UpcomingMovies = atom<UpcomingMoviesState>({
  key: 'UpcomingMovies',
  default: {
    tag: 'Initial'
  },
  effects_UNSTABLE: [upcomingMoviesEffect]
});
