import {Heading} from '@chakra-ui/react';
import {
  Route,
  Routes as Switch
} from 'react-router-dom';

import { GeneralLayout } from './layouts/General'

export const Routes = () => (
  <Switch>
    <Route path="/" element={<GeneralLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/movie" element={<BlankScreen />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Route>
  </Switch>
);

const BasePage = ({message}: {message: string}) => (<Heading as="h1" size="xl">{message}</Heading>);

const Home = () => (<BasePage message="Home page" />);

const BlankScreen = () => (<BasePage message="Empty Ooops!" />);

const Movie = () => (<BasePage message="Movie details" />);
