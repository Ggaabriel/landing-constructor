import { useEffect, useRef } from "react";
import { useAppDispatch } from "./useAppDispatch";
import {
    setColor,
    setCount,
    setSpeed,
} from "../store/slice/ProcedurSlice";

interface Ball {
    x: number;
    y: number;
    vy: number; // Изменяем только vy для вертикального движения
    radius: number;
}

const useCanvas = (
    speedRnd: number,
    circleColor: string,
    count: number,
    size: number
) => {
    // Здесь канвас, который мы берем вне хука
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useAppDispatch();

    // Инициализация шариков
    const balls: Ball[] = [];

    // Функция для генерации случайного радиуса в заданном диапазоне
    const getRandomRadius = () => Math.random() * 40 + size;

    // Создание 10 шариков и пуш в balls
    for (let i = 0; i < count; i++) {
        const speed = 0.5; // Случайная скорость
        const radius = getRandomRadius(); // Генерируем случайный радиус

        const ball: Ball = {
            x: Math.random() * 500 - radius,
            y: Math.random() * 500 - radius,
            vy: speed, // Изменяем только vy для вертикального движения
            radius: radius, // Присваиваем радиус каждому шарику
        };
        balls.push(ball);
    }

    // Функция вызывающаяся от изменения speedRnd, circleColor
    useEffect(() => {
        // инициализация канваса
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // функция передвижения
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < balls.length; i++) {
                const ball = balls[i];

                // Обновляем позицию круга только по вертикали, учитывая скорость
                ball.y += ball.vy * 0.1;

                // Отталкиваемся от границ холста по вертикали
                if (
                    ball.y + ball.radius > canvas.height ||
                    ball.y - ball.radius < 0
                ) {
                    ball.vy *= -1; // Меняем направление по вертикали
                }

                // Ограничиваем движение круга, чтобы он не выходил за границы холста
                ball.y = Math.min(
                    Math.max(ball.y, ball.radius),
                    canvas.height - ball.radius
                );

                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgb(64,116,137)"; // Используем текущий цвет
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };

        draw();
        dispatch(setColor(circleColor));
        dispatch(setCount(count));
        dispatch(setSpeed(speedRnd));
    }, [speedRnd, circleColor,  count, size]); // Изменения скорости и цвета могут вызывать перерисовку

    return canvasRef;
};

export default useCanvas;
