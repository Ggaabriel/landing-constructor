import { FC, useEffect, useState } from "react";
import Alignment from "./Alignment";
import { getModuleById, patchModuleById, postModuleImg } from "@/src/axios";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import Success from "@/src/components/Success";
import Loader from "@/src/shared/Loader";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { getTemplatesWithModulesByIdThunk } from "@/src/store/slice/EditSlice";
import { useParams } from "react-router-dom";
import Procedure_background from "@/src/forms/procedure_background";

const FormHeadersParametrs: FC = () => {
    const [value, setValue] = useState({ nameModule: "", descrModule: "" });
    const [align, setAlign] = useState<string>("left");
    const [textColor, setTextColor] = useState<string>("white");
    const [backgroundColor, setBackgroundColor] = useState<string>("black");
    const [activeModule, setActiveModule] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isLoading, modules } = useAppSelector((state) => state.edit);
    const { id } = useParams();
    const getLocal = localStorage.getItem("projectId");
    async function get() {
        if (getLocal) {
            await dispatch(
                getTemplatesWithModulesByIdThunk({
                    templateId: id as string,
                })
            );
        }
    }
    useEffect(() => {
        get();
    }, []);

    const updateModule = async () => {
        await patchModuleById(modules[activeModule].ID, {
            background_color: backgroundColor,
            header_text: value.nameModule,
            subheader_text: value.descrModule,
            text_align: align,
            text_color: textColor,
            background_type: "COLOR",
            procedure_background: new Procedure_background({}),
        });
        setVisible(true);
    };
    if (visible) {
        setTimeout(() => {
            setVisible(false);
        }, 2500);
    }
    const getModule = async () => {
        if (modules.length) {
            const data = await getModuleById(modules[activeModule].ID);
            setBackgroundColor(data.background_color);
            setAlign(data.text_align);
            setTextColor(data.text_color);
            setValue({
                nameModule: data.header_text,
                descrModule: data.subheader_text,
            });
        }
    };
    useEffect(() => {
        if (modules) getModule();
    }, [modules, activeModule]);

    const [img, setImg] = useState<any>(null);
    const formData = new FormData();
    formData.append("file", img);

    const updateTemplateImg = async () => {
       

        if (modules[activeModule] && formData ) {
                await patchModuleById(modules[activeModule].ID, {
                background_type: "IMAGE",
            });
            console.log(modules[activeModule].ID);
            await postModuleImg(modules[activeModule].ID, formData); 
           
        }
    };

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <Success title="Форма успешно изменена" visible={visible} />
            </div>

            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="pt-4 h-full">
                    <div className="relative">
                        <div
                            className={`w-full py-[60px] bg-bg bg-cover mt-1 left-0`}
                        >
                            <div className="grid grid-cols-3 gap-2 justify-center">
                                {modules.length &&
                                    modules.map((_: any, i: number) => {
                                        return (
                                            <div
                                                key={i}
                                                onClick={() =>
                                                    setActiveModule(i)
                                                }
                                                style={{
                                                    width: `${100}px`,
                                                    height: `${100}px`,
                                                }}
                                                className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white ${
                                                    activeModule == i
                                                        ? "opacity-100"
                                                        : "opacity-50"
                                                }`}
                                            ></div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <>
                        <div className="">
                            <h1 className="pt-4 text-xl font-bold text-center">
                                Параметры {activeModule + 1}-ого модуля
                            </h1>
                            <p className="descr font-semibold text-black/60 spacing leading-[143.4%] text-center text-[14px] pt-4">
                                Введи необходимую информацию, <br />
                                Введи заголовок, <br />
                                Введи подзаголовок
                            </p>
                        </div>
                        <input
                            name="nameModule"
                            type="text"
                            className="text-[16px] text-[#999] not-italic font-medium mt-[43px] mb-[12px] capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                            placeholder="Название Модуля"
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    nameModule: e.target.value,
                                })
                            }
                            value={value.nameModule}
                        />

                        <input
                            name="descrModule"
                            type="text"
                            className="text-[16px] mb-[29px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5"
                            placeholder="Описание"
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    descrModule: e.target.value,
                                })
                            }
                            value={value.descrModule}
                        />

                        <div className="grid gap-[12px]">
                            <Alignment align={align} setAlign={setAlign} />
                        </div>
                        <div className="h-[250px]">
                            <div className="flex items-center justify-between pt-8 ">
                                <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                                    Цвет текста
                                </span>

                                <label
                                    className="w-[200px] h-[30px] bg-black rounded-[10px]"
                                    style={{ background: textColor }}
                                >
                                    <input
                                        name={"textColor"}
                                        type="color"
                                        value={textColor}
                                        onChange={(e) =>
                                            setTextColor(e.target.value)
                                        }
                                        className="w-full h-full opacity-0"
                                    />
                                </label>
                            </div>
                            <div className="flex items-center justify-between pt-8 ">
                                <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                                    цвет фона
                                </span>

                                <label
                                    className="w-[200px] h-[30px] bg-black rounded-[10px]"
                                    style={{ background: backgroundColor }}
                                >
                                    <input
                                        name="backgroundColor"
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) =>
                                            setBackgroundColor(e.target.value)
                                        }
                                        className="w-full h-full opacity-0"
                                    />
                                </label>
                            </div>
                            <div className="">
                                <span>Выберите фотки</span>
                                <label className="flex items-center px-4 py-2 bg-black text-white rounded">
                                    <svg
                                        className="w-6 h-6 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                    Выберите файл
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            e.target.files &&
                                            setImg(e.target.files[0])}
                                        }
                                    />
                                </label>
                            </div>
                        </div>

                        {img !== null ? 
                        <SubmitButton
                            buttonActive={false}
                            title="Отправить изображение"
                            handleClick={() => updateTemplateImg()}
                        /> : 
                        <SubmitButton
                            buttonActive={false}
                            title="Отправить на сайт "
                            handleClick={() => updateModule()}
                        />}
                    </>
                </div>
            )}
        </>
    );
};

export default FormHeadersParametrs;
