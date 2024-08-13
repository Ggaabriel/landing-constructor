import { FC } from "react";
import { ILinkButtonProps } from "./LinkButtonInterface";
import { Link } from "react-router-dom";

const LinkButton: FC<ILinkButtonProps> = ({
    title,
    buttonActive,
    handleClick,
    link,
}) => {
    return (
        <Link to={link}>
            <button
                disabled={buttonActive}
                className={`transition absolute left-1/2 -translate-x-1/2 bottom-2 tall:bottom-[7%] text-white mx-auto w-[90%] py-[15px] rounded-[15px] bg-gradient-to-r whitespace-nowrap  disabled:opacity-50 from-black to-[#545454]`}
                onClick={handleClick}
            >
                {title}
            </button>
        </Link>
    );
};

export { LinkButton };
