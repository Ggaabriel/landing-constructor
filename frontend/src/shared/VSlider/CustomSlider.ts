import { Slider } from "@mui/material";
import styled from "@emotion/styled";

const CustomSlider = styled(Slider)(() => ({
    // Ваши стили здесь
    color: "red", // Пример: изменение цвета ползунка и трека
    "& .MuiSlider-thumb": {
        boxSizing: "border-box",
        width: 15,
        height: 15,
        backgroundImage: "linear-gradient(to bottom right, #FFF2F2, #7F8484)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ":after": {
            content: '""',
            position: "absolute",
            width: 11,
            height: 11,
            borderRadius: 9999,
            backgroundImage:
                "linear-gradient(to bottom right, #575959, #F8F8F8)",
        },
    },
    "& .MuiSlider-track": {
        background:
            "linear-gradient(115deg, #6651E9 0%, rgba(198, 28, 143, 0.76) 48.75%, rgba(232, 163, 83, 0.84) 99.99%, rgba(233, 168, 81, 0.00) 100%)",
        boxShadow: "1px 3px 1px 0px rgba(0, 0, 0, 0.25) inset",
        width: 6,
    },
    "& .MuiSlider-rail": {
        background: "#362F3D",
        opacity: 1,
    },
}));

export { CustomSlider };
