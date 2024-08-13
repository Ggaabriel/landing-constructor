import { LinkButton } from "../../../shared/Buttons/LinkButton";
import { Category } from "../../../shared/Category";
import { Filter } from "../../../shared/Filter";
import BlanksItem from "@/src/shared/BlanksItem";
import maskProject from "/maskProject.png";
import { Link } from "react-router-dom";

const PageGallery = () => {
    return (
        <>
            <div className="container">
                <h2 className="pt-4 text-xl font-bold text-center">
                    Вдохновляйся
                </h2>

                <Filter
                    setIndex={() => {}}
                    filterName={["Популярные", "обычные", "с дайджестом"]}
                />

                <p className="descr font-semibold text-black/60 spacing leading-[143.4%] text-center text-[14px] pt-4">
                    Здесь собраны все сайты созданные всеми пользователями.
                </p>
            </div>

            <div className="h-[calc(100vh-150px)] blanks mt-4 overflow-scroll">
                {[...new Array(8)].map((_, i) => {
                    return (
                        <BlanksItem
                            key={i}
                            imgUrl={maskProject}
                            index={i}
                            isBlurBlanks={true}
                        />
                    );
                })}
            </div>

            <div className="sticky bottom-[80px] flex flex-wrap justify-center gap-[9px]">
                <Category handleMass={()=> {}} title="Текст"  mass={[]}/>
                <Category handleMass={()=> {}} title="Фон"  mass={[]}/>
                <Category handleMass={()=> {}} title="Соц. сети"  mass={[]}/>
                <Category handleMass={()=> {}} title="Управление"  mass={[]}/>
                <Category handleMass={()=> {}} title="Оформление" mass={[]} />
            </div>

            <Link to={"1"}>
                <LinkButton link={""} title={"далее"} buttonActive={true} />
            </Link>
        </>
    );
};

export default PageGallery;
