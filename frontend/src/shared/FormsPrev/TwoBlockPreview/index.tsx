import { FC } from "react";
import { ITwoBlockPreviewProps } from "./TwoBlockPreviewInterface";


const TwoBlockPreview: FC<ITwoBlockPreviewProps> = ({ w, h }) => {
    return (
        <div className="flex gap-2 justify-center  select-none">
            <div
                style={{ width: `${w}`, height: `${h}` }}
                className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white`}
            ></div>
            <div
                style={{ width: `${w}`, height: `${h}` }}
                className={`shadow-md bg-gradient-to-b shadow-[rgba(0,0,0,0.25)] from-[#9E9E9E] to-white`}
            ></div>
        </div>
    );
};

export default TwoBlockPreview;
