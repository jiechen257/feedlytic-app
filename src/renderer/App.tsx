import { createHashRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import 'tailwindcss/tailwind.css';
import Hello from '../pages/Hello';
import ButtonDemo from '../components/button-demo';

const router = createHashRouter([
  {
    path: '/',
    element: <Hello />,
  },
  {
    path: 'demo',
    element: <ButtonDemo />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
  // return <div className="bg-gray-600">jiechen</div>;
}
