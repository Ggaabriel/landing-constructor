interface IUseSwipeProps {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeTop?: () => void;
    onSwipeDown?: () => void;
}

const useSwipe = ({
    onSwipeLeft,
    onSwipeRight,
    onSwipeTop,
    onSwipeDown,
}: IUseSwipeProps) => {
    let y: number | null = null;
    let x: number | null = null;

    const handleTouchStart = (e: any) => {
        const firstTouch = e.touches[0];
        y = firstTouch.clientY;
        x = firstTouch.clientY;
    };

    const handleTouchMove = (e: any) => {
        if (!y || !x) {
            return false;
        }

        let y2 = e.touches[0].clientY;
        let x2 = e.touches[0].clientY;
        let yDiff = y2 - y;
        let xDiff = x2 - x;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 10) {
                onSwipeRight;
                console.log("right");
            } else {
                onSwipeLeft;
                console.log("left");
            }
        } else {
            if (yDiff > 10) {
                onSwipeTop;
                // console.log("down");
            } else {
                onSwipeDown;
                console.log("top");
            }
        }
        x = null;
        y = null;
    };
    console.log(123);
    
    return { handleTouchMove, handleTouchStart };
};
export { useSwipe };
