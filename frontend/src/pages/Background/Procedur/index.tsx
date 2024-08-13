import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import useCanvas from "@/src/hooks/useCanvas";
import useRandomColor from "@/src/hooks/useRandomColor";
import { setBackground, setColor } from "@/src/store/slice/ProcedurSlice";
import { FC, ReactNode } from "react";
import './style.css'

interface IProcedurProps {
    children: ReactNode;
}
const Procedur: FC<IProcedurProps> = ({ children }) => {
    // Создаем рандомнй цвет для бэкграунда и самих кругов
    const dispatch = useAppDispatch();
    const { speed, background, color, count, size } = useAppSelector(
        (state) => state.protcedur
    );
    // хук делающий канвас
    const canvasRef = useCanvas(speed, color, count, size);

    // функция по нажатию на ревреш, что бы передать другие рандомные цвета
    const handleColorChange = () => {
        dispatch(setColor(useRandomColor()));
        dispatch(setBackground(useRandomColor()));
    };

    return (
        <div className="relative w-full h-[250px] flex justify-center items-center">
            {/* Сам канвас */}

            <div className={`absolute w-full h-full filteredBackground`}></div>
            <canvas
                ref={canvasRef}
                className="w-full absolute -z-10 h-full"
                style={{ background: background }}
            ></canvas>

            {/* Блоки находящиеся внутри канваса */}
            <div className="container relative z-10">{children}</div>

            <div className="w-full left-0 mt-[30px] flex justify-center absolute bottom-0 cursor-pointer">
                {/* Кнопка рефреш */}
                <span onClick={() => handleColorChange()}>Refresh</span>
            </div>
        </div>
    );
};

export default Procedur;
