import { Button } from 'antd';
import { CheckSquareOutlined, CaretDownOutlined } from '@ant-design/icons';
import { MdOutlineRadioButtonChecked, MdOutlineEditNote } from 'react-icons/md';
import { QUESTION_TYPE } from '~/utils/constants';
import { useContext, useMemo } from 'react';
import SubMenuWrapper from '../SubMenuWrapper';
import AntdCustomTheme from '~/theme/AntdCustomTheme';
import { CreateQuestionContext } from '.';

const questionTypes = [
  { title: 'Trắc nghiệm', value: QUESTION_TYPE.CHOICE, icon: <MdOutlineRadioButtonChecked /> },
  { title: 'Hộp kiểm', value: QUESTION_TYPE.CHECK, icon: <CheckSquareOutlined /> },
  { title: 'Tự luận', value: QUESTION_TYPE.ESSAY, icon: <MdOutlineEditNote /> }
];

const QuestionTypeSelector = () => {
  const { questionType, handleChangeType } = useContext(CreateQuestionContext);
  const options = useMemo(
    () => (
      <div className='flex flex-col'>
        {questionTypes.map(type => (
          <AntdCustomTheme key={type.value} colorTextBase='white'>
            <div
              className='rounded-md border-[2px] border-transparent hover:border-blue-100 hover:bg-gray-50/20'
              onClick={() => handleChangeType(type.value)}
            >
              <Button type='text' icon={type.icon} className='h-[54px] w-full text-base text-left'>
                {type.title}
              </Button>
            </div>
          </AntdCustomTheme>
        ))}
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const typeTitle = questionTypes.find(type => type.value === questionType);

  return (
    <SubMenuWrapper
      trigger='click'
      title='Kiểu câu hỏi/đề bài'
      content={options}
      arrow={false}
      color='#2e6bed'
      style={{ width: '263px', transform: 'translateY(-60px)' }}
    >
      <Button className='w-full h-[56px] p-4 flex gap-4 justify-between items-center border border-[#ccc] rounded-md text-base cursor-pointer'>
        <div className='flex items-center gap-3'>
          <CheckSquareOutlined />
          <span>{typeTitle?.title}</span>
        </div>
        <CaretDownOutlined />
      </Button>
    </SubMenuWrapper>
  );
};

export default QuestionTypeSelector;
