import {
  Route,
  Routes as Switch
} from 'react-router-dom';
import styled from 'styled-components';

export const Routes = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="/movie" element={<BlankScreen />} />
    <Route path="/movie/:id" element={<Movie />} />
  </Switch>
);

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Home = () => (<Title>Home page</Title>);

const BlankScreen = () => (<Title>Empty Ooops!</Title>);

const Movie = () => (<Title>Movie details</Title>);
