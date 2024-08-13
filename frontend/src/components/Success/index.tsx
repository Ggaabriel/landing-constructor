import { FC } from "react";

interface ISuccessProps {
    title: string;
    visible: boolean;
}
const Success: FC<ISuccessProps> = ({ title, visible = true }) => {
    return (
        <div
            className={`fixed top-0 left-1/2 -translate-x-1/2  px-[50px] h-[80px] bg-black rounded-[20px] bg-gradient-to-r from-black to-[#545454] text-white flex items-center justify-center whitespace-nowrap ${
                visible
                    ? "translate-y-5 opacity-100"
                    : "-translate-y-20 opacity-0"
            } z-50 duration-200`}
        >
            {title}
        </div>
    );
};

export default Success;
