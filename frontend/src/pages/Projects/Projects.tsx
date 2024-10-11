import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import maskProject from "/maskProject.png";
import "./projects.css";
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
    const swiperRef = useRef(null);

    useEffect(()=>{
        swiperRef.current.swiper.allowTouchMove = !modalStatus; 
    },[modalStatus])
    return (
        <>
            <Swiper
                ref={swiperRef}
                style={{ transform: "none" }}
                slidesPerView={"auto"}
                spaceBetween={15}
                className="mySwiper overflow-visible h-[50vh] pt-10"
                centeredSlides={true}
                onSlideChange={(e) => {
                    setActiveIndex(e.realIndex);
                    if (e.activeIndex + 1 == 0) e.slideTo(1);
                    else if (e.activeIndex == e.slides.length - 1)
                        e.slideTo(e.slides.length - 1);
                }}
                onActiveIndexChange={(e) => {
                    setActiveIndex(e.realIndex);
                    if (e.activeIndex + 1 == 0) e.slideTo(1);
                    else if (e.activeIndex == e.slides.length - 1)
                        e.slideTo(e.slides.length - 1);
                }}
                onInit={() => setActiveIndex(0)}
                initialSlide={0}
            >
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
                {projects.map((item: any, i: number) => {
                    return (
                        <SwiperSlide
                            key={i++}
                            {...longPress}
                            className="max-w-[225px]"
                        >
                            <Link to={`/yoursite/${item.ID}`}>
                                <div
                                    style={{
                                        backgroundImage: `url(${maskProject})`,
                                        opacity:
                                            activeIndex === i && activeSlide
                                                ? "50%"
                                                : "100",
                                    }}
                                    className={`w-full h-full transition-all duration-200 text-center background-position-centre bg-center`}
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

                <SwiperSlide className=" max-w-[225px] border-2">
                    <Link
                        to={"/blanks/1"}
                        className="w-full h-full transition-all duration-200 text-center flex items-center justify-center"
                    >
                        <div
                            className={` w-20 h-20 flex items-center justify-center text-[48px] font-medium`}
                        >
                            +
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export { Projects };
