import { useState } from 'react';
import clsx from 'clsx';
import { Button, Divider, Select, Tag } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { FaRegLightbulb } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Container from '~/components/Container';
import Header from '~/components/Header';
import { categories, topSearchKey } from './_rendering';
import CategoryThumbnail from './_CategoryThumbnail';

const HeadSection = () => {
  const [bgImg, setBgImg] = useState(null);

  const swiperButtonClasses = 'bg-transparent text-white/40 hover:text-white';

  return (
    <div className={clsx('relative text-white')}>
      <Container>
        <Header />
        <div className='flex flex-col gap-8 mx-auto py-16 mt-8'>
          <div className='flex flex-col gap-4 text-center z-10'>
            <h1 className='text-4xl font-bold'>Ngân hàng đề thi</h1>
            <h2 className='text-xl font-bold'>
              Cung cấp kho đề thi vô hạn, để sự học là không ngừng rèn luyện
            </h2>
          </div>
          {/* Search bar */}
          <div className='flex justify-between gap-3 h-[54px] lg:w-[65%] mx-auto z-10'>
            <div className='flex-grow flex justify-between bg-white rounded-md'>
              <Select
                defaultValue={'lucy'}
                options={[
                  {
                    value: 'lucy',
                    label: 'Lucy'
                  }
                ]}
                bordered={false}
                className='w-[180px] h-full'
              />
              <Divider type='vertical' className='h-[60%] m-auto bg-slate-200' />
              <form className='flex-grow flex justify-between'>
                <input className='flex-grow h-full px-4 outline-none text-black focus:outline-none' />
                <div className='flex gap-4'>
                  <CloseOutlined className='text-black cursor-pointer opacity-50 hover:opacity-100' />
                  <div className='p-1.5'>
                    <button className='h-full w-[calc(54px-2*1.5*4px)] bg-[#2E5FD0] hover:bg-[#336aea] rounded-md cursor-pointer'>
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
              <FaRegLightbulb className='text-xl' />
              <span className='px-2'>Danh mục đề gợi ý</span>
            </Button>
          </div>
          {/* End Search bar */}
          <div className='flex justify-center gap-1 z-10'>
            {topSearchKey.map(searchKey => (
              <Tag
                key={searchKey}
                icon={<SearchOutlined className='text-white' />}
                className='py-1 px-2 text-white bg-white/20 hover:bg-white/30 font-bold border-transparent cursor-pointer'
              >
                {searchKey}
              </Tag>
            ))}
          </div>
          <div className='relative flex gap-8 my-8 z-10'>
            <Swiper
              slidesPerView={5}
              spaceBetween={64}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              modules={[Autoplay, Navigation]}
              className='w-[90%]'
            >
              {categories.map(category => (
                <SwiperSlide key={category.title}>
                  <CategoryThumbnail
                    {...category}
                    onMouseEnter={() => setBgImg(category.thumbnail)}
                    onMouseLeave={() => setBgImg(null)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className={clsx('swiper-button-prev', swiperButtonClasses)}></button>
            <button className={clsx('swiper-button-next', swiperButtonClasses)}></button>
          </div>
        </div>
      </Container>
      {/* Background */}
      <div
        className={clsx('ct-home-head-section-bg absolute top-0 left-0 w-full h-full', {
          'opacity-60 duration-[2s]': bgImg
        })}
      ></div>
      <div
        key={bgImg}
        className='animate-head-section-bg-fade-in absolute top-0 left-0 w-full h-full -z-10 bg-no-repeat bg-cover bg-center'
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      {/* End Background */}
    </div>
  );
};

export default HeadSection;
