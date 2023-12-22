import { memo } from 'react';
import { FaUsers } from 'react-icons/fa6';

const StudyGroupList = () => {
  return (
    <div className='mb-5 max-w-full border-2 border-blue-500/40 bg-[#f8fafb] text-gray-700 rounded'>
      <div className='p-4 flex justify-between'>
        <div>Lớp 10A2 </div>
        <div className='text-lg  align-middle flex items-center '>
          <span className='text-sm mr-3 '>10/30</span>
          <FaUsers className='m-auto' />
        </div>
      </div>
    </div>
  );
};

export default memo(StudyGroupList);
