import { Select } from 'antd';
import { CheckSquareOutlined, CaretDownOutlined } from '@ant-design/icons';
import { MdOutlineRadioButtonChecked, MdOutlineEditNote } from 'react-icons/md';
import { QUESTION_TYPE } from '~/utils/constants';
import { useContext, useMemo } from 'react';
import { CreateQuestionContext } from '.';

const questionTypes = [
  { title: 'Trắc nghiệm', value: QUESTION_TYPE.CHOICE, icon: <MdOutlineRadioButtonChecked /> },
  { title: 'Hộp kiểm', value: QUESTION_TYPE.CHECK, icon: <CheckSquareOutlined /> },
  { title: 'Tự luận', value: QUESTION_TYPE.ESSAY, icon: <MdOutlineEditNote /> }
];

const QuestionTypeSelector = () => {
  const { questionType, handleChangeType } = useContext(CreateQuestionContext);

  const options = useMemo(
    () =>
      questionTypes.map(type => ({
        value: type.value,
        label: (
          <div className='flex items-center gap-3 w-full h-[calc(56px-10px)]'>
            {type.icon}
            <span>{type.title}</span>
          </div>
        )
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Select
      options={options}
      value={questionType}
      onChange={value => handleChangeType(value)}
      className='h-[56px]'
      suffixIcon={<CaretDownOutlined />}
    />
  );
};

export default QuestionTypeSelector;
