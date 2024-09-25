import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authentication } from './pages/Authentication/Authentication';
import { DashBoard } from './pages/DashBoard/DashBoard';
import { ReportPage } from './pages/ReportPage/ReportPage';
import { MicrocontrolloriPage } from './pages/MicrocontrolloriPage/MicrocontrolloriPage';
import { TrendPage } from './pages/TrendPage/TrendPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
  },
  {
    path: '/reportPage',
    element: <ReportPage />,
  },
  {
    path: '/trendPage',
    element: <TrendPage />,
  },
  {
    path: '/microcontrolloriPage',
    element: <MicrocontrolloriPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
