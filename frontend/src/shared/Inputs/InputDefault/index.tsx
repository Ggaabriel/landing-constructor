import { FC } from "react";
import { IInputDefaultProps } from "./InputDefaultInterface";

const InputDefault: FC<IInputDefaultProps> = ({
    name,
    type,
    maxLength,
    placeholder,
    handleChange,
    disabled,
    valueInp,
    handelFocus,
    handelBlur,
}) => {
    const change = (e: any) => {
        handleChange(e.target.value);
    };
    return (
        <div className="relative">
            <input
                disabled={disabled}
                name={name}
                type={type}
                maxLength={maxLength}
                className={`text-[16px] text-[#999] not-italic font-medium capitalize tracking-[-1.2px] bg-[#E7E7E7] rounded-2xl h-[50px] w-full indent-2.5`}
                placeholder={placeholder}
                value={"" || valueInp}
                onChange={change}
                onFocus={handelFocus}
                onBlur={handelBlur}
            />
        </div>
    );
};
export { InputDefault };
