import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import CollectionCreator from './__CollectionCreator';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const AsideSection = () => {
  const { collections } = useSelector(state => state.collection);
  return (
    <BlockSectionWrapper title='Bộ sưu tập câu hỏi/bài tập'>
      <CollectionCreator />
      <div className='flex flex-col p-4'>
        {collections.map(collection => (
          <Button key={collection._id} type='text' className='h-[56px] text-left'>
            {collection.name}
          </Button>
        ))}
      </div>
    </BlockSectionWrapper>
  );
};

export default AsideSection;
