import { useContext } from 'react';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import { CreateTestContext } from './TestCreator';
import TestOverviewSection from './__TestOverviewSection';

const TestCreatorDashboard = () => {
  const { overviewValue, onOverviewInputChange } = useContext(CreateTestContext);

  return (
    <div className='flex flex-col gap-6'>
      <BlockSectionWrapper>
        <div className='h-48 rounded-md bg-red-400'></div>
      </BlockSectionWrapper>
      <TestOverviewSection />
    </div>
  );
};

export default TestCreatorDashboard;
