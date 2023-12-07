import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';
import MyStoreContext from './context/storeContext/StoreContext';
import { TOKEN_TYPES } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '~/redux/user/userAction';
import { fetchCollections } from './redux/collection/collectionAction';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, reload: userReload } = useSelector(state => state.user);

  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReload]);

  useEffect(() => {
    dispatch(fetchCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        </Routes>
      </div>
    </MyStoreContext>
  );
};

export default App;
