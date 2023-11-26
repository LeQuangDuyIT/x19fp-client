const BlockSectionWrapper = ({ children, title }) => {
  return (
    <div className='rounded-md bg-white shadow-xl'>
      {title && (
        <div className='p-4 rounded-t-md'>
          <h3 className='font-bold'>{title}</h3>
        </div>
      )}
      <div className='p-4'>{children}</div>
    </div>
  );
};

export default BlockSectionWrapper;
