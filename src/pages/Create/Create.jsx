import { useParams } from 'react-router-dom';
import SimpleHeader from '~/layouts/SimpleHeader';
import { END_POINT } from '~/routes';
import QuestioncCreator from './QuestioncCreator';
import TestCreator from './TestCreator';

const Create = () => {
  const { type } = useParams();
  let Creator;
  if (type === END_POINT.CREATE_QUESTION) Creator = QuestioncCreator;
  if (type === END_POINT.CREATE_TEST) Creator = TestCreator;

  return (
    <div>
      <SimpleHeader />
      <Creator />
    </div>
  );
};

export default Create;
