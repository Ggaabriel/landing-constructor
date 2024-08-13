import {  patchTemplateById } from "@/src/axios";
import Alignment from "../Alignment";
import { CheckedButton } from "@/src/shared/Buttons/CheckedButton";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import Success from "@/src/components/Success";
import Loader from "@/src/shared/Loader";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { getProjectWithTemplatesByIdThunk } from "@/src/store/slice/EditSlice";

const FormParametrs = () => {
    const [align, setAlign] = useState("left");
    const [value, setValue] = useState("");
    const [textColor, setTextColor] = useState("#0000FF");
    const [visible, setVisible] = useState<boolean>(false);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const activeIndex = useAppSelector((state) => state.formIndex.index);
    const { templates, isLoading} = useAppSelector(
        (state) => state.edit
    );
    const updateTemplate = async () => {
        if (id) {
            await patchTemplateById(id, {
                name: value,
                text_align: align,
                text_color: textColor,
            });
            setVisible(true);
        }
    };
    if (visible) {
        setTimeout(() => {
            setVisible(false);
        }, 2500);
    }
    async function get() {
        const getLocal = localStorage.getItem("projectId");
        if (getLocal) {
            await dispatch(
                getProjectWithTemplatesByIdThunk({
                    projectId: getLocal,
                })
            );
            
        }
    }
    function setFields() {
        if(templates.length){
        setAlign(templates[activeIndex].text_align);
        setValue(templates[activeIndex].name);

        setTextColor(templates[activeIndex].text_color);
    }
    }
    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        setFields()
    }, [templates]);
    return (
        <>
            {visible && (
                <Success visible={visible} title="Форма успешно изменена" />
            )}
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="">
                        <h1 className="pt-4 text-xl font-bold text-center">
                            Параметры Текста формы
                        </h1>
                        <p className="descr font-semibold text-black/60 spacing leading-[143.4%] text-center text-[14px] pt-4">
                            Редактируйте параметры всей формы Выбери
                            центрирование Выбери цвет
                        </p>
                    </div>
                    <div className="pt-4">
                        <div className="relative">
                            <input
                                name={"nameForm"}
                                type="text"
                                className={`text-[16px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5`}
                                placeholder="Название Формы "
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            {/* {active && (
                        <div className=" aspect-square w-5 absolute block rotate-180 top-4 rounded-full bg-green-200 text-[30px] right-3"></div>
                    )} */}
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-8">
                        <span className="font-medium text-[#B6B6B6] spacing leading-[143.4%] text-center text-[18px]">
                            Цвет текста
                        </span>

                        <label
                            htmlFor=""
                            className="w-[200px] h-[30px] rounded-[10px] bg-black"
                            style={{
                                background: textColor,
                            }}
                        >
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-full h-full opacity-0"
                            />
                        </label>
                    </div>
                    <div className="pt-8">
                        <Alignment align={align} setAlign={setAlign} />
                    </div>
                    <div className="flex justify-between items-center pt-8">
                        <span>
                            Отображать название <br /> на сайте{" "}
                        </span>
                        <CheckedButton checked={false} />
                    </div>
                    <SubmitButton
                        buttonActive={false}
                        title="Изменить форму"
                        handleClick={() => updateTemplate()}
                    />
                </>
            )}
        </>
    );
};

export default FormParametrs;
