import { FC, useState } from "react";
import { CheckedButton } from "../../Buttons/CheckedButton";
import { IInputDefaultProps } from "./InputDefaultInterface";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";

const InputChecked: FC<IInputDefaultProps> = ({
    name,
    type,
    checked = false,
    maxLength,
    placeholder,
    disabled,
    reduxVal,
    reduxOnChange,
}) => {
    const [status, setStatus] = useState(false);
    const dispatch = useAppDispatch();

    const change = (e: any) => {
        if (e.target.value.length >= 1) {
            setStatus(true);
        } else {
            setStatus(false);
        }

        dispatch(reduxOnChange(e.target.value));
    };

    return (
        <div className="relative ">
            <input
                disabled={disabled}
                name={name}
                type={type}
                maxLength={maxLength}
                className={`blankInput text-[16px] text-[#999] not-italic font-medium font-montserrat capitalize tracking-[-0.96px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5`}
                placeholder={placeholder}
                value={reduxVal}
                onChange={change}
            />
            {checked && (
                <div className="absolute top-1/2 -translate-y-1/2 right-0">
                    <CheckedButton
                        checked={status}
                        setChecked={() => setStatus(!status)}
                    />
                </div>
            )}
        </div>
    );
};
export { InputChecked };
