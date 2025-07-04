import * as React from 'react';
import './GalaxyBackground.css';

export interface GalaxyBackgroundProps {
    /** Dots per px of width */
    density?: number;
    /** Max px to draw lines between dots */
    maxDistance?: number;
    /** px radius around cursor to trigger lines */
    hoverRadius?: number;
    fps?: number;
    dotSize?: number;
    lineSize?: number;
    dotColor?: string;
    lineColor?: string;
    backgroundColor?: string;
}

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({
    density = 0.5,
    maxDistance = 50,
    hoverRadius = 100,
    fps = 30,
    dotSize = 1,
    lineSize = 0.1,
    dotColor = '#ffffff',
    lineColor = 'rgba(255,255,255,0.8)',
    backgroundColor = '#282c34',
}) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouse = { x: -9999, y: -9999 };
        let dots: Dot[] = [];
        let intervalId: number;

        class Dot {
            x: number; y: number;
            vx: number; vy: number;
            radius: number;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = -0.5 + Math.random();
                this.vy = -0.5 + Math.random();
                this.radius = Math.random() * dotSize;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            move() {
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                this.x += this.vx;
                this.y += this.vy;
                this.draw();
            }
            connect(others: Dot[]) {
                for (const o of others) {
                    const dx = this.x - o.x, dy = this.y - o.y;
                    const dist = Math.hypot(dx, dy);
                    const dxM = this.x - mouse.x, dyM = this.y - mouse.y;
                    const distM = Math.hypot(dxM, dyM);
                    if (dist < maxDistance && distM < hoverRadius) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(o.x, o.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function init() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = dotColor;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineSize;
            dots = Array.from({ length: density * width }, () => new Dot());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            dots.forEach(d => d.move());
            dots.forEach(d => d.connect(dots));
        }

        init();
        intervalId = window.setInterval(animate, 1000 / fps);

        const onMouseMove = (e: MouseEvent) => { mouse.x = e.pageX; mouse.y = e.pageY; };
        const onMouseLeave = () => { mouse.x = width * 2; mouse.y = height * 2; };
        const onResize = () => {
            window.clearInterval(intervalId);
            init();
            intervalId = window.setInterval(animate, 1000 / fps);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('resize', onResize);

        return () => {
            window.clearInterval(intervalId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('resize', onResize);
        };
    }, [
        density,
        maxDistance,
        hoverRadius,
        fps,
        dotSize,
        lineSize,
        dotColor,
        lineColor,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className="galaxy-background"
            style={{ backgroundColor }}
        />
    );
};

export default GalaxyBackground;
