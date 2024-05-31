import { useState } from 'react';
import type { MenuProps } from 'antd';
import { addSource as addSourceHandler } from '@/stores/model/sourceModel';

export const MenuMap = {};

// eslint-disable-next-line react-hooks/rules-of-hooks

export const useMenuAction = () => {
  const [sourceOpen, setModalOpen] = useState(false);
  const openSourceModal = () => {
    setModalOpen(true);
  };
  const closeSourceModal = () => {
    setModalOpen(false);
  };

  const clickMenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    switch (e.key) {
      case 'create':
        openSourceModal();
        break;
      default:
        break;
    }
  };
  return {
    sourceOpen,
    clickMenu,
    openSourceModal,
    closeSourceModal,
  };
};
