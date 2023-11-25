import { Button } from 'antd';

const Header = () => {
  return (
    <div className='h-[64px] flex justify-between items-center'>
      <div className='z-10'>
        <h2>TEST BANK</h2>
      </div>
      <div className='z-10'>
        <Button>Login</Button>
        <Button>Signup</Button>
      </div>
    </div>
  );
};

export default Header;
