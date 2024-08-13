import { FC } from "react";
import { IProfileAvatarProps } from "./ProfileAvatarInterface";

const ProfileAvatar: FC<IProfileAvatarProps> = ({
    imgUser,
    bgImg,
    userFIO,
    userStatus,
}) => {
    return (
        <div>
            <div className="flex flex-col items-center">
                <img
                    src={bgImg}
                    className="absolute -z-10 top-0 left-0 h-[180px] w-full object-cover"
                    alt=""
                />
                <img
                    src={imgUser}
                    className="w-32 aspect-square z-10 mt-10 rounded-full "
                    alt=""
                />
                <h2 className="pt-5 text-xl font-bold text-center tracking-[0.4px]">
                    {userFIO}
                </h2>
                <p className="text-sm opacity-60 font-semibold capitalize not-italic">
                    {userStatus}
                </p>
            </div>
        </div>
    );
};

export { ProfileAvatar };
