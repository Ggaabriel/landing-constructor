import { Category } from "@/src/shared/Category";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ICategoriesProps {
    tempalteId: string
}
const Categories:FC<ICategoriesProps> = ({tempalteId}) => {
    return (
        <div className="tags relative pt-10 flex flex-wrap gap-[9px] justify-center">
            <Category handleMass={() => {}} title="Кнопка действия"  mass={[]}/>
            <Link to={`/list/edit/background/${tempalteId}`}>
                <Category handleMass={() => {}} title="Фон"  mass={[]}/>
            </Link>
            <Category handleMass={() => {}} title="Соц. сети" mass={[]} />
            <Category handleMass={() => {}} title="Управление"  mass={[]}/>
            <Category handleMass={() => {}} title="Оформление" mass={[]} />
            <Link to={`/list/edit/text/${tempalteId}`}>
                <Category handleMass={() => {}} title="Текст" mass={[]} />
            </Link>
        </div>
    );
};

export { Categories };
