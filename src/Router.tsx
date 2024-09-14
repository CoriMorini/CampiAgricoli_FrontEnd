import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Homepage/Homepage';
import { Authentication } from './pages/Authentication/Authentication';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication onAuthenticate={() => { /* handle authentication */ }} />,
  },
  {
    path: '/home',
    element: <HomePage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
