import { useState } from "react";
import { Filter } from "../../shared/Filter";
import FormBlock from "../Edit/FormBlock";
import Equalizer from "@/src/shared/Equalizer";
import { PagePallete } from "@/src/shared/Pallete";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addOpacity, setColor } from "@/src/store/slice/ColorSlice";
import Procedur from "./Procedur";
import { patchTemplateById, postTemplateImg } from "@/src/axios";
import { useParams } from "react-router-dom";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";

const PageBackgroundEdit = () => {
    const [index, setIndex] = useState<number>(0);
    const color = useAppSelector((state) => state.color.ColorHex);
    const opacity = useAppSelector((state) => state.color.opacity);
    const [checked, setChecked] = useState<boolean>(false);
    const [value, setValue] = useState<number>(100);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    //Сохраняет новое значение опасити в формате hex в состояние(для слайдера в палетке)
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        function convertOpacityToHexOpacity(opacity: number | number[]) {
            // Преобразование процентного значения в десятичное число от 0 до 255
            const decimalAlpha = Math.round(((opacity as number) / 100) * 255);
            // Преобразование десятичного числа в шестнадцатеричное значение
            const hexAlpha = decimalAlpha
                .toString(16)
                .toUpperCase()
                .padStart(2, "0");
            // Возврат HEX-кода с альфа-каналом
            return `${hexAlpha}`;
        }
        const hexOpacity = convertOpacityToHexOpacity(newValue);
        setValue(newValue as number); // Преобразуем newValue в number
        dispatch(addOpacity(hexOpacity));
    };
    //устанавливает цвет в состояние без опасити
    const setHex = (value: string) => {
        dispatch(setColor(value));
    };

    const {
        background,
        blur,
        color: procedurColor,
        count,
        speed,
    } = useAppSelector((state) => state.protcedur);

    const updateTemplateProced = () => {
        if (id) {
            patchTemplateById(id, {
                background_type: "PROCEDURE",
                procedure_background: {
                    background_color: background,
                    color: procedurColor,
                    count: count,
                    blur: blur,
                    speed: speed,
                },
            });
        }
    };
    const updateTemplate = () => {
        if (id) {
            patchTemplateById(id, {
                background_color: color+opacity,
                background_type: "COLOR",
            });
        }
    };
    const [img, setImg] = useState<any>(null);

    const updateTemplateImg = () => {
        const formData = new FormData();
        formData.append("file", img);
        if (id && img) {
            postTemplateImg(id, formData);
            patchTemplateById(id, {
                background_type: "IMAGE",
            });
        }
    };
    return (
        <div className=" overflow-auto h-full">
            <div className="container pt-10">
                {/* Фильтр */}
                <Filter
                    filterName={["Процедурный", "Файл", "Цвет", "ИИ"]}
                    setIndex={setIndex}
                />
            </div>
            {index === 0 && (
                // компонент эквалайзера
                <>
                    <Procedur>
                        <FormBlock h={100} w={100} />
                    </Procedur>
                    <Equalizer />
                </>
            )}
            {index === 2 && (
                <>
                    <div
                        style={{
                            background: index === 2 ? color + opacity : "",
                        }}
                        className="w-full h-[250px] flex justify-center items-center"
                    >
                        <FormBlock h={100} w={100} />
                    </div>
                    {/* Компонент паллетки */}
                    <PagePallete
                        color={color}
                        checked={checked}
                        setChecked={setChecked}
                        value={value}
                        handleSliderChange={handleSliderChange}
                        setHex={setHex}
                    />
                </>
            )}
            {index === 2 && (
                <SubmitButton
                    buttonActive={false}
                    title="Отправить"
                    handleClick={updateTemplate}
                />
            )}{" "}
            {index == 0 && (
                <SubmitButton
                    buttonActive={false}
                    title="Отправить"
                    handleClick={updateTemplateProced}
                />
            )}
            {index === 1 && (
                <>
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
                            onChange={(e) =>
                                e.target.files && setImg(e.target.files[0])
                            }
                        />
                    </label>
                    <SubmitButton
                        buttonActive={false}
                        title="Отправить"
                        handleClick={updateTemplateImg}
                    />
                </>
            )}
        </div>
    );
};

export default PageBackgroundEdit;
