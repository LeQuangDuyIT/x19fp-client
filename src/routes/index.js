import Home from '~/pages/Home';
import Authen from '~/pages/Authen';
import Login from '~/pages/Authen/Login';
import Signup from '~/pages/Authen/Signup';
import Create from '~/pages/Create';

export const END_POINT = {
  CREATE_QUESTION: 'question',
  CREATE_TEST: 'test',
  CREATE_QUIZ_GAME: 'quiz-game'
};

export const PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  CREATE: endPoint => `/create/${endPoint}`
};

const publicRoutes = [
  { path: '/', component: Home },
  { path: PATH.LOGIN, component: Login },
  { path: PATH.SIGNUP, component: Signup }
];

const privateRoutes = [{ path: '/create/:type', component: Create }];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
