import Countdown from 'react-countdown';
import BlockSectionWrapper from '../BlockSectionWrapper';
import { Progress } from 'antd';

const Countdowner = ({ limitTime, createdAt, icon }) => {
  const renderer = ({ total, minutes, seconds, completed }) => {
    if (completed) {
      return <p>Hết giờ</p>;
    } else {
      return (
        <div className='flex flex-col'>
          <div className='flex gap-8 font-bold text-4xl p-4'>
            {icon && <p>⌛</p>}
            <span>
              {minutes}:{seconds}
            </span>
          </div>
          <Progress
            strokeLinecap='round'
            percent={(total * 100) / (limitTime * 60 * 1000)}
            showInfo={false}
          />
        </div>
      );
    }
  };

  return (
    <BlockSectionWrapper>
      <div className='flex flex-col gap-4 p-4'>
        <Countdown
          date={new Date(createdAt).getTime() + limitTime * 60 * 1000}
          renderer={renderer}
        />
      </div>
    </BlockSectionWrapper>
  );
};

export default Countdowner;
