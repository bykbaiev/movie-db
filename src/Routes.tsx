import { Heading } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { UpcomingMoviesList } from 'containers/UpcomingMovies';
import { GeneralLayout } from 'layouts/General'
import {
  Route,
  Routes as Switch
} from 'react-router-dom';

export const Routes = () => (
  <Switch>
    <Route path="/" element={<GeneralLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/movie" element={<BlankScreen />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Route>
  </Switch>
);

const BasePage = ({ message }: { message: string }) => (<Heading color={COLOR.WHITE} as="h1" size="xl">{message}</Heading>);

const Home = () => (
  <>
    <BasePage message="Home page" />
    <UpcomingMoviesList />
  </>
);

const BlankScreen = () => (<BasePage message="Empty Ooops!" />);

const Movie = () => (<BasePage message="Movie details" />);
