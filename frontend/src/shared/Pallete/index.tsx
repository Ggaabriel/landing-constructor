import { VSlider } from "@/src/shared/VSlider/index.tsx";
import { CheckedButton } from "../Buttons/CheckedButton/index.tsx";

import { CanvasColor } from "../CanvasColor/index.tsx";

type Props = {
    color: string;
    checked: boolean;
    setChecked: (e: boolean) => void;
    value: number;
    handleSliderChange: (_: Event, newValue: number | number[]) => void;
    setHex: (e: string) => void;
};

function PagePallete({
    color,
    checked,
    setChecked,
    value,
    handleSliderChange,
    setHex,
}: Props) {
    return (
        <div className="container grid grid-cols-3 items-center pb-20  justify-items-center">
            <div className="flex w-full justify-center gap-5 place-items-center col-start-1 col-end-4">
                <h3>Включить градиент</h3>
                <CheckedButton
                    checked={checked}
                    setChecked={() => setChecked(!checked)}
                />
            </div>
            <div className="flex items-center justify-center -ml-[100px] relative col-start-2 col-end-2 ">
                <CanvasColor setHex={setHex} />

                <div className="Pallete-thumb "></div>
                <div
                    style={{
                        width: 66,
                        height: 66,
                        opacity: 0.2,
                        background: color,
                        position: "absolute",
                        borderRadius: "50%",
                    }}
                ></div>
            </div>
            <div className="h-[140px]">
                <VSlider
                    value={value}
                    handleSliderChange={handleSliderChange}
                />
            </div>
        </div>
    );
}

export { PagePallete };
