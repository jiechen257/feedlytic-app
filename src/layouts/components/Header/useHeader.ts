import { useState } from 'react';

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
      case 'filter':
        openSourceModal();
        break;
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
