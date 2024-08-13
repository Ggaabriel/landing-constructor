import { Swiper } from "swiper/react";

import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import useLongPress from "../../hooks/useLongPress";
import { DeleteButton } from "../../shared/Buttons/DeleteButton";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { setActive } from "@/src/store/slice/ButtonSlice";
import { Categories } from "./Categories";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { deleteTemplateById } from "@/src/axios";
import {
    getProjectWithTemplatesByIdThunk,
    setActiveIndexEdit,
} from "@/src/store/slice/EditSlice";
// import TwoBlockPreview from "@/src/shared/FormsPrev/TwoBlockPreview";
import { setIndex } from "@/src/store/slice/FormIndexSlice";
const PageEdit = () => {
    const [buttonActive, setButtonActive] = useState(false);
    const templates = useAppSelector((state) => state.edit.templates);
    const user = useAppSelector((state) => state.user);
    const backspaceLongPress = useLongPress(() => {
        setButtonActive(!buttonActive);
    });
    const activeIndex = useAppSelector((state) => state.formIndex.index);

    const dispatch = useAppDispatch();
    const projectId = localStorage.getItem("projectId");

    async function initTemplates() {
        if (!user.userProjects.length && projectId) {
            dispatch(
                getProjectWithTemplatesByIdThunk({ projectId: projectId })
            );
        } else {
            localStorage.setItem(
                "projectId",
                user.userProjects[user.activeIndex].ID
            );
            dispatch(
                getProjectWithTemplatesByIdThunk({
                    projectId: user.userProjects[user.activeIndex].ID,
                })
            );
        }
    }
    useEffect(() => {
        initTemplates();
    }, []);

    async function delTemp() {
        if (projectId) {
            if (typeof templates !== "string") {
                await deleteTemplateById(templates[activeIndex].ID);
                await dispatch(
                    getProjectWithTemplatesByIdThunk({ projectId: projectId })
                );
            }
        }
    }

    return (
        <>
            <img
                src="/maskProject.png"
                alt=""
                className="absolute z-0 w-full h-screen object-cover"
            />
            <div className="container" >
                {templates[activeIndex] && templates && (
                    <Categories tempalteId={templates[activeIndex].ID} />
                )}

                <div className="forms pt-[273px]">
                    <Swiper
                        spaceBetween={13}
                        className="mySwiper overflow-visible transition-all duration-500 absolute top-1/2 left-0 w-full"
                        slidesPerView={1.6}
                        centeredSlides={true}
                        breakpoints={{
                            550: {
                                slidesPerView: 1.2,
                            },
                        }}
                        onSlideChange={(e) => console.log(e.realIndex)}
                        initialSlide={0}
                        onActiveIndexChange={(e) => {
                            dispatch(setIndex(e.activeIndex));
                            dispatch(
                                setActiveIndexEdit(
                                    (e.realIndex = e.activeIndex)
                                )
                            );
                        }}
                    >
                        {templates &&
                            templates.map((_: any, i: number) => {
                                console.log(_);

                                return (
                                    <SwiperSlide
                                        key={i}
                                        className="w-auto flex justify-center "
                                    >
                                        <div
                                            className={` py-[30px] px-[26px] rounded-[15px] flex gap-[10px] justify-center items-center transition-all duration-200 ${
                                                activeIndex === i
                                                    ? "scale-[1.2]"
                                                    : ""
                                            }`}
                                            style={{
                                                background:
                                                    _.background_type ===
                                                    "COLOR"
                                                        ? _.background_color
                                                        : "",
                                                backgroundImage:
                                                    _.background_type ===
                                                    "IMAGE"
                                                        ? `url(${import.meta.env.VITE_BASE_URL}/template/${_.ID}/image)`
                                                        : "",
                                            }}
                                        >
                                            <div
                                                {...backspaceLongPress}
                                                className={`${
                                                    buttonActive
                                                        ? "animate-shake"
                                                        : ""
                                                }`}
                                            >
                                                <div className="grid grid-cols-3 grid-rows-2 gap-2 justify-center  select-none">
                                                    {_.modules.map(() => {
                                                        return(
                                                            <div
                                                            style={{
                                                                width: `${10}vw`,
                                                                height: `${5}vh`,
                                                            }}
                                                            className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white`}
                                                        ></div>
                                                        )

                                                    })}
                                                </div>
{/* 
                                                <TwoBlockPreview
                                                    h={"10vh"}
                                                    w={"20vw"}
                                                /> */}
                                            </div>

                                            <span
                                                className={`absolute -bottom-8 text-white transition-all duration-200 ${
                                                    activeIndex === i
                                                        ? "translate-y-0 opacity-100"
                                                        : "-translate-y-10 opacity-0"
                                                }`}
                                            >
                                                {_.name === ""
                                                    ? "Название формы"
                                                    : _.name}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        {!templates.length && (
                            <div className="w-full flex justify-center font-[700] text-white text-[40px] leading-10 text-center">
                                Выберите форму
                            </div>
                        )}
                    </Swiper>
                </div>
            </div>
            {projectId && <EditForm projectId={projectId} />}

            {buttonActive ? (
                <DeleteButton
                    title="Удалить"
                    buttonActive={false}
                    handleClick={() => {
                        delTemp();
                        setButtonActive(false);
                    }}
                />
            ) : (
                <button
                    disabled={false}
                    className={`transition absolute left-1/2 -translate-x-1/2 bottom-2 tall:bottom-[7%] text-white mx-auto w-[90%] py-[15px] rounded-[15px] bg-gradient-to-r whitespace-nowrap  disabled:opacity-50 from-black to-[#545454]`}
                    onClick={() => {
                        dispatch(setActive(true));
                    }}
                >
                    Все формы
                </button>
            )}
        </>
    );
};

export default PageEdit;
