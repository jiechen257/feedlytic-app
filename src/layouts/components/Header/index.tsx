import React, { useState } from 'react';
import { Button, Flex, Segmented, Tabs, Tooltip } from 'antd';
import type { TabsProps } from 'antd';
import {
  SearchOutlined,
  SyncOutlined,
  MessageOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FilterModal from '@/components/FilterModal';
import useHeaderAction from './useHeader';

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
  const { filterOpen, closeFilterModal, clickHeader } = useHeaderAction();

  const [defaultView, setViewValue] = useState<string>(
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
          <Button
            shape="circle"
            onClick={() => clickHeader('filter')}
            icon={<FilterOutlined />}
          />
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
      <FilterModal modalOpen={filterOpen} closeModal={closeFilterModal} />
    </div>
  );
};

export default LayoutHeader;
