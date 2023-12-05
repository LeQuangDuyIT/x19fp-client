import { useContext, useMemo } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { GoBook } from 'react-icons/go';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import ContentField from '~/components/ContentField';
import { Select } from 'antd';
import { getSubjectOptions } from '~/utils/helper';
import { CreateTestContext } from './TestCreator';

const TestOverviewSection = () => {
  const { overviewValue, onOverviewInputChange } = useContext(CreateTestContext);

  const subjectOptions = useMemo(() => getSubjectOptions(), []);
  const limitTimeOptions = [
    { value: 15, label: '15 phút' },
    { value: 30, label: '30 phút' },
    { value: 45, label: '45 phút' },
    { value: 60, label: '60 phút' },
    { value: 90, label: '90 phút' },
    { value: 180, label: '180 phút' },
    { value: 'unlimit', label: 'Không giới hạn' }
  ];

  return (
    <BlockSectionWrapper>
      <div className='flex flex-col gap-4 py-4 px-6 rounded-md'>
        <ContentField
          transparent
          textarea
          value={overviewValue.title}
          onChange={e => onOverviewInputChange('title', e.target.value)}
          placeholder='Đề chưa có tên'
          noQuill
          stylesForNoQuill={{ fontSize: '32px', fontWeight: 'bold' }}
          propsForNoQuill={{ autoSize: { minRows: 1, maxRows: 2 } }}
        />
        <ContentField
          transparent
          value={overviewValue.description}
          onChange={e => onOverviewInputChange('description', e.target.value)}
          placeholder='Mô tả'
          noQuill
          propsForNoQuill={{ autoSize: { minRows: 1, maxRows: 5 } }}
        />
        <div className='flex gap-8 mb-6'>
          <div className='flex items-center gap-2'>
            <GoBook className='text-xl' />
            <div className='border-b-[2px] border-b-[#ccc]/60'>
              <Select
                options={subjectOptions}
                placeholder='Môn học'
                bordered={false}
                className='w-60'
                value={overviewValue.subject}
                onChange={value => onOverviewInputChange('subject', value)}
              />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <ClockCircleOutlined className='text-xl' />
            <div className='border-b-[2px] border-b-[#ccc]/60'>
              <Select
                options={limitTimeOptions}
                placeholder='Thời gian'
                bordered={false}
                className='w-60'
                value={overviewValue.limitTime}
                onChange={value => onOverviewInputChange('limitTime', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </BlockSectionWrapper>
  );
};

export default TestOverviewSection;
