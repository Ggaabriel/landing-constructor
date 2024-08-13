
export interface IInputDefaultProps {
    name: string;
    type: string;
    maxLength?: number;
    placeholder?: string;
    handleChange?: (event: any) => void;
    checked?: boolean;
    disabled?: boolean;
    valueInp?: string;
    reduxVal:any;
    reduxOnChange:any;
};