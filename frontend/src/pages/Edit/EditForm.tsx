import { Swiper, SwiperSlide } from "swiper/react";
import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Filter } from "../../shared/Filter";

import { setActive } from "../../store/slice/ButtonSlice";

import useDraggableBlock from "@/src/hooks/useDragble";
import { postModuleById, postTemplateById } from "@/src/axios";
import { getProjectWithTemplatesByIdThunk } from "@/src/store/slice/EditSlice";
import TwoBlockPreview from "@/src/shared/FormsPrev/TwoBlockPreview";

interface IeditForm {
    projectId: string;
}

const EditForm: FC<IeditForm> = ({ projectId }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const isActive = useAppSelector((state) => state.isActive.valueModal);
    const dispatch = useAppDispatch();

    let y: number | null = null;
    let x: number | null = null;

    const handleTouchStart = (e: any) => {
        const firstTouch = e.touches[0];
        y = firstTouch.clientY;
        x = firstTouch.clientY;
    };

    const handleTouchMove = (e: any) => {
        if (!y || !x) {
            return false;
        }

        let y2 = e.touches[0].clientY;
        let x2 = e.touches[0].clientY;
        let yDiff = y2 - y;
        let xDiff = x2 - x;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                console.log("right");
            } else {
                console.log("left");
            }
        } else {
            if (yDiff > 0) {
                if (yDiff > 10) {
                    dispatch(setActive(false));
                    console.log("down");
                }
            } else {
                console.log("top");
            }
        }
        console.log(yDiff);

        x = null;
        y = null;
    };

    const { position, isDragging, handleStart } = useDraggableBlock({
        initialPosition: { y: 0 },
        dropZoneId: "dropZone",
        onDragEnd: handleAdd,
    });
    async function get() {
        console.log(projectId);
        await dispatch(
            getProjectWithTemplatesByIdThunk({ projectId: projectId })
        );
    }
    async function handleAdd() {
        position.y = 0;

        const targetTemp = await postTemplateById(projectId, {
            name: "troshkinBlock",
            background_color: "#333",
            text_color: "red",
            text_align: "center",
            scheme: "",
            background_type: "COLOR",
            procedure_background: {
                background_color: "#ffffff",
                blur: 5,
                color: "#000000",
                count: 3,
                speed: 2,
            },
        });
        if(activeIndex !== null){
            for(let i = 0; i <= activeIndex ;i++){
                await postModuleById(targetTemp, {
                    background_color: "white",
                    header_text: "string",
                    subheader_text: "string",
                    text_align: "string",
                    text_color: "string",
                    background_type: "COLOR",
                    procedure_background: {
                        background_color: "#ffffff",
                        blur: 5,
                        color: "#000000",
                        count: 3,
                        speed: 2,
                    },
                });
            }
        }
        await get();

        dispatch(setActive(!isActive));
    }

    // async function addTemplate() {
    //     await postTemplateById(projectId, {
    //         name: "troshkinBlock",
    //         background_color: "#333",
    //         text_color: "red",
    //         text_align: "center",
    //         scheme: "",
    //         background_type: "COLOR",
    //         procedure_background: {
    //             background_color: "#ffffff",
    //             blur: 5,
    //             color: "#000000",
    //             count: 3,
    //             speed: 2,
    //         },
    //     });
    //     await get();
    // }
    const templates = [
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5, 6],
    ];
    return (
        <>
            <div
                id="dropZone"
                className={`absolute top-[30vh] w-full bg-white h-[70vh] z-50 transition-all duration-500 ${
                    isActive ? "" : "translate-y-full opacity-0"
                }`}
                onTouchStart={(e) => handleTouchStart(e)}
                onTouchMove={(e) => handleTouchMove(e)}
            >
                <div className="container">
                    <Filter
                        filterName={["Популярные", "Избранные", "Все", "Архив"]}
                        setIndex={() => {}}
                    />
                    <div className="pt-4">
                        <Swiper
                            spaceBetween={13}
                            className="mySwiper overflow-visible  relative"
                            slidesPerView={1.5}
                            loop={true}
                            centeredSlides={true}
                            breakpoints={{
                                550: {
                                    slidesPerView: 2,
                                },
                            }}
                            onSlideChange={(e) => setActiveIndex(e.realIndex)}
                        >
                            {templates.map((_, i) => {
                                const isActive = activeIndex === i;
                                const [isDraggingSlide, setIsDraggingSlide] =
                                    useState(false);
                                return (
                                    <SwiperSlide
                                        key={i}
                                        className="w-auto flex justify-center relative top-0 left-0 transition-all duration-500"
                                        style={{
                                            top: isActive ? position.y : 0,
                                            cursor: isDragging
                                                ? "grabbing"
                                                : "grab",
                                            transition: isDraggingSlide
                                                ? "none"
                                                : ".2s", // Применяем transition только при отпускании
                                        }}
                                        onMouseDown={(e: any) => {
                                            if (isActive) {
                                                setIsDraggingSlide(true); // Устанавливаем флаг перетаскивания
                                                handleStart(e);
                                            }
                                        }}
                                        onMouseUp={() => {
                                           
                                            setIsDraggingSlide(false); // Сбрасываем флаг перетаскивания при отпускании
                                            position.y = 0;
                                        }}
                                        onTouchStart={(e: any) => {
                                            if (isActive) {
                                                setIsDraggingSlide(true); // Устанавливаем флаг перетаскивания
                                                handleStart(e);
                                            }
                                        }}
                                        onTouchEnd={() => {
                                            
                                            setIsDraggingSlide(false); // Сбрасываем флаг перетаскивания при отпускании
                                            position.y = 0;
                                        }}
                                        onClick={() => position.y = 0}
                                    >
                                        <div
                                            className={`p-[20px] bg-white rounded-[15px] grid grid-cols-3 grid-rows-2 gap-[10px] justify-center items-center transition-all duration-200 ${
                                                isActive
                                                    ? "scale-[1.2] shadow-inner"
                                                    : ""
                                            }`}
                                        >
                                            {_.map(() => {
                                                return (
                                                    <div className="w-[45px] h-[45px] shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white"></div>
                                                );
                                            })}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <span className=" block pt-[40px] text-[16px] font-[600] opacity-60 text-center">
                            Эта форма лучше всего подойдет для
                        </span>
                        <TwoBlockPreview h={"100px"} w={"100px"} />
                    </div>

                    <button
                        disabled={false}
                        className={`transition absolute left-1/2 -translate-x-1/2 bottom-2 tall:bottom-[7%] text-white mx-auto w-[90%] py-[15px] rounded-[15px] bg-gradient-to-r whitespace-nowrap  disabled:opacity-50 from-black to-[#545454]`}
                        onClick={() => {
                            dispatch(setActive(!isActive));
                        }}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditForm;
