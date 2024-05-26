import { createHashRouter, Navigate } from 'react-router-dom';
import PageContent from '../views/pageContent';
import Hello from '../views/Hello';
import LayoutIndex from '../layouts';

export const Router = createHashRouter([
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/',
        element: <Hello />,
      },
      {
        path: '/content',
        element: <PageContent />,
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  },
]);

export default Router;
