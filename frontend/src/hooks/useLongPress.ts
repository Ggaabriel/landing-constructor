import { useState, useRef, MouseEvent, TouchEvent } from "react";

function useLongPress(func: any) {
    type GenericMouseEvent = MouseEvent<HTMLElement, MouseEvent>;

    const [action, setAction] = useState<string | undefined>("");

    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
    const isLongPress = useRef<boolean | undefined>();

    function startPressTimer(e: GenericMouseEvent | TouchEvent<HTMLElement>) {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setAction("longpress");
            func(e);
            setAction(undefined);
            clearInterval(timerRef.current);
        }, 300);
    }

    function handleOnClick() {
        if (isLongPress.current) {

            return;
        }
        setAction("click");
    }

    function handleOnMouseDown(e: any) {

        startPressTimer(e);
    }

    function handleOnMouseUp() {

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }

    function handleOnTouchStart(e: TouchEvent<HTMLElement>) {

        startPressTimer(e);
    }

    function handleOnTouchEnd() {
        if (action === "longpress") return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }

    return {
        onClick: handleOnClick,
        onMouseDown: handleOnMouseDown,
        onMouseUp: handleOnMouseUp,
        onTouchStart: handleOnTouchStart,
        onTouchEnd: handleOnTouchEnd,
    };
}
export default useLongPress;
