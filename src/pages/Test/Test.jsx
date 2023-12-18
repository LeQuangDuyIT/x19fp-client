import { useState } from 'react';
import SimpleHeader from '~/layouts/SimpleHeader';
import TestGate from './_TestGate';
import TestDoingRoom from './_TestDoingRoom';

const Test = () => {
  const [recordData, setRecordData] = useState(null);

  return (
    <>
      <SimpleHeader />
      {recordData ? (
        <TestDoingRoom recordData={recordData} />
      ) : (
        <TestGate handleSetRecord={data => setRecordData(data)} />
      )}
    </>
  );
};

export default Test;
