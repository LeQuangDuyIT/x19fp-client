import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import CollectionCreator from './__CollectionCreator';
import { useSelector } from 'react-redux';

const AsideSection = () => {
  const { collections } = useSelector(state => state.collection);
  return (
    <BlockSectionWrapper title='Bộ sưu tập câu hỏi/bài tập'>
      <CollectionCreator />
      <div className='p-4'>
        {collections.map(collection => (
          <h4 key={collection._id}>{collection.name}</h4>
        ))}
      </div>
    </BlockSectionWrapper>
  );
};

export default AsideSection;
