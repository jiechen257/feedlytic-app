import React from 'react';
import { Button, Flex, Segmented, Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import {
  SearchOutlined,
  SyncOutlined,
  MessageOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const onChange = (key: string) => {};

type Align = 'start' | 'center' | 'end';

const LayoutHeader = () => {
  const [alignValue, setAlignValue] = React.useState<Align>('center');
  return (
    <div className="flex justify-left items-center pt-4 px-4 text-[#000]">
      <Flex wrap gap="small" className="mr-4">
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
      <Segmented
        defaultValue="Card view"
        onChange={(value) => setAlignValue(value as Align)}
        options={['Card view', 'List view', 'Magazine view', 'Compact view']}
      />
    </div>
  );
};

export default LayoutHeader;
