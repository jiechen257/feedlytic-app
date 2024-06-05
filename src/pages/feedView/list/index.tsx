import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Switch, Typography } from 'antd';
import type { TableProps } from 'antd';
import { useBoundStore } from '@/hooks/useBoundStore';
import { useLocation, useNavigation } from 'react-router-dom';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ArticleContainer from '@/pages/articleContainer';

const { Paragraph, Text } = Typography;

interface DataType {
  key: string;
  title: string;
  unreadCount: number;
  link: string;
  tags: string[];
}

const getColumns = (ellipsis: boolean) => {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Text
          style={ellipsis ? { width: 200 } : undefined}
          ellipsis={ellipsis ? { tooltip: text } : false}
        >
          {text}
        </Text>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (text) => (
        <Text
          style={ellipsis ? { width: 200 } : undefined}
          ellipsis={ellipsis ? { tooltip: text } : false}
        >
          <a href={text}>{text}</a>
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <>{new Date(text).toLocaleString()}</>,
    },
    {
      title: 'HasRead',
      dataIndex: 'hasRead',
      key: 'hasRead',
      render: (_, { hasRead }) => (
        <>
          {hasRead ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              已读
            </Tag>
          ) : (
            <Tag icon={<MinusCircleOutlined />} color="default">
              未读
            </Tag>
          )}
        </>
      ),
    },
  ];
};

const ListView: React.FC = () => {
  const location = useLocation();
  const currentMenuKey = useBoundStore((s) => s.currentMenuKey);
  const getSource = useBoundStore((s) => s.getSource);
  const [feedsData, setFeedsData] = useState<DataType[]>([]);

  const [ellipsis, setEllipsis] = useState(true);

  const [currentFeed, setCurrentFeed] = useState();
  const [articleShow, setShowArticle] = useState(false);

  useEffect(() => {
    const feeds = getSource(currentMenuKey)?.items;
    const tableData = feeds?.map((feed) => ({
      key: feed.id,
      tags: [],
      ...feed,
    }));
    setFeedsData(tableData);
  }, [location.pathname, currentMenuKey, getSource]);

  const clickCurrentRow = (row) => {
    setCurrentFeed(row);
    setShowArticle(true);
  };

  return (
    <>
      <Table
        onRow={(row) => ({ onClick: () => clickCurrentRow(row) })}
        columns={getColumns(ellipsis)}
        dataSource={feedsData}
      />
      <ArticleContainer
        feed={currentFeed}
        articleShow={articleShow}
        closeContainer={() => setShowArticle(false)}
      />
    </>
  );
};

export default ListView;