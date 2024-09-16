import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Homepage/Homepage';
import { Authentication } from './pages/Authentication/Authentication';
import { Report } from './pages/Report/Report';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication onAuthenticate={() => { /* handle authentication */ }} />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/report',
    element: <Report />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
