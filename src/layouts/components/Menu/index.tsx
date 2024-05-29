import {
  SettingOutlined,
  BookOutlined,
  SisternodeOutlined,
  CarryOutOutlined,
  FieldTimeOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './index.less';
import SourceModal from '../../../components/SourceModal';
import { useMenuAction } from './useMenu';

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

const LayoutMenu = () => {
  const { sourceOpen, closeSourceModal, clickMenu, addSource } =
    useMenuAction();
  return (
    <aside className="relative min-h-[100vh] custom bg-white font-bold">
      <div className="flex justify-center items-center py-4 width-[100%] font-bold text-xl">
        Feedlytic Reader
      </div>
      <Menu
        onClick={clickMenu}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={topItems}
      />

      <Menu
        className="absolute bottom-0 left-0"
        onClick={clickMenu}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={bottomItems}
      />
      <SourceModal
        modalOpen={sourceOpen}
        closeModal={closeSourceModal}
        addSource={addSource}
      />
    </aside>
  );
};

export default LayoutMenu;
