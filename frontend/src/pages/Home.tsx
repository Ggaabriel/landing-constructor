import { Swiper, SwiperSlide } from "swiper/react";
import { Menu } from "../components/Menu";
import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

import maskProject from "/maskProject.png";
import ponart from '@/src/assets/photo_2023-10-13_21-35-06.jpg'
import utki from '@/src/assets/photo_2023-10-13_21-35-25.jpg'

const Home = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const {telegramID} = useAppSelector(state=> state.user.user)
    return (
        <>
            <div className=" h-screen justify-center bg-white">
                <div className="h-screen">
                    <div className="flex items-center h-screen">
                        <Swiper
                            className="mySwiper container overflow-visible z-0 w-full h-[100vh]"
                            slidesPerView={"auto"}
                            spaceBetween={20}
                            centeredSlides={true}
                            onSlideChange={(e) => {
                                setActiveIndex(e.realIndex);
                            }}
                            breakpoints={{
                                550: {
                                    slidesPerView: 1.2,
                                },
                            }}
                        >
                            {[...Array(5)].map((_, i) => (
                                <SwiperSlide
                                    className={`flex  items-center justify-center ${
                                        activeIndex === i ? "scale-[1.2]" : ""
                                    }`}
    
                                    key={i}
                                >
                                    <img
                                        src={i % 3 === 0 ? maskProject : i % 3 === 1 ? ponart : utki}
                                        alt="mask"
                                        className={`h-[50%] duration-200 w-[200px] object-cover ${
                                            activeIndex === i
                                                ? "scale-[1.2]"
                                                : ""
                                        }`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="container">
                    <Menu userImg={`${import.meta.env.VITE_BASE_URL}/user/${telegramID}/image`} />
                </div>
            </div>
        </>
    );
};

export default Home;
