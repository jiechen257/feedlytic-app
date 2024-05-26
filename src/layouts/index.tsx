import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import LayoutHeader from './components/Header';
import LayoutMenu from './components/Menu';
import './index.less';

function LayoutIndex(props: any) {
  const { Sider, Content } = Layout;
  // const { isCollapse, updateCollapse } = props;
  const isCollapse = true;

  // 监听窗口大小变化
  // const listeningWindow = () => {
  //   window.onresize = () => {
  //     return (() => {
  //       const screenWidth = document.body.clientWidth;
  //       if (!isCollapse && screenWidth < 1200) updateCollapse(true);
  //       if (!isCollapse && screenWidth > 1200) updateCollapse(false);
  //     })();
  //   };
  // };

  // useEffect(() => {
  //   listeningWindow();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    // 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
    <section className="container">
      <Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </section>
  );
}

export default LayoutIndex;
