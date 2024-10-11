import { Swiper } from "swiper/react";

import { SwiperSlide } from "swiper/react";
import { TouchEvent, MouseEvent, useEffect, useState, useRef } from "react";
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
    setTemp,
    Template,
} from "@/src/store/slice/EditSlice";
// import TwoBlockPreview from "@/src/shared/FormsPrev/TwoBlockPreview";
import { setIndex } from "@/src/store/slice/FormIndexSlice";
import { Reorder } from "framer-motion";
import gsap from "gsap";
const PageEdit = () => {
    const [buttonActive, setButtonActive] = useState(false);
    const templates = useAppSelector((state) => state.edit.templates);
    const user = useAppSelector((state) => state.user);
    const [clickLocation, setClickLocation] = useState({ x: 0, y: 0 });
    const backspaceLongPress = useLongPress((e) => {
        openMenu(e);
    });

    const openMenu = (e: MouseEvent & TouchEvent) => {
        setButtonActive(!buttonActive);
        console.log(
            e.changedTouches ? +e.changedTouches[0].clientX : +e.clientX
        );

        const x = e.changedTouches ? +e.changedTouches[0].clientX : +e.clientX;
        const y = e.changedTouches ? +e.changedTouches[0].clientY : +e.clientY;
        setClickLocation({ x, y });
        console.log(clickLocation);
        // +e.changedTouches[0].clientY
        // +e.clientY
        handleMouseDown()
    };

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
    const menuItems = useRef([]);

    const handleMouseDown = () => {
        const tl = gsap.timeline();

        menuItems.current.forEach((item, index) => {
            const angle =
                ((index / (menuItems.current.length - 1)) * Math.PI) / 2; // Распределение по полукругу
            const radius = 150; // Радиус полукруга

            tl.to(
                item,
                {
                    duration: 2,
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: 1,
                    ease: "power2.out",
                    delay: index * 0.1, // Задержка между элементами
                },
                0
            ); // Все анимации запускаются одновременно, с задержками
        });
    };


    const addToRefs = (el) => {
        if (el && !menuItems.current.includes(el)) {
            menuItems.current.push(el);
        }
    };
    return (
        <>
            <img
                src="/maskProject.png"
                alt=""
                className="absolute z-0 w-full h-screen object-cover"
            />
            <div className=" h-[inherit] overflow-y-scroll w-[inherit] relative">
                {/* {templates[activeIndex] && templates && (
                    <Categories tempalteId={templates[activeIndex].ID} />
                )} */}
                <div
                    onMouseDown={handleMouseDown}
                    className="w-5 h-5 bg-black absolute z-50"
                    style={{
                        width: "100px",
                        height: "100px",
                        position: "relative",
                        left: clickLocation.x,
                        top: clickLocation.y

                    }}
                    
                >
                    {[1, 2, 3, 4].map((item, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="menu-item"
                            style={{
                                position: "absolute",
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                backgroundColor: "#3498db",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                opacity: 0,
                                cursor: "pointer",
                            }}
                            onMouseEnter={() =>
                                gsap.to(menuItems.current[index], {
                                    scale: 1.2,
                                    backgroundColor: "#e74c3c",
                                    duration: 0.2,
                                })
                            }
                            onMouseLeave={() =>
                                gsap.to(menuItems.current[index], {
                                    scale: 1,
                                    backgroundColor: "#3498db",
                                    duration: 0.2,
                                })
                            }
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <Reorder.Group
                    className="overflow-visible grid justify-center absolute left-0 w-full"
                    values={templates}
                    onReorder={(newOrder) => dispatch(setTemp(newOrder))}
                    axis="y"
                >
             
                    {templates &&
                        templates.map((template: Template, i: number) => {
                            console.log(template);

                            return (
                                <Reorder.Item
                                    value={template}
                                    key={template.ID}
                                    className="flex flex-col justify-center mb-10 w-fit"
                                >
                                    <span
                                        className={`text-white text-center transition-all duration-200 `}
                                    >
                                        {template.name === ""
                                            ? "Название формы"
                                            : template.name}
                                    </span>
                                    <div
                                        className={`relative py-[30px] px-[26px] rounded-[15px] flex gap-[10px] justify-center items-center transition-all duration-200 `}
                                        style={{
                                            background:
                                                template.background_type ===
                                                "COLOR"
                                                    ? template.background_color
                                                    : "",
                                            backgroundImage:
                                                template.background_type ===
                                                "IMAGE"
                                                    ? `url(${
                                                          import.meta.env
                                                              .VITE_BASE_URL
                                                      }/template/${
                                                          template.ID
                                                      }/image)`
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
                                                {template.modules.map(() => {
                                                    return (
                                                        <div
                                                            style={{
                                                                width: `${10}vw`,
                                                                height: `${5}vh`,
                                                            }}
                                                            className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white`}
                                                        ></div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Reorder.Item>
                            );
                        })}
                    {!templates.length && (
                        <div className="w-full flex justify-center font-[700] text-white text-[40px] leading-10 text-center">
                            Выберите форму
                        </div>
                    )}
                </Reorder.Group>
                {/* </Swiper> */}
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
