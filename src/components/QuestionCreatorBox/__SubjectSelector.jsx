import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useContext, useMemo } from 'react';
import { CreateQuestionContext } from '.';
import { categories } from '~/utils/rendering';

const SubjectSelector = () => {
  const { controlValue, handleChangeControlValue, isSubjectRequired } =
    useContext(CreateQuestionContext);

  const options = useMemo(() => {
    const labelClasses = 'flex items-center w-full h-[calc(56px-10px)]';
    const subjects = categories.map(subject => ({
      value: subject.title,
      label: <div className={labelClasses}>{subject.title}</div>
    }));
    subjects.push({
      value: 'orther',
      label: <div className={labelClasses}>Khác</div>
    });
    const removeIndex = categories.findIndex(item => !item.isSubject);
    subjects.splice(removeIndex, 1);
    return subjects;
  }, []);

  return (
    <Select
      options={options}
      value={controlValue.subject}
      onChange={value => handleChangeControlValue('subject', value)}
      className='h-[56px]'
      suffixIcon={<CaretDownOutlined />}
      placeholder='Chọn môn'
      status={isSubjectRequired ? 'error' : undefined}
    />
  );
};

export default SubjectSelector;
