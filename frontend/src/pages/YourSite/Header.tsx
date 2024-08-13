import { axiosInstance } from "@/src/axios";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import {
    getTemplatesWithModulesByIdThunk,
} from "@/src/store/slice/EditSlice";
import { useEffect, useState } from "react";

const Header = () => {
    const id = localStorage.getItem("projectId");
    const [logo, setLogo] = useState("");
    const getLogo = async () => {
        if (id) {
            axiosInstance
                .get(`/project/${id}/logo`)
                .then((data) => setLogo(data.data));
        }
    };
    const template = useAppSelector((state) => state.edit.templates);
     useEffect(() => {
        getTemplatesWithModulesByIdThunk({ templateId: id as string });
        getLogo();
    }, []);
    return (
        <div className="fixed left-0 right-0 w-[12%] bg-slate-200 bg-opacity-50 h-screen z-50 flex flex-col items-center justify-center -translate-x-[95.9%] hover:-translate-x-0 duration-200">
            <div
                className="w-10 h-10"
                dangerouslySetInnerHTML={{
                    __html: logo,
                }}
            ></div>
            <ul className="flex flex-col gap-3">
                {template.map((item) => (
                    <li>
                        <a href={`#${item.ID}`} className="text-[24px] font-bold text-white">{item.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Header;
