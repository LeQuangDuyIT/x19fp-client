import { useContext, useMemo } from 'react';
import { GoBook } from 'react-icons/go';
import { PiStudent } from 'react-icons/pi';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import ContentField from '~/components/ContentField';
import { Select } from 'antd';
import { getSubjectOptions } from '~/utils/helper';
import { CreateTestContext } from './TestCreator';
import clsx from 'clsx';

const TestOverviewSection = () => {
  const { overviewValue, onOverviewInputChange, testStaring } = useContext(CreateTestContext);

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

  const gradeOptions = [
    { value: 'TS10', label: 'Tuyển sinh 10 chuyên' },
    { value: '10', label: 'Lớp 10' },
    { value: '11', label: 'Lớp 11' },
    { value: '12', label: 'Lớp 12' },
    { value: 'THPTQG', label: 'Thi THPTQG' },
    { value: 'HSG', label: 'Thi Học Sinh Giỏi' }
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
          isError={testStaring && overviewValue.title === ''}
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
            <div
              className={clsx('border-b-[2px]', {
                'border-b-[#ccc]/60': !testStaring || overviewValue.subject,
                'border-red-500': testStaring && !overviewValue.subject
              })}
            >
              <Select
                options={subjectOptions}
                placeholder='Môn học'
                bordered={false}
                className={clsx('w-60 rounded-t-md', {
                  'bg-red-50': testStaring && !overviewValue.subject
                })}
                value={overviewValue.subject}
                onChange={value => onOverviewInputChange('subject', value)}
              />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <PiStudent className='text-xl' />
            <div
              className={clsx('border-b-[2px]', {
                'border-b-[#ccc]/60': !testStaring || overviewValue.grade,
                'border-red-500': testStaring && !overviewValue.grade
              })}
            >
              <Select
                options={gradeOptions}
                placeholder='Đối tượng'
                bordered={false}
                className={clsx('w-60 rounded-t-md', {
                  'bg-red-50': testStaring && !overviewValue.grade
                })}
                value={overviewValue.grade}
                onChange={value => onOverviewInputChange('grade', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </BlockSectionWrapper>
  );
};

export default TestOverviewSection;
