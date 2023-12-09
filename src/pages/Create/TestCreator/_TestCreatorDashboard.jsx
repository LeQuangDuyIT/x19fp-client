import { useContext, useState } from 'react';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import { CreateTestContext } from './TestCreator';
import TestOverviewSection from './__TestOverviewSection';
import QuestionCreatorBox from '~/components/QuestionCreatorBox/QuestionCreatorBox';
import { useSelector } from 'react-redux';

const TestCreatorDashboard = () => {
  const { test, questions } = useSelector(state => state.test);
  const { overviewValue, onOverviewInputChange } = useContext(CreateTestContext);
  const [hoveringId, setHoveringId] = useState(null);

  return (
    <div className='flex flex-col gap-6'>
      <BlockSectionWrapper>
        <div className='h-48 rounded-md bg-red-400'></div>
      </BlockSectionWrapper>
      <TestOverviewSection />
      <div className='flex flex-col'>
        {questions.map((question, index) => (
          <div
            key={question._id}
            id={question._id}
            onMouseEnter={() => setHoveringId(question._id)}
            className='py-3'
          >
            <div className='flex gap-1'>
              <h3 className='block w-[100px] mb-1 py-1 px-4 bg-[#007aff] rounded-tl-md font-bold text-white'>
                Câu {index + 1}
              </h3>
              {overviewValue.scores[question._id] && (
                <h3 className='block w-[100px] mb-1 py-1 px-4 border-[2px] border-[#007aff] rounded-tr-md font-bold text-[#007aff]'>
                  {overviewValue.scores[question._id]} điểm
                </h3>
              )}
            </div>
            <QuestionCreatorBox
              isTestCreator
              question={question}
              showSettingBar={hoveringId === question._id}
              handleCloseSettingBar={() => setHoveringId(null)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCreatorDashboard;
