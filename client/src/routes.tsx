import React from 'react';

const AsyncLogin = React.lazy(() => import('./Pages/Login' /* webpackChunkName: "ALogin" */));
const AsyncRegister = React.lazy(() => import('./Pages/Register' /* webpackChunkName: "ARegister" */));
const AsyncHome = React.lazy(() => import('./Pages/Home' /* webpackChunkName: "AHome" */));

export const publicRoutes = [
  {
    path: '/login',
    exact: true,
    component: <AsyncLogin />,
  },
  {
    path: '/register',
    exact: true,
    component: <AsyncRegister />,
  },
];

export const privateRoutes = [
  {
    path: '/',
    exact: true,
    component: <AsyncHome />,
  },
];
