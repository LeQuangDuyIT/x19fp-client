import Home from '~/pages/Home';
import Authen from '~/pages/Authen';
import Create from '~/pages/Create';
import Question from '~/pages/Question';
import UserProfile from '~/pages/UserProfile/UserProfile';
import MyQuestions from '~/pages/MyQuestions';
import Admin from '~/pages/Admin/Admin';
import MyTests from '~/pages/MyTests';
import Test from '~/pages/Test';

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
  { path: PATH.LOGIN, component: Authen },
  { path: PATH.SIGNUP, component: Authen },
  { path: '/question/:id', component: Question },
  { path: '/test/:id', component: Test }
];

const privateRoutes = [
  { path: '/create/:type', component: Create },
  { path: '/user-profile', component: UserProfile },
  { path: '/create/test/:id', component: Create },
  { path: '/question/mine', component: MyQuestions },
  { path: '/admin', component: Admin }
];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
