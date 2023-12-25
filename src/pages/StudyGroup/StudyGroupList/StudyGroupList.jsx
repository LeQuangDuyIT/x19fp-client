import { memo } from 'react';
import { FaUsers } from 'react-icons/fa6';

const StudyGroupList = ({ studyGroup }) => {
  console.log(studyGroup);
  return (
    <div className='mb-5 max-w-full border-2 border-blue-500/40 bg-[#f8fafb] text-gray-700 rounded'>
      <div className='p-4 flex justify-between'>
        <div>{studyGroup} </div>
        <div className='text-lg  align-middle flex items-center '>
          <span className='text-sm font-semibold text-blue-500 mr-3 '>10</span>
          <FaUsers className='m-auto text-blue-500 ' />
        </div>
      </div>
    </div>
  );
};

export default StudyGroupList;
