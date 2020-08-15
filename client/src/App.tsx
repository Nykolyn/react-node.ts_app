import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps, Switch } from 'react-router-dom';

import * as selectors from './redux/selectors';
import { privateRoutes, publicRoutes } from 'routes';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {privateRoutes.map(({ component, ...options }) => (
          <PrivateRoute key={options.path} {...options}>
            {component}
          </PrivateRoute>
        ))}
        {publicRoutes.map(({ component, ...options }) => (
          <PublicRoute key={options.path} {...options}>
            {component}
          </PublicRoute>
        ))}
      </Switch>
    </Suspense>
  );
}

export const PrivateRoute: React.FC<RouteProps> = ({ component, ...options }) => {
  const token = useSelector(selectors.token);
  if (token) {
    return <Route {...options}>{component}</Route>;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: options.path },
        }}
      />
    );
  }
};

export const PublicRoute: React.FC<RouteProps> = ({ component, ...options }) => {
  const token = useSelector(selectors.token);

  if (token) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  } else {
    return <Route {...options} render={() => component} />;
  }
};

export default App;
