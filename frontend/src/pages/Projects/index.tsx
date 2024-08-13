import { CheckedButton } from "../../shared/Buttons/CheckedButton";
import { Filter } from "../../shared/Filter";
import { Projects } from "./Projects";
import Loader from "@/src/shared/Loader";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { deleteProjectById } from "@/src/axios";
import { getUserWithProjectsByIdThunk, setActiveIndex } from "@/src/store/slice/UserSlice";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";

export interface IuserProjects {
    title: string;
    slogan: string;
    description: string;
    tags: string[];
    ID: string;
    templates: string[];
    owner: string;
}

const PageProjects = () => {
    const { userProjects,user,isLoading,activeIndex } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    async function handleDeleteProject() {
        await deleteProjectById(userProjects[activeIndex].ID)
        await dispatch(getUserWithProjectsByIdThunk({userId:user.telegramID}))
    }
    return (
        <>
            <div className="relative">
                <div className="container">
                    <h2 className="pt-10 text-xl font-bold text-center">
                        Мои проекты
                    </h2>

                    <Filter
                        setIndex={() => {}}
                        filterName={["все", "В работе", "Готовые", "Архив"]}
                    />
                </div>

                <div className="blanks mt-[2vh]">
                    {!isLoading && userProjects.length ? (
                        <Projects
                        projects={userProjects}
                        setActiveIndex={(e)=>dispatch(setActiveIndex(e))}
                        activeIndex={activeIndex}
                        handleDeleteProject={handleDeleteProject}
                    />
                    ) : isLoading ? (
                        
                        <div className="w-full h-[276px] flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className=" relative flex justify-center">
                                <p className="absolute">У вас нет проектов</p>
                            <div
                                className={`w-full h-[276px] transition-all duration-200 text-center flex items-center justify-center`}
                            >
                                
                                <Link
                                    to={"/blanks"}
                                    className="w-20 h-20 border border-black rounded-full flex items-center justify-center text-[48px] font-medium"
                                >
                                    +
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="container">
                    <div className="max-w-[300px] mx-auto flex justify-between items-center pt-12">
                        <span>Совместный доступ</span>
                        <CheckedButton checked={true} setChecked={() => {}} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageProjects;
