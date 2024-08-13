import { FC, useEffect, useState } from "react";
import { ITwoBlockProps } from "./TwoBlockInterface";
import useCanvas from "@/src/hooks/useCanvas";
import { getModuleById } from "@/src/axios";

enum TextAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}

const TwoBlock: FC<ITwoBlockProps> = ({
    backgroundColor,
    backgroundProcedur,
    name,
    textAlign,
    color,
    backgroundIs,
    speed,
    circleColor,
    modulesId,
    count,
    size,
    backgroundImage,
}) => {
    const [modules, setModules] = useState([]);

    const getModeles = async () => {
        const data: any = Promise.all<any[]>(
            modulesId.map(async (id) => {
                const data = getModuleById(id);
                return await data;
            })
        );

        setModules(await data);
    };
    useEffect(() => {
        getModeles();
    }, []);
    const canvasRef = useCanvas(speed, circleColor, count, size);
    const lengthIsSix = modules.length === 6;
    return (
        <>
            <div
                id={name}
                className="w-full relative bg-no-repeat bg-cover flex justify-center"
                style={{
                    background: backgroundIs === "COLOR" ? backgroundColor : "",
                    backgroundImage:
                        backgroundIs === "IMAGE"
                            ? `url(${backgroundImage})`
                            : "",
                }}
            >
                {backgroundIs === "PROCEDURE" && (
                    <>
                        <div className="w-full h-full absolute -z-10 filteredBackground"></div>
                        <canvas
                            ref={canvasRef}
                            className="w-full absolute -z-20 h-full"
                            style={{ background: backgroundProcedur }}
                        ></canvas>
                    </>
                )}
                <div
                    style={{
                        textAlign: textAlign as TextAlign,
                        color: color,
                    }}
                    className="pt-[160px]  pb-[160px]"
                >
                    <h2
                        className="font-[500] text-[58px] text-black mb-[58px]"
                        style={{ color: color }}
                    >
                        {name}
                    </h2>
                    <div className={`${lengthIsSix ? "grid md:grid-cols-3 max-md:grid-cols-1 place-items-center" : "flex flex-wrap"} w-fit justify-center gap-[58px]`}>
                        {modules.length &&
                            modules.map((item: any, i: number) => {
                                console.log(item.background_type);

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            background: item.background_color,
                                            color: item.text_color,
                                            textAlign:
                                                item.text_align as TextAlign,
                                            backgroundImage:
                                                item.background_type === "IMAGE"
                                                    ? `url("${import.meta.env.VITE_BASE_URL}/module/${item.ID}/image")`
                                                    : "",
                                        }}
                                        className={` ${lengthIsSix ? i % 2 === 0 ? "w-[442px]": "w-[336px]" : "w-[589px]"} ${lengthIsSix ? i % 2 === 0 ? "h-[336px]": "h-[442px]" : "h-[620px]"} p-20 duration-200 hover:shadow-my hover:-translate-y-2`}
                                    >
                                        <h2 className="text-[58px] leading-[1] font-[700] w-full">
                                            {item.header_text}
                                        </h2>
                                        <p className="opacity-80 font-[500] pt-5">
                                            {item.subheader_text}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoBlock;
