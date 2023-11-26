import { Divider, Popover } from 'antd';

const SubMenuWrapper = ({ children, title, content, placement = 'bottomLeft' }) => {
  return (
    <Popover
      content={
        content ? (
          <>
            {title && <Divider className='bg-slate-100/20 my-3' />}
            {content}
          </>
        ) : undefined
      }
      title={title ? <p className='font-bold'>{title}</p> : undefined}
      color='black'
      overlayInnerStyle={{ padding: '18px' }}
      placement={placement}
    >
      {children}
    </Popover>
  );
};

export default SubMenuWrapper;
