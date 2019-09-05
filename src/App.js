import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
// import Layout from '@icedesign/layout';
// import Menu from "@icedesign/styled-menu";
import FoundationSymbol from '@icedesign/foundation-symbol';
import '@icedesign/layout/build/index.css'
import '@icedesign/styled-menu/build/index.css'
import './App.scss';
import routes from './config/routes'
import { asideMenu } from "./config/menu";

import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import Location from './components/Location';

const basename = process.env.NODE_ENV === 'production' ? '/react-training' : '/'

function App() {
  return (
    <Router basename={basename}>
      {/* <Layout fixable={true}>
        <Layout.Aside type="primary" style={{ width: 200 }}>
          <div className="logo" />
          <Menu theme="dark">
            {asideMenu.map(({ name, path, icon }, i) => (
              <Menu.Item key={i}>
                <Link to={path}><FoundationSymbol size="small" type={symbol} /> {name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Aside>
        <Layout.Section>
          <Layout.Header type="primary"></Layout.Header>
          <Layout.Main scrollable={true}>
            <Switch>
              {routes.map(({ path, exact, component }, index) => (
                <Route key={index} path={path} exact={exact} component={component} />
              ))}
            </Switch>
          </Layout.Main>
        </Layout.Section>
      </Layout> */}
      <Layout>
        <Layout.Sider style={{ position: 'fixed', minHeight: '100vh', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {asideMenu.map(({ name, path, icon }, i) => (
              <Menu.Item key={i}>
                <Link to={path}><Icon type={icon} /> {name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Layout.Header style={{ background: '#fff', padding: 0 }}></Layout.Header>
          <Layout.Content style={{ margin: '0 16px' }}>
          <Location />
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                {routes.map(({ path, exact, component }, index) => (
                  <Route key={index} path={path} exact={exact} component={component} />
                ))}
              </Switch>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
