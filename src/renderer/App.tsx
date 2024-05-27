import { RouterProvider } from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import { ConfigProvider } from 'antd';
import { defaultTheme } from '../config/theme';
import RootRouter from '../routers';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: defaultTheme,
      }}
    >
      <RouterProvider router={RootRouter} />
    </ConfigProvider>
  );
};

export default App;
