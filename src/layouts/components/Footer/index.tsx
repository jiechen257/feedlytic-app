import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import './index.less';

const LayoutFooter = () => (
  <Footer className="footer" style={{ textAlign: 'center' }}>
    ©{new Date().getFullYear()} Created by Jeffrey
  </Footer>
);

export default LayoutFooter;
