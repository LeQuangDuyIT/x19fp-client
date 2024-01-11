import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { useRef } from 'react';
import 'swiper/css';
import clsx from 'clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const TESTIMONIAL_SWIPER_BUTTON = {
  NEXT: 'swiper-button-next-1',
  PREV: 'swiper-button-prev-1'
};

const Testimonial = () => {
  const testimonialRef = useRef();

  const testimonialSwiperConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: `.${TESTIMONIAL_SWIPER_BUTTON.NEXT}`,
      prevEl: `.${TESTIMONIAL_SWIPER_BUTTON.PREV}`
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    modules: [Autoplay, Navigation]
  };

  const testimonialButtonStyleNext =
    'absolute z-10 right-0  top-1/2 -translate-y-1/2 bg-transparent text-5xl text-white/40 hover:text-white';
  const testimonialButtonStylePrev =
    'absolute z-10 left-0  top-1/2 -translate-y-1/2 bg-transparent text-5xl text-white/40 hover:text-white';

  return (
    <div className='h-[500px] relative  bg-blue-400 p-7 '>
      <div className='text-center'> Người dùng nhận xét vè TestBank </div>
      <Swiper
        {...testimonialSwiperConfig}
        className=' text-center h-full  '
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      <button className={clsx(TESTIMONIAL_SWIPER_BUTTON.NEXT, testimonialButtonStyleNext)}>
        <IoIosArrowForward />
      </button>
      <button className={clsx(TESTIMONIAL_SWIPER_BUTTON.PREV, testimonialButtonStylePrev)}>
        <IoIosArrowBack />
      </button>
    </div>
  );
};

// const Testimonial = () => {
//   useEffect(() => {
//     // Swiper initialization code
//   }, []);

//   return (
//     <div>
//       <Swiper
//         modules={[Navigation]}
//         navigation={{
//           nextEl: '.swiper-button-next-1',
//           prevEl: '.swiper-button-prev-1'
//         }}
//         pagination={{ clickable: true }}
//       >
//         <SwiperSlide>Slide 1</SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//       </Swiper>

//       <Swiper
//         navigation={{
//           nextEl: '.swiper-button-next-2',
//           prevEl: '.swiper-button-prev-2'
//         }}
//         pagination={{ clickable: true }}
//       >
//         <SwiperSlide>Slide A</SwiperSlide>
//         <SwiperSlide>Slide B</SwiperSlide>
//         <SwiperSlide>Slide C</SwiperSlide>
//         <div className='swiper-button-next-2'> next </div>
//         <div className='swiper-button-prev-2'> previous </div>
//       </Swiper>
//     </div>
//   );
// };

export default Testimonial;
