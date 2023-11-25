import clsx from 'clsx';

const CategoryThumbnail = props => {
  const { title, thumbnail, className, onMouseEnter, onMouseLeave } = props;
  return (
    <div
      className={clsx('flex flex-col items-center gap-4 cursor-pointer', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='border-[3px] border-white/40 rounded-[22px] p-[3px]'>
        <div className='w-full h-full rounded-[17px] relative overflow-hidden'>
          <img
            src={thumbnail}
            alt={title}
            className='w-full h-full object-cover hover:scale-125 duration-500'
          />
        </div>
      </div>
      <h4 className='font-bold opacity-80'>{title}</h4>
    </div>
  );
};

export default CategoryThumbnail;
