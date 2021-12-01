<<<<<<< HEAD
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routes } from 'Routes';
import { Suspense } from 'react';
=======
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routes } from 'Routes';
import { createGlobalStyle } from 'styled-components'
>>>>>>> fc03a67 (feat(upcoming-movies): add movie list)

export function App() {
  return (
    <Router>
      <RecoilRoot>
        <ChakraProvider resetCSS>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="App">
            <Routes />
          </div>
          </Suspense>
        </ChakraProvider>
      </RecoilRoot>
    </Router>
  );
}
