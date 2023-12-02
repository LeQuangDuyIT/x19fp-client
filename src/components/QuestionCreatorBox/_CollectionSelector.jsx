import { useMemo } from 'react';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const CollectionSelector = () => {
  const { collections } = useSelector(state => state.collection);

  const collectionOptions = useMemo(() => {
    const labelClasses = 'flex items-center w-full h-[calc(56px-10px)]';
    return collections.map(collection => ({
      value: collection._id,
      label: <div className={labelClasses}>{collection.name}</div>
    }));
  }, [collections]);

  return (
    <Select
      placeholder='Chọn bộ sưu tập'
      options={collectionOptions}
      className='w-full h-[56px]'
      suffixIcon={<CaretDownOutlined />}
    />
  );
};

export default CollectionSelector;
