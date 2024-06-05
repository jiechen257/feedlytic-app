import { Button, Flex, Layout, Spin, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  SearchOutlined,
  SyncOutlined,
  MessageOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import './index.less';

const { Text } = Typography;

const { Header, Content } = Layout;

const Article = (props: any) => {
  const { feed } = props;
  const { id, link } = feed;
  console.log('article---info---id, link', id, link);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const webview = document.getElementById('article');
    if (webview) {
      webview.addEventListener('did-start-loading', () => setLoading(true));
      webview.addEventListener('did-stop-loading', () => setLoading(false));
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <Layout>
        <Header className="flex justify-between items-center bg-transparent">
          <Flex>
            <Text
              className="text-xl font-bold w-[500px]"
              ellipsis={{ tooltip: feed?.title }}
            >
              {feed?.title}
            </Text>
          </Flex>
          <Flex wrap gap="small">
            <Tooltip title="search">
              <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Tooltip title="filter">
              <Button shape="circle" icon={<FilterOutlined />} />
            </Tooltip>
            <Tooltip title="refresh">
              <Button shape="circle" icon={<SyncOutlined />} />
            </Tooltip>
            <Tooltip title="message">
              <Button shape="circle" icon={<MessageOutlined />} />
            </Tooltip>
          </Flex>
        </Header>
        <Content>
          <webview
            id="article"
            key={id}
            src={link}
            className="webview-container"
          />
        </Content>
      </Layout>
    </Spin>
  );
};

export default Article;
