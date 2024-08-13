import { useAppSelector } from "@/src/hooks/useAppSelector";
import { InputChecked } from "../../shared/Inputs/InputChecked";
import {  setDescription, setSlogan, setTitle, setCel } from "@/src/store/slice/BlanksItemSlice";

const BlanksItemForm = () => {
    const blanksItem = useAppSelector((state) => state.blanksItem);

    return (
        <form className="pt-[12px] flex flex-col gap-[12px]">
            <InputChecked
                name=""
                type="text"
                checked={false}
                placeholder="Название проекта (Назови свой проект)"
                reduxVal={blanksItem.title}
                reduxOnChange={setTitle}
            />
            <InputChecked
                name=""
                type="text"
                checked={true}
                placeholder="Введи слоган"
                reduxVal={blanksItem.slogan}
                reduxOnChange={setSlogan}
            />
            <InputChecked
                name=""
                type="text"
                checked={true}
                placeholder="Добавить описание"
                reduxVal={blanksItem.description}
                reduxOnChange={setDescription}
            />
            <InputChecked
                name=""
                type="text"
                checked={true}
                placeholder="Цель, преимущества"
                reduxVal = {blanksItem.cel}
                reduxOnChange = {setCel}
            />
        </form>
    );
};

export default BlanksItemForm;
