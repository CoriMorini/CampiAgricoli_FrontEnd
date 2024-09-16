import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authentication } from './pages/Authentication/Authentication';
import { DashBoard } from './pages/DashBoard/DashBoard';
import { LogPage } from './pages/LogPage/LogPage';
import { ReportPage } from './pages/ReportPage/ReportPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { TrendPage } from './pages/TrendPage/TrendPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Authentication
        onAuthenticate={() => {
          /* handle authentication */
        }}
      />
    ),
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
    path: '/logPage',
    element: <LogPage />,
  },
  {
    path: '/settingsPage',
    element: <SettingsPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
