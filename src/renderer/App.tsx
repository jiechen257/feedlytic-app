import { RouterProvider } from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import { ConfigProvider } from 'antd';
import { useBoundStore } from '@/hooks/useBoundStore';
import { defaultTheme } from '../config/theme';
import RootRouter from '../routers';

const App = () => {
  const initAppStore = useBoundStore((s) => s.initAppStore);
  initAppStore();
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
