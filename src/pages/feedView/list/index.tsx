import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography } from 'antd';
import { useBoundStore } from '@/hooks/useBoundStore';
import { useLocation } from 'react-router-dom';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ArticleContainer from '@/pages/articleContainer';
import { filterSourcesItems } from '@/stores/model/item';

const { Text } = Typography;

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
      dataIndex: 'readStatus',
      key: 'readStatus',
      render: (_, { readStatus }) => (
        <>
          {readStatus === 1 ? (
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
  const filterOptions = useBoundStore((s) => s.filterOptions);

  const [feedsData, setFeedsData] = useState<DataType[]>([]);
  const [ellipsis, setEllipsis] = useState(true);

  const [currentFeed, setCurrentFeed] = useState();
  const [articleShow, setShowArticle] = useState(false);

  useEffect(() => {
    const originFeeds = getSource(currentMenuKey)?.items;
    const feeds = filterSourcesItems(originFeeds, {
      readStatus: filterOptions.readStatus,
      hiddenStatus: filterOptions.hiddenStatus,
      timeRange: filterOptions.timeRange,
    });
    const tableData = feeds?.map((feed) => ({
      key: feed.id,
      tags: [],
      ...feed,
    }));
    setFeedsData(tableData);
  }, [
    location.pathname,
    currentMenuKey,
    getSource,
    filterOptions.hiddenStatus,
    filterOptions.readStatus,
    filterOptions.timeRange,
  ]);

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
