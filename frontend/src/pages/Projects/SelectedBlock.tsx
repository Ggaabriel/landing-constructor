import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IProjectProps } from "./SelectedBlockInterface";
import { Link } from "react-router-dom";
import gsap from "gsap";
import useDraggableBlock from "@/src/hooks/useDragble";
import trash from "../../assets/icons/trash.svg";

interface ISelectedBlockProps extends IProjectProps {
    setModalStatus: (status: boolean) => void;
    handleDeleteProject: () => void;
    setActiveSlide: (status: boolean) => void;
}

const SelectedBlock: FC<ISelectedBlockProps> = ({
    style,
    setModalStatus,
    handleDeleteProject,
    setActiveSlide,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const spawn = useRef<any>();
    useEffect(() => {
        gsap.to(spawn.current, {
            duration: 0.1,
            opacity: 1,
            ease: "linear",
        });
    }, []);
    const handleContextMenu = (event: any) => {
        event.preventDefault(); // Предотвращаем стандартное действие браузера (появление контекстного меню)
        return false; // Дополнительно предотвращаем появление контекстного меню на устройствах с сенсорными экранами
    };

    const handleDelete = () => {
        // tg.offEvent("viewportChanged", projectMove)
        handleDeleteProject();
        setModalStatus(false);
    };
    const { position, isDragging, handleStart } = useDraggableBlock({
        initialPosition: { y: 0 },
        dropZoneId: "dropZone",
        onDragEnd: handleDelete,
    }); // хук который позволяет делать свайп
    // tg.onEvent("viewportChanged", projectMove)

    // function projectMove(this:any){
    //     tg.expand();
    //     this.viewportHeight = tg.viewportStableHeight;
    // }
    // useEffect(()=>{
    //     console.log(position.y);

    // },[position])
    const [isEnter, setEnter] = useState(false);
    const detectTouch = (e) => {
        if (+e.changedTouches[0].clientY <= +style.marginTop && isDragging) setEnter(true);
        else setEnter(false);
    };
    const detectMouse = (e) => {
        if (+e.clientY <= +style.marginTop && isDragging) setEnter(true);
        else setEnter(false);
    };

    return (
        <div
            ref={spawn}
            className=" opacity-0 fixed top-0 z-10 left-0 h-screen w-full "
        >
            <div
                onClick={() => {
                    setModalStatus(false);
                    setActiveSlide(false);
                }}
                className="w-full h-full absolute  bg-[#53535359] backdrop-blur-sm transition"
            ></div>

            <div
                onClick={() => {
                    setModalStatus(false);
                    setActiveSlide(false);
                }}
                id="dropZone"
                style={{
                    height: style.marginTop,
                    opacity: Math.abs(position.y) + "%",
                }}
                className="flex items-center justify-center absolute w-full bg-gradient-to-r whitespace-nowrap disabled:opacity-50 from-[#F55F5F] to-[#D4AEAE]"
            >
                <img src={trash} className="h-20 w-20 " alt="" />
            </div>

            <div className="z-10 container overflow-visible transition-all h-full  ">
                <div className="w-auto">
                    <div
                        onTouchEnd={detectTouch}
                        onMouseUp={detectMouse}
                        style={{
                            ...style,
                            position: "relative",
                            top: position.y,
                            cursor: isDragging ? "grabbing" : "grab",
                            zIndex: 100,
                        }}
                        onMouseDown={(e) => {
                            handleStart(e);
                        }}
                        onTouchStart={(e) => {
                            handleStart(e);
                        }}
                        onTouchMove={detectTouch}
                        onMouseMove={detectMouse}
                        className={`bg-cover bg-center animate-shake select-none z-10 h-[50vh] mx-auto ${!isDragging && " transition-all "}`}
                        onContextMenu={handleContextMenu}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                background: "#f35858",
                                opacity: isEnter ? "50%" : 0,
                            }}
                        ></div>
                    </div>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-[300px] select-none py-[10px] bg-[#EEEEEE] opacity-70 absolute  left-1/2 -translate-x-1/2 rounded-[16px] mt-4 z-0 overflow-hidden"
                    >
                        <div className="">
                            <button
                                onClick={() => setIsEdit(true)}
                                className=" block px-[18px] text-start w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap mb-[5px]"
                            >
                                Редактировать
                            </button>
                            <Link
                                to={"/"}
                                className="block px-[18px] w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap mt-[5px] mb-[5px]"
                            >
                                Изменить название проекта
                            </Link>
                            <Link
                                to={"/"}
                                className="block px-[18px] w-full  text-[16px] whitespace-nowrap mt-[5px] mb-[5px]"
                            >
                                Настройка домена
                            </Link>
                            {/* <button
                                className=" px-[18px] text-[#FF0000] text-[16px] font-[500]"
                                onClick={handleDelete}
                            >
                                Удалить
                            </button> */}
                        </div>
                        <div
                            className={`absolute w-full h-full bg-[#EEEEEE] top-0  py-[10px] duration-200 ${
                                isEdit ? "left-0" : "left-full"
                            }`}
                        >
                            <Link
                                to={"edit/"}
                                className=" block px-[18px] w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap ] mb-[5px]"
                            >
                                Шаблоны
                            </Link>
                            <Link
                                to={`logo/`}
                                className=" block px-[18px] w-full border-b border-b-[#A6A0A0] text-[16px] whitespace-nowrap ] mb-[5px]"
                            >
                                Логотип
                            </Link>
                            <button
                                className=" px-[18px] text-[#FF0000] text-[16px] font-[500]"
                                onClick={() => setIsEdit(false)}
                            >
                                назад
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SelectedBlock };
