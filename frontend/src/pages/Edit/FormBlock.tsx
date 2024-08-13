import { FC } from "react";

interface IForBlock {
    w: number;
    h: number;
}
const FormBlock: FC<IForBlock> = ({ w, h }) => {
    return (
        <div className="flex gap-2 justify-center">
            <div style={{width: `${w}px`, height: `${h}px`}} className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white`}></div>
            <div style={{width: `${w}px`, height: `${h}px`}} className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white`}></div>
        </div>
    );
};

export default FormBlock;
