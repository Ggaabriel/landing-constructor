import AlignLeft from "@/src/assets/icons/alignLeft.svg";
import AlignCenter from "@/src/assets/icons/alignCenter.svg";
import AlignRight from "@/src/assets/icons/alignRight.svg";
import { FC } from "react";

interface IAlignmentProps {
    setAlign: (align: string) => void;
    align: string;
}

const Alignment: FC<IAlignmentProps> = ({ setAlign, align }) => {
    return (
        <div className="w-[307px] h-[30px] bg-slate-100 mx-auto rounded-[10px] shadow-lg relative overflow-hidden">
            <ul className="flex w-full h-full justify-between items-center ">
                <li
                    className="w-[105px] h-full flex items-center justify-center"
                    onClick={() => {
                        setAlign("left");
                    }}
                >
                    <img src={AlignLeft} alt="" />
                </li>
                <li
                    className="w-[105px] h-full flex items-center justify-center"
                    onClick={() => {
                        setAlign("center");
                    }}
                >
                    <img src={AlignCenter} alt="" />
                </li>
                <li
                    className="w-[105px] h-full flex items-center justify-center"
                    onClick={() => {
                        setAlign("right");
                    }}
                >
                    <img src={AlignRight} alt="" />
                </li>
            </ul>
            <div
                className="w-[105px] opacity-50 h-full bg-black absolute top-0 duration-200 "
                style={{
                    left:
                        align === "left"
                            ? "0%"
                            : align === "center"
                            ? "50%"
                            : align === "right"
                            ? "100%"
                            : "",
                    transform:
                        align === "left"
                            ? "translateX(0%)"
                            : align === "center"
                            ? "translateX(-50%)"
                            : align === "right"
                            ? "translateX(-100%)"
                            : "",
                }}
            ></div>
        </div>
    );
};

export default Alignment;
