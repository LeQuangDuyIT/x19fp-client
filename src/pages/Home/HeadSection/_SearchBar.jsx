import { Button, Divider, Select } from 'antd';
import { SearchOutlined, CloseOutlined, BulbOutlined } from '@ant-design/icons';
import { useState } from 'react';
import homePageAPI from '~/services/homePageAPI';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const onHandleSubmitSearch = async e => {
    e.preventDefault();
    try {
      const getSearchValue = await homePageAPI.HomeSearch({ searchValue });
      const { objSearch, result } = getSearchValue.data;
      const idQuestion = result.findIndex(response => response._id === searchValue);
      if (objSearch === 'question') {
        navigate(`/question/${result[idQuestion]._id}`);
      }
      if (objSearch === 'test') {
        navigate(`/test/${result[idQuestion]._id} `);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <div className='flex justify-between gap-3 h-[54px] lg:w-[65%] mx-auto z-10'>
      <div className='flex-grow flex justify-between bg-white rounded-md'>
        <Select
          disabled
          defaultValue={'default'}
          options={[
            {
              value: 'default',
              label: 'Tùy chọn'
            }
          ]}
          bordered={false}
          className='w-[180px] h-full'
        />
        <Divider type='vertical' className='h-[60%] m-auto bg-slate-200' />
        <form onSubmit={e => onHandleSubmitSearch(e)} className='flex-grow flex justify-between'>
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className='flex-grow h-full px-4 outline-none text-black focus:outline-none'
            placeholder='Nhập id câu hỏi hoặc đề thi'
          />
          <div className='flex gap-4'>
            <CloseOutlined
              onClick={() => setSearchValue('')}
              className='text-black cursor-pointer opacity-50 hover:opacity-100'
            />
            <div className='p-1.5'>
              <button
                type='submit'
                className='h-full w-[calc(54px-2*1.5*4px)] bg-[#2E5FD0] hover:bg-[#336aea] rounded-md cursor-pointer'
              >
                <SearchOutlined
                  className='text-white'
                  style={{ strokeWidth: '36', stroke: 'white' }}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
      <Button className='flex items-center h-full'>
        <BulbOutlined className='text-xl' />
        <span className='px-2'>Danh mục đề gợi ý</span>
      </Button>
    </div>
  );
};

export default SearchBar;
