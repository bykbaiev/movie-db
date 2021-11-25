import {
  Route,
  Routes as Switch
} from 'react-router-dom';

export const Routes = () => (
  <Switch>
    <Route path="/" element={<Home />} />
    <Route path="/movie" element={<BlankScreen />} />
    <Route path="/movie/:id" element={<Movie />} />
  </Switch>
);

const Home = () => (<div>Home page</div>);

const BlankScreen = () => (<div>Empty Ooops!</div>);

const Movie = () => (<div>Movie details</div>);
