import { useContext } from 'react';
import MultipleChoiceAnswerField from '~/components/MultipleChoiceAnswerField';
import ContentField from '../ContentField';
import { CreateQuestionContext } from '../QuestionCreatorBox';
const MultipleChoiceCreator = () => {
  const { topic, answers, errors, onAnswerInputChange, onTopicInputChange, handleRefreshField } =
    useContext(CreateQuestionContext);

  return (
    <div>
      <form>
        <ContentField
          value={topic}
          textarea
          onChange={onTopicInputChange}
          placeholder='Câu hỏi/đề bài'
          isError={errors.includes('topic')}
          refreshField={() => handleRefreshField('topic')}
          allowUploadImage
        />
        <div className='flex flex-col gap-1 mt-4'>
          {answers.map((answer, index) => (
            <MultipleChoiceAnswerField
              key={answer.id}
              id={answer.id}
              index={index}
              isCorrect={answer.isCorrect}
              value={answer.content}
              onInputChange={onAnswerInputChange}
              isError={errors.includes(answer.id)}
              refreshField={() => handleRefreshField(answer.id)}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default MultipleChoiceCreator;
