import { atom, AtomEffect } from 'recoil';

import { fetchUpcomingMovies } from '../../api';
import { UpcomingMoviesState } from '../../models/UpcomingMoviesState';

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
