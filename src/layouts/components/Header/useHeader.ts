import { useBoundStore } from '@/hooks/useBoundStore';
import { useState } from 'react';

export enum HEADER_ACTION_TYPE {
  FILTER = 'filter',
  REFRESH = 'refresh',
}

const refreshSource = () => {
  const currentMenuKey = useBoundStore((s) => s.currentMenuKey);
}

const useHeaderAction = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const openSourceModal = () => {
    setFilterOpen(true);
  };
  const closeFilterModal = () => {
    setFilterOpen(false);
  };

  const clickHeader = (type: string) => {
    switch (type) {
      case HEADER_ACTION_TYPE.FILTER:
        openSourceModal();
        break;
      case HEADER_ACTION_TYPE.REFRESH:

      default:
        break;
    }
  };
  return {
    filterOpen,
    clickHeader,
    openSourceModal,
    closeFilterModal,
  };
};

export default useHeaderAction;
