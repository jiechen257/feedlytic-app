import React from 'react';
import { Button, Flex, Segmented, Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import {
  SearchOutlined,
  SyncOutlined,
  MessageOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const segmentedOptions = [
  {
    label: 'Card',
    value: '/card',
  },
  {
    label: 'List',
    value: '/list',
  },
  {
    label: 'Magazine',
    value: '/magazine',
  },
  {
    label: 'Compact',
    value: '/compact',
  },
];

const LayoutHeader = () => {
  const [defaultView, setViewValue] = React.useState<string>(
    segmentedOptions[1].value,
  );
  const navigate = useNavigate();
  const changeViewHandler = (value: any) => {
    setViewValue(value);
    navigate(value);
  };
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
        defaultValue={defaultView}
        onChange={(value) => changeViewHandler(value)}
        options={segmentedOptions}
      />
    </div>
  );
};

export default LayoutHeader;
