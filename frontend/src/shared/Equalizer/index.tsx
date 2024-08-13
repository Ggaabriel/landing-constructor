import { FC } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { setBlur, setCount, setSize, setSpeed } from "@/src/store/slice/ProcedurSlice";
import { useAppSelector } from "@/src/hooks/useAppSelector";

const Equalizer: FC = () => {
    const dispatch = useAppDispatch();
    const { blur, count, size, speed } = useAppSelector(
        (state) => state.protcedur
    );
    return (
        <div className="w-full pt-[54px] pb-[37px] bg-[#292230]">
            <div className="container flex flex-col w-full h-[140px] justify-between">
                <input
                    type="range"
                    value={speed}
                    step={1}
                    max={2}
                    min={1}
                    onChange={(e) => dispatch(setSpeed(+e.target.value))}
                />
                <input
                    type="range"
                    value={count}
                    step={1}
                    max={10}
                    min={3}
                    onChange={(e) => dispatch(setCount(+e.target.value))}
                />
                <input
                    type="range"
                    value={size}
                    step={1}
                    max={30}
                    min={1}
                    onChange={(e) =>
                        dispatch(setSize(+e.target.value))
                    }
                />
                <input
                    type="range"
                    value={blur}
                    step={1}
                    max={50}
                    min={10}
                    onChange={(e) => dispatch(setBlur(+e.target.value))}
                />
                {/* <input
                    type="range"
                    value={state.vectorX}
                    step={0.2}
                    max={5}
                    min={1}
                    onChange={(e) =>
                        handleChange({ ...state, vectorX: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={state.vectorY}
                    step={0.2}
                    max={5}
                    min={1}
                    onChange={(e) =>
                        handleChange({ ...state, vectorY: +e.target.value })
                    }
                /> */}
            </div>
        </div>
    );
};

export default Equalizer;
