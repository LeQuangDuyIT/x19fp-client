import { Divider } from 'antd';

const SubMenuWrapper = ({ children }) => {
  return (
    <>
      <Divider className='bg-slate-100/20 mt-3' />
      {children}
    </>
  );
};

export default SubMenuWrapper;
