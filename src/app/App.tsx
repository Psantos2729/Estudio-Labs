import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Providers } from './Providers';
import { Layout } from './Layout';
import { MapPage } from '@/features/map/MapPage';
import { LoginPage } from '@/features/auth/LoginPage';

export function App() {
  return (
    <Providers>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<MapPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<p className="center muted">404 · esa ruta no existe</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
