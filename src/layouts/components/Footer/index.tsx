import { Footer } from 'antd/es/layout/layout';
import React from 'react';

const LayoutFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    ©{new Date().getFullYear()} Created by Jeffrey
  </Footer>
);

export default LayoutFooter;
