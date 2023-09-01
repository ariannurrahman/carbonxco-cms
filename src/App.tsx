import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';
import { useAuth } from 'hooks/useAuth';
import AppRoutes from 'routes';

import './App.scss';

function App() {
  const { user, setUser } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <AuthContext.Provider value={{ user, setUser }}>
          <AppRoutes />
        </AuthContext.Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
