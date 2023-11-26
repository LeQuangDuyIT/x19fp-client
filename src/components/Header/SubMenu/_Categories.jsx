import { Button } from 'antd';
import { categories } from '~/utils/rendering';

const Categories = () => {
  return (
    <div className='w-[480px] flex flex-wrap gap-y-2 items-start'>
      {categories.map(item => (
        <Button
          key={item.title}
          type='text'
          className='w-[calc(33.33%)] text-left text-white/60 font-bold hover:text-white'
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
