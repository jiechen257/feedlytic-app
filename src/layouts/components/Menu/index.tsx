import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  BookOutlined,
  StarOutlined,
  SisternodeOutlined,
  CarryOutOutlined,
  FieldTimeOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './index.less';

type MenuItem = Required<MenuProps>['items'][number];

const topItems: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Today',
    icon: <CarryOutOutlined />,
  },
  {
    key: 'start',
    label: 'Recently Read',
    icon: <FieldTimeOutlined />,
  },
  {
    key: 'readItLater',
    label: 'Read Later',
    icon: <PlayCircleOutlined />,
  },
  {
    key: 'sub2',
    label: 'Bookmarks',
    icon: <BookOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'FEEDS',
    type: 'group',
    children: [
      { key: '9', label: 'Option 9' },
      {
        key: '10',
        label: 'Option 10',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
  {
    key: 'create',
    label: 'Create New Folder',
    icon: <SisternodeOutlined />,
  },
];

const bottomItems: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Learn and Get Support',
    icon: <QuestionCircleOutlined />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
];

function LayoutMenu() {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <aside className="relative min-h-[100vh] custom bg-white">
      <div className="flex justify-center items-center py-4 width-[100%] font-bold text-xl" >
        Feedlytic Reader
      </div>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={topItems}
      />

      <Menu
        className="absolute bottom-0 left-0"
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={bottomItems}
      />
    </aside>
  );
}

export default LayoutMenu;
