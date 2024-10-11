export default class Procedure_background {
    background_color: string;
    blur: number;
    color: string;
    count: number;
    speed: number;
    constructor({
        background_color = "#ffffff",
        blur = 5,
        color = "#000000",
        count = 3,
        speed = 2,
    }) {
        this.background_color = background_color;
        this.blur = blur;
        this.color = color;
        this.count = count;
        this.speed = speed;
    }
}
