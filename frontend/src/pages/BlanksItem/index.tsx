import { LinkButton } from "../../shared/Buttons/LinkButton";
import { Category } from "../../shared/Category";
import BlanksItem from "@/src/shared/BlanksItem";
import maskProject from "/maskProject.png";
import BlanksItemForm from "./BlanksItemForm";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { setCel, setDescription, setSlogan, setTags, setTitle } from "@/src/store/slice/BlanksItemSlice";
import { postProjectByUserId } from "@/src/axios";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { getUserWithProjectsByIdThunk } from "@/src/store/slice/UserSlice";

const PageBlanksItem = () => {
    const { telegramID } = useAppSelector((state) => state.user.user);
    const blanksItem = useAppSelector((state) => state.blanksItem);
    const dispatch = useAppDispatch();
    const [mass, setMass] = useState<any>([]);
    const handleMass = (elem: string) => {
        if (mass.includes(elem)) {
            setMass((prev: string[]) => {
                const updatedMass = prev.filter((item) => item !== elem);
                return updatedMass; // Возвращаем обновленное состояние
            });
        } else if (mass.length < 3) {
            setMass((prev: string[]) => {
                const updatedMass = [...prev, elem];
                return updatedMass; // Возвращаем обновленное состояние
            });
        }
    };

    useEffect(() => {
        // Вызываем dispatch только после завершения рендеринга
        dispatch(setTags(mass));
    }, [mass]);
    useEffect(() => {
        return ()=>{
            dispatch(setTitle(""))
            dispatch(setSlogan(""))
            dispatch(setDescription(""))
            dispatch(setTags([]))
            dispatch(setCel(""))
        }
    }, []);
    async function handleSubmit() {
        await postProjectByUserId(telegramID, {
            title: blanksItem.title,
            slogan: blanksItem.slogan,
            description:blanksItem.description ,
            tags: blanksItem.tags,
            goal: blanksItem.cel,
          })
        
        dispatch(getUserWithProjectsByIdThunk({userId:telegramID}));
        dispatch(setTitle(""))
        dispatch(setSlogan(""))
        dispatch(setDescription(""))
        dispatch(setTags([]))
        dispatch(setCel(""))
    }

    return (
        <>
            <div className="h-full relative font-montserrat overflow-auto pb-20 pt-12">
                <BlanksItem
                    imgUrl={maskProject}
                    isBlockSelected={true}
                    isBlurBlanks={true}
                />
                <div className="container ">
                    <div className="h-full overflow-auto">
                        <span className=" block text-[#585858] mt-[14px] text-lg font-medium capitalize">
                            Твой проект
                        </span>
                        <BlanksItemForm />
                        <span className="block pt-[38px] text-[#585858] text-[18px] font-[500] text-center">
                            Выбери до 3х сфер деятельности:
                        </span>
                        <div className="pt-[19px] flex flex-wrap gap-[6px] justify-center">
                            <Category
                                mass={mass}
                                title="Бизнес"
                                handleMass={handleMass}
                            />
                            <Category
                                mass={mass}
                                title="Производство"
                                handleMass={handleMass}
                            />
                            <Category
                                mass={mass}
                                title="Доставка"
                                handleMass={handleMass}
                            />
                            <Category
                                mass={mass}
                                title="Еда"
                                handleMass={handleMass}
                            />
                            <Category
                                mass={mass}
                                title="IT"
                                handleMass={handleMass}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <LinkButton
                link={"/list"}
                title="Создать"
                buttonActive={false}
                handleClick={handleSubmit}
            />
        </>
    );
};

export default PageBlanksItem;
