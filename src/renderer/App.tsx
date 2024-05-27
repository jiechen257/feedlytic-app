import { RouterProvider } from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import { ConfigProvider } from 'antd';
import { defaultTheme } from '../config/theme';
import RootRouter from '../routers';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: defaultTheme,
      }}
    >
      <RouterProvider router={RootRouter} />
    </ConfigProvider>
  );
  // return <div className="bg-gray-600">jiechen</div>;
}
