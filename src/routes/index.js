import Home from '~/Pages/Home';
import Authen from '~/Pages/Authen';
import Login from '~/Pages/Authen/Login';
export const PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup'
};

const publicRoutes = [
  { path: '/', component: Home },
  { path: PATH.LOGIN, component: Login },
  { path: PATH.SIGNUP, component: Authen }
];

const privateRoutes = [];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
