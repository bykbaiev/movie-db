import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import {Routes} from './Routes';

export function App() {
  return (
    <Router>
      <RecoilRoot>
        <div className="App">
          <Routes />
        </div>
      </RecoilRoot>
    </Router>
  );
}
