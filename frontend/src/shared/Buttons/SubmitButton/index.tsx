import { FC } from "react";
import { ISubmitButtonProps } from "./SubmitButtonInterface";

const SubmitButton: FC<ISubmitButtonProps> = ({
    title,
    buttonActive,
    handleClick,
}) => {
    return (
        <button
            disabled={buttonActive}
            className={`  transition absolute left-1/2 -translate-x-1/2 bottom-2 tall:bottom-[7%] text-white mx-auto w-[90%] py-[15px] rounded-[15px] bg-gradient-to-r whitespace-nowrap  disabled:opacity-50 active:opacity-70 from-black to-[#545454]`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

export { SubmitButton };
