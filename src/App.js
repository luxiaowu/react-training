import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Shell, Nav } from '@alifd/next';
import routes from './config/routes';
import Location from './components/Location';
import { asideMenu } from './config/menu';
import avatar from './assets/avatar.jpg';
import './App.scss';

const basename =
  process.env.NODE_ENV === 'production' ? '/react-training' : '/';

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Shell style={{ height: '100%' }}>
        <Shell.Branding>
          <div className="rectangular"></div>
          <span style={{ marginLeft: 10 }}>常用工具</span>
        </Shell.Branding>
        {/* <Shell.Navigation direction="hoz">
          <Search
            key="2"
            shape="simple"
            type="dark"
            palceholder="Search"
            style={{ width: '200px' }}
          />
        </Shell.Navigation> */}
        <Shell.Action>
          <img src={avatar} className="avatar" alt="用户头像" />
          <span style={{ marginLeft: 10 }}>平凡之路</span>
        </Shell.Action>

        <Shell.Navigation>
          {/* <div className="logo" /> */}
          <Nav embeddable>
            {asideMenu.map(({ name, path, icon }, i) => (
              <Nav.Item key={i} icon={icon}>
                <Link to={path}>{name}</Link>
              </Nav.Item>
            ))}
          </Nav>
        </Shell.Navigation>
        <Shell.Content>
          <Location />
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes>
              {routes.map(
                ({ path, exact, redirect, component: Component }, index) => (
                  <Route
                    key={index}
                    path={path}
                    exact={exact}
                    element={
                      redirect ? <Navigate replace to="/diff" /> : <Component />
                    }
                  />
                )
              )}
            </Routes>
          </div>
        </Shell.Content>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
