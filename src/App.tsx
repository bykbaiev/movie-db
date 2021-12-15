import { ChakraProvider } from '@chakra-ui/react';
import { Spinner } from 'components/Spinner';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routes } from 'Routes';

export function App() {
  return (
    <Router>
      <RecoilRoot>
        <ChakraProvider resetCSS>
        <Suspense fallback={<Spinner />}>
          <div className="App">
            <Routes />
          </div>
          </Suspense>
        </ChakraProvider>
      </RecoilRoot>
    </Router>
  );
}
