// Bokeh.ts
import hexToH  from './hexToH'; // Путь к файлу hexToH.ts

// Внутри класса Bokeh можно использовать hexToH

class Bokeh {
    private size: number;
    private x: number;
    private y: number;
    private H: number;
    private S: number;
    private L: number;
    private angleX: number;
    private angleY: number;
    private speedX: number;
    private speedY: number;
  
    constructor(canvas: HTMLCanvasElement, bokehColor: string) {
      this.size = Math.random() * 80 + 50;
      this.x = Math.random() * (canvas.width - this.size);
      this.y = Math.random() * (canvas.height - this.size);
      this.H = hexToH(bokehColor);
      this.S = Math.floor(Math.random() * 15 + 75);
      this.L = Math.floor(Math.random() * 40 + 30);
      this.angleX = Math.random() * 4 - 2;
      this.angleY = Math.random() * 4 - 2;
      this.speedX = 0;
      this.speedY = 0;
    }
  
    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX;
      this.y += Math.sin(this.angleY) * this.speedY;
      if (this.x >= canvas.width - this.size || this.x <= this.size) {
        this.speedX *= -1;
      }
      if (this.y >= canvas.height - this.size || this.y <= this.size) {
        this.y -= Math.sin(this.angleY) * this.speedY;
      }
      this.angleX += 0.02;
      this.angleY += 0.02;
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      const rgbColor = hslToRgb(this.H, this.S, this.L);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
      ctx.fillStyle = rgbColor;
      ctx.fill();
    }
  }
  
  export default Bokeh;
  