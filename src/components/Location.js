import React from 'react';
import { withRouter } from 'react-router-dom'
import { Breadcrumb } from "antd";

const Location = ({ location }) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{location.pathname}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default withRouter(Location);
