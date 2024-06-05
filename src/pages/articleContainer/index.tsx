import Article from '@/components/Article';
import { Drawer } from 'antd';
import React, { useEffect } from 'react';

const ArticleContainer = (props: any) => {
  const { articleShow, closeContainer, feed } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  // const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setOpen(articleShow);
  }, [articleShow]);

  const closeHandler = () => {
    closeContainer();
  };

  return (
    <>
      <Drawer
        width={1000}
        closable
        destroyOnClose
        placement="right"
        open={open}
        onClose={closeHandler}
      >
        <Article feed={feed} />
      </Drawer>
    </>
  );
};

export default ArticleContainer;
