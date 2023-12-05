import { useParams } from 'react-router-dom';
import SimpleHeader from '~/layouts/SimpleHeader';
import { END_POINT } from '~/routes';
import QuestioncCreator from './QuestioncCreator';
import TestCreator from './TestCreator';

const Create = () => {
  const { type, id } = useParams();
  let Creator;
  if (type && type === END_POINT.CREATE_QUESTION) Creator = QuestioncCreator;
  if (id) Creator = TestCreator;

  return (
    <div>
      <SimpleHeader />
      <Creator />
    </div>
  );
};

export default Create;
