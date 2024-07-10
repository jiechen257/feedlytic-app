import { createHashRouter, Navigate } from 'react-router-dom';
import LayoutIndex from '@/layouts';
import ListView from '@/pages/feedView/list';
import CardView from '@/pages/feedView/card';
import MagazineView from '@/pages/feedView/magazine';
import NotFound from '@/pages/ErrorMessage/404';

const appRoutes = [
  {
    path: '/',
    element: <Navigate to="/list" />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

const moduleRoutes = [
  {
    path: '/list',
    element: <ListView />,
  },
  {
    path: '/card',
    element: <CardView />,
  },
  {
    path: '/magazine',
    element: <MagazineView />,
  },
];

export const Router = createHashRouter([
  {
    element: <LayoutIndex />,
    children: [...appRoutes, ...moduleRoutes],
  },
]);

export default Router;
