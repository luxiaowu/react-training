import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '@alifd/next';

const Location = () => {
  const location = useLocation();

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{location.pathname}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Location;
