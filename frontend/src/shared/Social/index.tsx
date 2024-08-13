import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import vkLogo from "@/src/assets/icons/VK_logo.png";
import { FC, useState } from "react";
interface ISocialProps {
    handleClick: () => void;
}
const Social: FC<ISocialProps> = ({ handleClick }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    return (
        <>
            <span className="block mb-4">Соц сети</span>
            <Swiper
                spaceBetween={10}
                className="mySwiper overflow-visible transition-all duration-500 z-0"
                slidesPerView={3}
                centeredSlides={true}
                onSlideChange={(e) => setActiveIndex(e.realIndex)}
                breakpoints={{
                    550: {
                        slidesPerView: 1.2,
                    },
                }}
            >
                {[...new Array(8)].map((_, i) => {
                    return (
                        <SwiperSlide
                            key={i}
                            className={`text-white flex justify-center  transition-all duration-200 ${
                                activeIndex === i
                                    ? "!scale-[1.2]"
                                    : "grayscale blur-sm pointer-events-none"
                            }`}
                            onClick={handleClick}
                        >
                            <img src={vkLogo} alt="vklink" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export { Social };
