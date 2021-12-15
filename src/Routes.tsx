import { Heading } from '@chakra-ui/react';
import { MovieListSkeleton } from 'components/MovieList';
import { PopularMoviesList } from 'containers/PopularMovies';
import { UpcomingMoviesList } from 'containers/UpcomingMovies';
import { COLOR } from 'css-constants';
import { GeneralLayout } from 'layouts/General'
import { Suspense } from 'react';
import {
  Route,
  Routes as Switch
} from 'react-router-dom';

export const Routes = () => (
  <Switch>
    <Route path='/' element={<GeneralLayout />}>
      <Route path='*' element={<BlankScreen />} />
      <Route path='/' element={<Home />} />
      <Route path='/movie' element={<BlankScreen />} />
      <Route path='/movie/:id' element={<Movie />} />
    </Route>
  </Switch>
);

const BasePage = ({ message }: { message: string }) => (<Heading color={COLOR.WHITE} as='h1' size='xl'>{message}</Heading>);

const Home = () => (
  <>
    <Suspense fallback={<MovieListSkeleton />}>
      <UpcomingMoviesList />
    </Suspense>

    <Suspense fallback={<MovieListSkeleton />}>
      <PopularMoviesList />
    </Suspense>
  </>
);

const BlankScreen = () => (<BasePage message='Empty Ooops!' />);

const Movie = () => (<BasePage message='Movie details' />);
