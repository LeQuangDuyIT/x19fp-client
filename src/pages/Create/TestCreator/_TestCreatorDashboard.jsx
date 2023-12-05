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

  console.log(test);

  return (
    <div className='flex flex-col gap-6'>
      <BlockSectionWrapper>
        <div className='h-48 rounded-md bg-red-400'></div>
      </BlockSectionWrapper>
      <TestOverviewSection />
      <div className='flex flex-col gap-6'>
        {questions.map(question => (
          <div key={question._id} onMouseEnter={() => setHoveringId(question._id)}>
            <QuestionCreatorBox question={question} showSettingBar={hoveringId === question._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCreatorDashboard;
