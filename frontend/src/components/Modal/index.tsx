import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import close from "../../assets/icons/close.svg";
import backArr from "../../assets/icons/backArr.svg";
import { IModalProps } from "./ModalInterface";

const Modal: FC<IModalProps> = ({ children }) => {
    let y: number | null = null;
    let x: number | null = null;
    const swipeThreshold = 5;

    const handleTouchStart = (e: any) => {
        const firstTouch = e.touches[0];
        y = firstTouch.clientY;
        x = firstTouch.clientY;
    };

    const handleTouchMove = (e: any) => {
        if (!y || !x) {
            return false;
        }

        const y2 = e.touches[0].clientY;
        const x2 = e.touches[0].clientY;
        const yDiff = y2 - y;
        const xDiff = x2 - x;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                closeModal();
            } else {

            }
        } else {
            if (yDiff > 0 && y < swipeThreshold) {
                if (yDiff > swipeThreshold) {
                    // Пользователь свайпнул вверх в верхней части экрана
                    closeModal();

                }
            } else {

            }
        }


        x = null;
        y = null;
    };

    const divRef = useRef(null);
    let navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const closeModal = (): void => {
        const object = divRef.current;

        gsap.to(object, {
            duration: 1,
            y: "100%", // Конечная позиция за пределами экрана вверху
            ease: "power3.out", // Вид анимации
        });
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };
    // Функция для проверки количества слэшей в строке
    const [invested, setInvested] = useState(false);
    const countSlashes = (str: string) => {
        return str.split("/").length - 1;
    };
    useEffect(() => {
        const object = divRef.current;
        gsap.from(object, {
            duration: 1,
            y: "100%", // Начальная позиция за пределами экрана внизу
            ease: "power3.out", // Вид анимации
        });
    }, []);

    useEffect(() => {
        if (countSlashes(pathname) >= 2) {
            setInvested(true);
        } else {
            setInvested(false);
        }
    }, [location]);

    return (
        //модальное окно
        <div
            ref={divRef}
            className={`fixed top-0 left-0 w-full h-full bg-white`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {invested ? (
                <button
                    className="w-12 h-12 flex justify-center items-center absolute z-20"
                    onClick={() => history.back()}
                >
                    <img src={backArr} alt="go back button" />
                </button>
            ) : (
                <button
                    className="w-12 h-12 flex justify-center items-center absolute z-20"
                    onClick={() => closeModal()}
                >
                    <img src={close} alt="close button" />
                </button>
            )}

            {children}
        </div>
    );
};

export { Modal };
