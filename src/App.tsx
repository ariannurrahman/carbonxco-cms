import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from 'routes';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
