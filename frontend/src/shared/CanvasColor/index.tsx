import { useEffect, useRef } from "react";
import pallete from "@/src/assets/ellipse.png";

type Props = {
    setHex:(e:string)=> void
}

const CanvasColor = ({setHex}:Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isMouseDownRef = useRef(false);
    function rgbToHex(r: number, g: number, b: number) {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    }

    function componentToHex(c: number) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        const img = new Image();
        img.src = pallete;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        };

        function handleMove(event: Touch | MouseEvent) {
            if (!isMouseDownRef.current) return;
            if (!canvas) return;
            if (!context) return;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const pixelData = context.getImageData(x, y, 1, 1).data;
            const isNotEmptyPixel =
                pixelData[0] !== 0 || pixelData[1] !== 0 || pixelData[2] !== 0;

            if (isNotEmptyPixel) {
                const hexColor = rgbToHex(
                    pixelData[0],
                    pixelData[1],
                    pixelData[2]
                );
                setHex(hexColor);
            }
        }

        function handleTouchStart(event: TouchEvent) {
            isMouseDownRef.current = true;
            handleMove(event.touches[0]);
        }

        function handleTouchMove(event: TouchEvent) {
            if (isMouseDownRef.current) {
                event.preventDefault();
                handleMove(event.touches[0]);
            }
        }

        function handleTouchEnd() {
            isMouseDownRef.current = false;
        }

        canvas.addEventListener("mousedown", () => {
            isMouseDownRef.current = true;
        });
        canvas.addEventListener("mouseup", () => {
            isMouseDownRef.current = false;
        });
        canvas.addEventListener("mousemove", handleMove);
        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchmove", handleTouchMove);
        canvas.addEventListener("touchend", handleTouchEnd);

        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const pixelData = context.getImageData(x, y, 1, 1).data;
            const isNotEmptyPixel =
                pixelData[0] !== 0 || pixelData[1] !== 0 || pixelData[2] !== 0;

            if (isNotEmptyPixel) {
                const hexColor = rgbToHex(
                    pixelData[0],
                    pixelData[1],
                    pixelData[2]
                );
                setHex(hexColor);
            }
        });

        return () => {
            canvas.removeEventListener("mousedown", () => {
                isMouseDownRef.current = true;
            });
            canvas.removeEventListener("mouseup", () => {
                isMouseDownRef.current = false;
            });
            canvas.removeEventListener("mousemove", handleMove);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    );
};

export { CanvasColor };
