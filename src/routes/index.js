import Home from '~/pages/Home';
import Authen from '~/pages/Authen';
import Login from '~/pages/Authen/Login';
import Signup from '~/pages/Authen/Signup';
import Create from '~/pages/Create';

export const PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  CREATE_QUESTION: '/create/question',
  CREATE_TEST: '/create/test',
  CREATE_QUIZ_GAME: '/create/quiz-game'
};

const publicRoutes = [
  { path: '/', component: Home },
  { path: PATH.LOGIN, component: Login },
  { path: PATH.SIGNUP, component: Signup }
];

const privateRoutes = [
  { path: PATH.CREATE_QUESTION, component: Create },
  { path: PATH.CREATE_TEST, component: Create },
  { path: PATH.CREATE_QUIZ_GAME, component: Create }
];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
