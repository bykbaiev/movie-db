import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routes } from 'Routes';

export function App() {
  return (
    <Router>
      <RecoilRoot>
        <ChakraProvider resetCSS>
          <div className="App">
            <Routes />
          </div>
        </ChakraProvider>
      </RecoilRoot>
    </Router>
  );
}
