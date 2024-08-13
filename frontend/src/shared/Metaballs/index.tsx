import React, { useEffect, useRef } from "react";

const MetaballsAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gl: any = useRef<WebGLRenderingContext | null>(null);
    const numMetaballs = 30;
    const metaballs = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = (canvas.width = window.innerWidth);
        const height = (canvas.height = window.innerHeight);
        document.body.appendChild(canvas);

        gl.current = canvas.getContext("webgl");
        if (!gl.current) {
            console.error("WebGL is not supported.");
            return;
        }

        const mouse = { x: 0, y: 0 };

        for (let i = 0; i < numMetaballs; i++) {
            const radius = Math.random() * 60 + 50;
            metaballs.current.push({
                x: Math.random() * (width - 2 * radius) + radius,
                y: Math.random() * (height - 2 * radius) + radius,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                r: radius * 0.75,
            });
        }

        const vertexShaderSrc = `
      attribute vec2 position;

      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragmentShaderSrc =
            `
      precision highp float;

      const float WIDTH = ` +
            (width >> 0) +
            `.0;
      const float HEIGHT = ` +
            (height >> 0) +
            `.0;

      uniform vec3 metaballs[` +
            numMetaballs +
            `];

      void main(){
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;

        float sum = 0.0;
        for (int i = 0; i < ` +
            numMetaballs +
            `; i++) {
          vec3 metaball = metaballs[i];
          float dx = metaball.x - x;
          float dy = metaball.y - y;
          float radius = metaball.z;

          sum += (radius * radius) / (dx * dx + dy * dy);
        }

        if (sum >= 0.99) {
          gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
          return;
        }

        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    `;

        const vertexShader: any = compileShader(
            vertexShaderSrc,
            gl.current.VERTEX_SHADER
        );
        const fragmentShader: any = compileShader(
            fragmentShaderSrc,
            gl.current.FRAGMENT_SHADER
        );

        const program: any = gl.current.createProgram();
        gl.current.attachShader(program, vertexShader);
        gl.current.attachShader(program, fragmentShader);
        gl.current.linkProgram(program);
        gl.current.useProgram(program);

        const vertexData = new Float32Array([
            -1.0,
            1.0, // top left
            -1.0,
            -1.0, // bottom left
            1.0,
            1.0, // top right
            1.0,
            -1.0, // bottom right
        ]);

        const vertexDataBuffer = gl.current.createBuffer();
        gl.current.bindBuffer(gl.current.ARRAY_BUFFER, vertexDataBuffer);
        gl.current.bufferData(
            gl.current.ARRAY_BUFFER,
            vertexData,
            gl.current.STATIC_DRAW
        );

        const positionHandle = getAttribLocation(program, "position");
        gl.current.enableVertexAttribArray(positionHandle);
        gl.current.vertexAttribPointer(
            positionHandle,
            2, // position is a vec2
            gl.current.FLOAT, // each component is a float
            false, // don't normalize values
            2 * 4, // two 4 byte float components per vertex
            0 // offset into each span of vertex data
        );

        const metaballsHandle = getUniformLocation(program, "metaballs");

        const loop = () => {
            for (let i = 0; i < numMetaballs; i++) {
                const metaball = metaballs.current[i];
                metaball.x += metaball.vx;
                metaball.y += metaball.vy;

                if (metaball.x < metaball.r || metaball.x > width - metaball.r)
                    metaball.vx *= -1;
                if (metaball.y < metaball.r || metaball.y > height - metaball.r)
                    metaball.vy *= -1;
            }

            const dataToSendToGPU = new Float32Array(3 * numMetaballs);
            for (let i = 0; i < numMetaballs; i++) {
                const baseIndex = 3 * i;
                const mb = metaballs.current[i];
                dataToSendToGPU[baseIndex + 0] = mb.x;
                dataToSendToGPU[baseIndex + 1] = mb.y;
                dataToSendToGPU[baseIndex + 2] = mb.r;
            }
            gl.current.uniform3fv(metaballsHandle, dataToSendToGPU);

            //Draw
            gl.current.drawArrays(gl.current.TRIANGLE_STRIP, 0, 4);

            requestAnimationFrame(loop);
        };

        loop();

        canvas.onmousemove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        return () => {
            // Cleanup
        };
    }, []);

    const compileShader = (shaderSource: string, shaderType: number) => {
        const shader = gl.current.createShader(shaderType);
        gl.current.shaderSource(shader, shaderSource);
        gl.current.compileShader(shader);

        if (!gl.current.getShaderParameter(shader, gl.current.COMPILE_STATUS)) {
            throw (
                "Shader compile failed with: " +
                gl.current.getShaderInfoLog(shader)
            );
        }

        return shader;
    };

    const getUniformLocation = (program: WebGLProgram, name: string) => {
        const uniformLocation = gl.current.getUniformLocation(program, name);
        if (uniformLocation === -1) {
            throw "Can not find uniform " + name + ".";
        }
        return uniformLocation;
    };

    const getAttribLocation = (program: WebGLProgram, name: string) => {
        const attributeLocation = gl.current.getAttribLocation(program, name);
        if (attributeLocation === -1) {
            throw "Can not find attribute " + name + ".";
        }
        return attributeLocation;
    };

    return <canvas ref={canvasRef}  className="absolute top-0 left-0 w-full"/>;
};

export default MetaballsAnimation;
