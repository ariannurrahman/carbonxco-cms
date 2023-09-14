import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { message } from 'antd';

import AppRoutes from 'routes';
import { ErrorFallback } from 'layout/error-fallback';

import './App.scss';

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (isAxiosError(error)) {
          return message.error(`${error?.code}: ${error?.message}`);
        }
      },
    }),
  });

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
