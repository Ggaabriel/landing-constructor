import { FC } from "react";
import { IBlanksItemProps } from "./BlanksItemInterface";

const BlanksItem: FC<IBlanksItemProps> = ({
    imgUrl,
    handleClick,
    isBlockSelected,
    isBlurBlanks,
    index,
}) => {
    return (
        <>
            <div
                className={`w-full h-[200px] bg-white [&:not(:first-child)]:mt-2 [&:last-child]:mb-20 transition-all relative`}
                onClick={handleClick}
            >
                <div
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                    className={`w-full h-full`}
                ></div>
                <div
                    style={{
                        transitionDelay: `${
                            Math.floor(index ? index : 0 % 3) * 100
                        }ms`,
                    }}
                    className={`w-full h-full absolute top-0 left-0 filter  ${
                        isBlockSelected || isBlurBlanks
                            ? ""
                            : "backdrop-blur-[4px]"
                    }`}
                ></div>
            </div>
        </>
    );
};

export default BlanksItem;
