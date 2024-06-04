import React from 'react';
import { Layout, theme } from 'antd';
import './index.less';
import { Outlet } from 'react-router-dom';
import LayoutMenu from './components/Menu';
import LayoutHeader from './components/Header';
import LayoutFooter from './components/Footer';

const { Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="main">
      <Sider
        breakpoint="lg"
        width={256}
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <LayoutMenu />
      </Sider>
      <Layout className="bg-[#eee]">
        <LayoutHeader />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default App;
