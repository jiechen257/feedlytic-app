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
import { useBoundStore } from '@/hooks/useBoundStore';
import { useEffect, useState } from 'react';
import { isValidUrl } from '@/utils/tool';
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
  // {
  //   key: 'sub4',
  //   label: 'FEEDS',
  //   type: 'group',
  //   children: [
  //     { key: '9', label: 'Option 9' },
  //     {
  //       key: '10',
  //       label: 'Option 10',
  //       children: [
  //         { key: '11', label: 'Option 11' },
  //         { key: '12', label: 'Option 12' },
  //       ],
  //     },
  //   ],
  // },
];

const creatorMenuItem = {
  key: 'create',
  label: 'Create New Folder',
  icon: <SisternodeOutlined />,
};

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

const getIcon = (url: string) => {
  return <img className="w-[24px] h-[24px]" src={url} alt="" />;
};

const LayoutMenu = () => {
  const { sourceOpen, closeSourceModal, clickMenu } = useMenuAction();
  const menu = useBoundStore((s) => s.menu);
  const setCurrentMenuKey = useBoundStore((s) => s.setCurrentMenuKey);
  const [menuItems, setMenuItems] = useState([...topItems, creatorMenuItem]);
  useEffect(() => {
    const formatMenu =
      menu?.map((v: any) => ({ ...v, icon: getIcon(v.logo) })) || [];
    // eslint-disable-next-line no-sparse-arrays
    // const formatMenu = menu;
    if (formatMenu.length) {
      const currentMenuItems = [...topItems, , ...formatMenu, creatorMenuItem];
      setMenuItems(currentMenuItems);
    }
  }, [menu]);
  const handleMenuClick = (val) => {
    if (isValidUrl(val.key)) {
      setCurrentMenuKey(val.key);
      return;
    }
    clickMenu(val);
  };
  // const sourceMenu = subscribeWithSelector(useBoundStore, (s) => s.menu);
  return (
    <aside className="relative min-h-[100vh] custom bg-white font-bold">
      <div className="flex justify-center items-center py-4 width-[100%] font-bold text-xl">
        Feedlytic Reader
      </div>
      <Menu
        onClick={(val) => handleMenuClick(val)}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={menuItems}
      />

      <Menu
        className="absolute bottom-0 left-0"
        onClick={(val) => console.log(val)}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={bottomItems}
      />
      <SourceModal
        modalOpen={sourceOpen}
        closeModal={closeSourceModal}
        finishSourceAdd={() => console.log('11')}
      />
    </aside>
  );
};

export default LayoutMenu;
