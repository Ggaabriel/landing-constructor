import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import maskProject from "/maskProject.png";
import ponart from '@/src/assets/photo_2023-10-13_21-35-06.jpg'
import utki from '@/src/assets/photo_2023-10-13_21-35-25.jpg'
import "swiper/css";
import useLongPress from "@/src/hooks/useLongPress.ts";
import { SelectedBlock } from "./SelectedBlock";
import { Link } from "react-router-dom";

import { IuserProjects } from ".";

interface IProjectProps {
    projects: IuserProjects[];
    setActiveIndex: (index: number) => void;
    activeIndex: number;
    handleDeleteProject: () => void;
}
const Projects: FC<IProjectProps> = ({
    projects,
    setActiveIndex,
    activeIndex,
    handleDeleteProject,
}) => {
    const [selectedImageWidth, setSelectedImageWidth] = useState<any>();
    const [modalStatus, setModalStatus] = useState(false);
    const [activeSlide, setActiveSlide] = useState(false);

    const openModalWindow = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        setModalStatus(!modalStatus);
        setSelectedImageWidth({
            margin: rect.top,
            height: rect.height,
            width: rect.width,
        });
        setTimeout(() => {
            setActiveSlide(true);
        }, 100);
    };
    const longPress = useLongPress(openModalWindow);

    return (
        <>
            {modalStatus && (
                <SelectedBlock
                    style={{
                        marginTop: selectedImageWidth
                            ? selectedImageWidth.margin
                            : "" ?? "auto",
                        width: selectedImageWidth.width,
                        backgroundImage: `url(${maskProject})`,
                    }}
                    setModalStatus={setModalStatus}
                    handleDeleteProject={handleDeleteProject}
                    setActiveSlide={setActiveSlide}
                />
            )}
            <Swiper
                spaceBetween={15}
                className="mySwiper container overflow-visible h-[50vh] pt-10"
                slidesPerView={1.8}
                centeredSlides={true}
                onSlideChange={(e) => {
                    setActiveIndex(e.realIndex);
                    if (e.activeIndex + 1 == 0) e.slideTo(1);
                    else if (e.activeIndex == e.slides.length - 1)
                        e.slideTo(e.slides.length - 2);
                }}
                onActiveIndexChange={(e) => {
                    setActiveIndex(e.realIndex);
                    if (e.activeIndex + 1 == 0) e.slideTo(1);
                    else if (e.activeIndex == e.slides.length - 1)
                        e.slideTo(e.slides.length - 2);
                }}
                onInit={() => setActiveIndex(0)}
                initialSlide={0}
                breakpoints={{
                    550: {
                        slidesPerView: 1.2,
                    },
                }}
            >
                {projects.map((item: any, i: number) => {
                    return (
                        <SwiperSlide key={i++} {...longPress} className="">
                            <Link to={`/yoursite/${item.ID}`}>
                                <div
                                    style={{
                                        backgroundImage: i % 3 === 0 ? `url(${maskProject})` : i % 3 === 1 ? `url(${ponart})` : `url(${utki})`,
                                        opacity:
                                            activeIndex === i && activeSlide
                                                ? "0"
                                                : "100",
                                    }}
                                    className={`w-full h-full transition-all duration-200 text-center background-position-centre bg-center ${
                                        activeIndex === i ? "!scale-[1.1]" : ""
                                    }`}
                                >
                                    <span
                                        className={`text-black text-[24px] uppercase absolute -bottom-8 left-1/2 -translate-x-1/2 duration-200 -z-10`}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}

                <SwiperSlide>
                    <div
                        className={`w-full h-[276px] transition-all duration-200 text-center flex items-center justify-center`}
                    >
                        <Link
                            to={"/blanks/1"}
                            className="w-20 h-20 border border-black rounded-full flex items-center justify-center text-[48px] font-medium"
                        >
                            +
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export { Projects };
