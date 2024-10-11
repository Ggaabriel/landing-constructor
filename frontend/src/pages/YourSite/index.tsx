import TwoBlock from "@/src/forms/Twoblock/TwoBlock";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { getProjectWithTemplatesByIdThunk } from "@/src/store/slice/EditSlice";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";

const YourSite = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getProjectWithTemplatesByIdThunk({ projectId: id as string }));
    }, []);

    const templates = useAppSelector((state) => state.edit.templates);
    console.log(templates);
    const path = useLocation()
    const copy = () => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_UR}/${path.pathname}`)
    }

    return (
        <>
            <button onClick={copy} className="p-2 bg-black text-white absolute bottom-0 right-0 z-10">Скопировать ссылку</button>
            <Header />
            <div className="h-screen overflow-y-scroll scroll-smooth">
                {templates.length &&
                    templates.map((item: any, i) => (
                        <>
                            <TwoBlock
                                speed={item.procedure_background.speed}
                                circleColor={item.procedure_background.color}
                                blur={item.procedure_background.blur}
                                count={item.procedure_background.count}
                                size={40}
                                backgroundIs={item.background_type}
                                backgroundColor={item.background_color}
                                backgroundProcedur={
                                    item.procedure_background.background_color
                                }
                                modulesId={item.modules}
                                id={item.ID}
                                name={item.name}
                                textAlign={item.text_align}
                                key={i}
                                color={item.text_color}
                                backgroundImage={`${import.meta.env.VITE_BASE_UR}/template/${item.ID}/image`}
                            />

                            {/* {e.modules.length === 5 && (
                                <TroshkinBlock
                                    background={template.background}
                                    backgroundBlock={
                                        template.modules[0].background
                                    }
                                    id={i}
                                    textAlign={template.textAlign}
                                    textColor={template.modules[0].textColor}
                                    title={template.name}
                                    key={i}
                                />
                            )} */}
                            
                        </>
                    ))}
            </div>
        </>
    );
};

export default YourSite;
