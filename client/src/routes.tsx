import React from 'react';

const AsyncLogin = React.lazy(() => import('./Pages/Login' /* webpackChunkName: "ALogin" */));
const AsyncHome = React.lazy(() => import('./Pages/Home' /* webpackChunkName: "AHome" */));

export const publicRoutes = [
  {
    path: '/login',
    exact: true,
    component: <AsyncLogin />,
  },
];

export const privateRoutes = [
  {
    path: '/',
    exact: true,
    component: <AsyncHome />,
  },
];
