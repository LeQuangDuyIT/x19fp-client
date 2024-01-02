import { memo } from 'react';
import { FaUsers } from 'react-icons/fa6';

const StudyGroupList = ({ group, onSelectedGroup }) => {
  const { studyGroup, _id, member } = group;
  return (
    <div
      onClick={() => onSelectedGroup(_id)}
      className='mb-5 group max-w-full border-2 border-blue-500/40 bg-[#f8fafb] text-gray-700 rounded hover:bg-blue-500/80  transition-all '
    >
      <div className='p-4 flex justify-between'>
        <div className='text-black group-hover:text-white checked:text-white '>{studyGroup} </div>
        <div className='text-lg  align-middle flex items-center '>
          <span className='text-sm font-semibold text-blue-500 mr-3 group-hover:text-white  '>
            {member.length}
          </span>
          <FaUsers className='m-auto text-blue-500 group-hover:text-white mr-3' />
        </div>
      </div>
    </div>
  );
};

const MemoStudyGroupList = memo(StudyGroupList);

export default MemoStudyGroupList;
