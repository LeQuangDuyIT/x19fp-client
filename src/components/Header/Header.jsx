import { Button } from 'antd';

const Header = () => {
  return (
    <div className='flex justify-between'>
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
