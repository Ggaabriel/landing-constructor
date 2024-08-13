import { FC } from "react";
import BlanksItem from "@/src/shared/BlanksItem";
import { Link } from "react-router-dom";
import { IData } from "./BlanksInterface";

const Blanks: FC<IData> = ({ data }) => {
    return (
        <div className="w-full h-full">
            {data.map((item:any, id:number) => (
                <Link to={`/card`}>
                    <BlanksItem  key={id} imgUrl={item.imgUrl} />
                </Link>
            ))}
        </div>
    );
};

export default Blanks;
