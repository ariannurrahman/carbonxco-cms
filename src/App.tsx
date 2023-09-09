import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import AppRoutes from 'routes';
import { ErrorFallback } from 'layout/error-fallback';

import './App.scss';

function App() {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<p>Loading...</p>}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
