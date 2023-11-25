import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { categories } from './_rendering';
import CategoryThumbnail from './__CategoryThumbnail';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CategorySlider = ({ setBgImg }) => {
  const swiperButtonClasses = 'bg-transparent text-white/40 hover:text-white';

  return (
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
  );
};

export default CategorySlider;
