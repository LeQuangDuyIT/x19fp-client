import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';
import MyStoreContext from './context/storeContext/StoreContext';
import LogInOut from './pages/Authen/LogInOut/LogInOut';
import { TOKEN_TYPES } from './utils/constants';
import authApi from './services/authAPI';
import { useDispatch } from 'react-redux';
import { login } from './redux/Auth/authSlice';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
    if (accessToken) {
      try {
        const currentUser = await authApi.fetchCurrentUser();
        const currentUserData = currentUser.data;
        const payload = {
          user: currentUserData
        };
        dispatch(login(payload));
      } catch (error) {
        if (error) {
          throw new error();
        }
      }
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <MyStoreContext>
      <div className='text-base'>
        <Routes>
          {routes.map(route => {
            const Page = route.component;
            let routeElement = <Page />;
            if (route.isPrivated) {
              routeElement = <PrivateRoute component={Page} />;
            }
            return <Route key={route.path} path={route.path} element={routeElement} />;
          })}
          <Route path='/auth' element={<LogInOut />}>
            {routes
              .find(route => route.path === '/auth')
              .authRoute.map(route => (
                <Route key={route.path} path={route.path} element={<route.component />} />
              ))}
          </Route>
        </Routes>
      </div>
    </MyStoreContext>
  );
}

export default App;
