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
import Procedure_background from "@/src/forms/procedure_background";

interface IeditForm {
    projectId: string;
}

const EditForm: FC<IeditForm> = ({ projectId }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const isActive = useAppSelector((state) => state.isActive.valueModal);
    const dispatch = useAppDispatch();
    const procedure_background = new Procedure_background({});
    const [isDraggingSlide, setIsDraggingSlide] = useState(false);
    const template = {
        name: "Template",
        background_color: "#333",
        text_color: "red",
        text_align: "center",
        scheme: "",
        background_type: "COLOR",
        procedure_background,
    };
    const module = {
        background_color: "white",
        header_text: "string",
        subheader_text: "string",
        text_align: "string",
        text_color: "string",
        background_type: "COLOR",
        procedure_background,
    };

    const slideEvents = (setIsDraggingSlide: (status: boolean) => void) => {
        const onMouseDown = (e: any) => {
            if (isActive) {
                setIsDraggingSlide(true); // Устанавливаем флаг перетаскивания
                handleStart(e);
            }
        };
        const onMouseUp = () => {
            setIsDraggingSlide(false); // Сбрасываем флаг перетаскивания при отпускании
            position.y = 0;
        };
        const onTouchStart = (e: any) => {
            if (isActive) {
                setIsDraggingSlide(true); // Устанавливаем флаг перетаскивания
                handleStart(e);
            }
        };
        const onTouchEnd = () => {
            setIsDraggingSlide(false); // Сбрасываем флаг перетаскивания при отпускании
            position.y = 0;
        };
        const onClick = () => (position.y = 0);

        return { onMouseDown, onMouseUp, onTouchStart, onTouchEnd, onClick };
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

        const targetTemp = await postTemplateById(projectId, template);
        if (activeIndex !== null) {
            for (let i = 0; i <= activeIndex; i++) {
                await postModuleById(targetTemp, module);
            }
        }
        await get();

        dispatch(setActive(!isActive));
    }

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
                className={`absolute bottom-0 flex flex-col w-full h-[100vh] z-50 transition-all duration-500 ${
                    isActive ? "" : "translate-y-full opacity-0"
                }`}
            >
                <div
                    onClick={() => dispatch(setActive(!isActive))}
                    className="flex-grow"
                    id="dropZone"
                ></div>
                <div className="h-96 bg-white">
                    <h2 className="text-2xl font-medium text-center pt-5">Формы</h2>
                    <div className="top-[15%] relative">
                        
                        <Swiper
                            spaceBetween={13}
                            className="mySwiper overflow-visible top-1/2  relative"
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
                            {templates.map((template, i) => {
                                const isActive = activeIndex === i;
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
                                        {...slideEvents(setIsDraggingSlide)}
                                    >
                                        <div
                                            className={`p-[20px]  shadow-inner bg-white rounded-[15px] grid grid-cols-3 grid-rows-2 gap-[10px] justify-center items-center transition-all duration-200 ${
                                                isActive
                                                    ? "scale-[1.2]"
                                                    : ""
                                            }`}
                                        >
                                            {template.map(() => {
                                                return (
                                                    <div className="w-[45px] h-[45px] shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white"></div>
                                                );
                                            })}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
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
