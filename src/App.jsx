import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';
import MyStoreContext from './context/storeContext/StoreContext';
import LogInOut from './pages/Authen/LogInOut/LogInOut';

function App() {
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
