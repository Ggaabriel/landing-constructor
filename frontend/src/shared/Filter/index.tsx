import { FC, useState, useRef, useEffect } from "react";
import { IFilterProps } from "./FilterInterface";

const Filter: FC<IFilterProps> = ({ filterName, setIndex }) => {
    const [activeName, setActiveName] = useState(filterName[0]);
    const [animate, setAnimate] = useState(false); // Добавлено новое состояние animate
    const activeRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (activeRef.current) {
            const { offsetLeft, offsetWidth } = activeRef.current;
            setActiveBorder(offsetLeft, offsetWidth);
        }
    }, [animate]); // Запускаем эффект при изменении состояния animate

    const [borderLeft, setBorderLeft] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);

    const setActiveBorder = (left: number, width: number) => {
        setBorderLeft(left);
        setBorderWidth(width);
    };
    const onHandleClick = (name:string, id:number) => {
        setActiveName(name);
        setAnimate(true); // Включаем анимацию при каждом клике
        setTimeout(() => setAnimate(false), 150); // Отключаем анимацию через 300 мс
        setIndex(id)
        
    }
    return (
        <div className="mb-4">
            <ul className="relative flex gap-4 pt-4 font-semibold capitalize">
                {filterName.map((name, id) => (
                    <li
                        ref={name === activeName ? activeRef : null}
                        className={`${
                            activeName === name &&
                            "font-semibold text-black pb-[11px]"
                        }
                        cursor-pointer text-[#8E8B8B] text-[15px] max-xsm:text-[12px] relative`}
                        onClick={() => {
                            onHandleClick(name, id);
                        }}
                        key={id}
                    >
                        {name}
                    </li>
                ))}
                {/* Блок для бордера, анимируется */}
                <div
                    className="absolute bottom-0 border-b-2 border-b-black font-semibold text-black"
                    style={{
                        left: borderLeft,
                        width: borderWidth,
                        transition: animate
                            ? "left 0.15s, width 0.15s"
                            : "none", // Применяем анимацию только если animate равно true
                    }}
                />
            </ul>
        </div>
    );
};

export { Filter };
