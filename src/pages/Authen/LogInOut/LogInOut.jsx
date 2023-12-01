import { Outlet } from 'react-router-dom';

const LogInOut = () => {
  return (
    <div className='flex justify-center w-full '>
      <div className='w-8/12 h-screen'>
        <img className='w-full h-full object-cover ' src='../src/assets/loginPoster.jpg' />
      </div>
      <div className='w-4/12 p-5 flex justify-center items-center '>
        <Outlet />
      </div>
    </div>
  );
};

export default LogInOut;
