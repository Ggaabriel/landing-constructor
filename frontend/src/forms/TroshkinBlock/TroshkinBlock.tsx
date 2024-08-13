import { FC } from "react";

interface ITroshkinBlockProps {
    background: string;
    textAlign?: string;
    title: string;
    textColor: string;
    backgroundBlock: string;
    id: number;
}
enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}
const TroshkinBlock: FC<ITroshkinBlockProps> = ({
    background,
    backgroundBlock,
    textAlign,
    title,
    textColor,
    id,
}) => {
    return (
        <div
            className="w-full pt-[160px] pb-[320px]"
            style={{
                background: background,
                textAlign: textAlign as TextAlign,
            }}
            key={id}
        >
            <h2 className="font-[500] text-[58px] text-black mb-[58px]">
                {title}
            </h2>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex items-center gap-[58px]">
                    <div
                        className="w-[442px] h-[336px] p-8 hover:shadow-my hover:-translate-y-2 transition-all duration-200"
                        style={{
                            background: backgroundBlock,
                            color: textColor,
                            textAlign: textAlign as TextAlign,
                        }}
                    >
                        <span className="text-black font-[700] text-[58px]">
                            Hello
                        </span>
                        <p className={"text-black opacity-50 text-[24px]"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cumque, corrupti!
                        </p>
                    </div>
                    <div
                        className="h-[442px] w-[336px] p-8 hover:shadow-my hover:-translate-y-2 transition-all duration-200"
                        style={{
                            background: backgroundBlock,
                            color: textColor,
                            textAlign: textAlign as TextAlign,
                        }}
                    >
                        <span className="text-black font-[700] text-[58px]">
                            Hello
                        </span>
                        <p className={"text-black opacity-50 text-[24px]"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cumque, corrupti!
                        </p>
                    </div>
                    <div
                        className="w-[442px] h-[336px] p-8 hover:shadow-my hover:-translate-y-2 transition-all duration-200"
                        style={{
                            background: backgroundBlock,
                            color: textColor,
                            textAlign: textAlign as TextAlign,
                        }}
                    >
                        <span className="text-black font-[700] text-[58px]">
                            Hello
                        </span>
                        <p className={"text-black opacity-50 text-[24px]"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cumque, corrupti!
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-[58px] mt-[58px]">
                    <div
                        className="h-[442px] w-[336px] bg-slater:shadow-my hover:-translate-y-2 transition-all duration-200"
                        style={{
                            background: backgroundBlock,
                            color: textColor,
                            textAlign: textAlign as TextAlign,
                        }}
                    >
                        <span className="text-black font-[700] text-[58px]">
                            Hello
                        </span>
                        <p className={"text-black opacity-50 text-[24px]"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cumque, corrupti!
                        </p>
                    </div>
                    <div
                        className="w-[442px] h-[336px] bg-slater:shadow-my hover:-translate-y-2 transition-all duration-200"
                        style={{
                            background: backgroundBlock,
                            color: textColor,
                            textAlign: textAlign as TextAlign,
                        }}
                    >
                        <span className="text-black font-[700] text-[58px]">
                            Hello
                        </span>
                        <p className={"text-black opacity-50 text-[24px]"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cumque, corrupti!
                        </p>
                    </div>
                    <div
                        className="h-[442px] w-[336px] bg-slater:shadow-my hover:-translate-y-2 transition-all duration-200"
                        style={{
                            background: backgroundBlock,
                            color: textColor,
                            textAlign: textAlign as TextAlign,
                        }}
                    >
                        <span className="text-black font-[700] text-[58px]">
                            Hello
                        </span>
                        <p className={"text-black opacity-50 text-[24px]"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Cumque, corrupti!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TroshkinBlock;
