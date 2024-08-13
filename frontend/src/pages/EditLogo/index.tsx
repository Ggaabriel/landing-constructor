import { postProjectLogo } from "@/src/axios";
import { Filter } from "@/src/shared/Filter";
import { useState } from "react";

const EditLogo = () => {
    const [logo, setLogo] = useState<any>(null);
    console.log(logo);

    const formData = new FormData();
    formData.append("file", logo);

    const id = localStorage.getItem("projectId");

    const postImg = async (e: any) => {
        setLogo(await e.target.files[0]);
    };
    if (id && logo) {
        postProjectLogo(id, formData);
    }
    return (
        <div className="container pt-10">
            <Filter
                filterName={["Логотип", "Панели", "Эффекты"]}
                setIndex={() => {}}
            />
            <div className="content pt-[52px] h-[150px]">
                <span className="opacity-60 text-[14px] font-[600] block text-center">
                    Прикрепи файл логотипа.
                    <br /> Формат SVG
                </span>
            </div>
            <label className="flex items-center px-4 py-2 bg-black text-white rounded">
                <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                </svg>
                Выберите файл
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) => postImg(e)}
                />
            </label>
        </div>
    );
};

export default EditLogo;
