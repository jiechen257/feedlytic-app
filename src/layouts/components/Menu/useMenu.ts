import { useState } from 'react';
import type { MenuProps } from 'antd';

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

  const addSource = (inputUrl: string) => {
    console.log('inputUrl', inputUrl);
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
    addSource,
    clickMenu,
    openSourceModal,
    closeSourceModal,
  };
};
