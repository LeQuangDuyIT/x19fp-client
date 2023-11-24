import Authen from '~/pages/Authen';

export const PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup'
};

const publicRoutes = [
  { path: PATH.LOGIN, component: Authen },
  { path: PATH.SIGNUP, component: Authen }
];

const privateRoutes = [];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
