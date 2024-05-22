import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import 'tailwindcss/tailwind.css';
import Hello from '../pages/Hello';
import ButtonDemo from '../components/button-demo';
// <Router>
//   <Routes>
//     <Route path="/demo" element={<Hello />} />
//     <Route path="/" element={<ButtonDemo />} />
//   </Routes>
// </Router>

const router = createBrowserRouter([
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
}
