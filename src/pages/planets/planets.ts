import sha256 from "crypto-js/sha256";
import { Camera } from "./Camera";
import { buildProgramInfo, initShaderProgram } from "./shader-source";

import { Atmosphere } from "./Atmosphere";
import { Planet } from "./Planet";
import renderObject from "./renderer";
import fsSource from './shaders/fragment.glsl?raw';
import vsSource from './shaders/vertex.glsl?raw';
import { Vector3 } from "./math";

declare global {
    interface Math {
        seedrandom(seed: string): void;
    }
}

let showAtmosphere = true;

export function toggleAtmosphere() {
    showAtmosphere = !showAtmosphere;
}

export function start(seed: string) {
    canvas ||= document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;
    gl ||= canvas.getContext("webgl", { antialias: true });
    if (!gl) return;

    canvas.addEventListener('contextmenu', contextMenuListener);
    canvas.addEventListener('wheel', wheelListener, { passive: true });
    canvas.addEventListener('mousedown', mouseDownListener);
    canvas.addEventListener('mouseup', mouseUpListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
    canvas.addEventListener('mouseleave', mouseLeaveListener);

    camera = new Camera(canvas.clientWidth / canvas.clientHeight);

    running = true;
    init(seed);
    run();
}

export function regenerate(seed: string) {
    // init planet here
    if (!gl) return;
    planet = new Planet(gl, seed);
    atmospheres = [];
    atmospheres.push(new Atmosphere(gl, seed, planet.maxRadius + 1));
    atmospheres.push(new Atmosphere(gl, sha256(seed).toString(), planet.maxRadius + 1.5 * Math.random()));
}

export function resetCameraPosition() {
    camera?.reset();
}

export function stop() {
    if (!canvas) return;

    canvas.removeEventListener('contextmenu', contextMenuListener);
    canvas.removeEventListener('wheel', wheelListener);
    canvas.removeEventListener('mousedown', mouseDownListener);
    canvas.removeEventListener('mouseup', mouseUpListener);
    canvas.removeEventListener('mousemove', mouseMoveListener);
    canvas.removeEventListener('mouseleave', mouseLeaveListener);

    running = false;
}

let running = false;
let canvas: HTMLCanvasElement;
let gl: null | WebGLRenderingContext;

let camera: Camera;

let programInfo: {
    program: WebGLProgram,
    attributes: { [name: string]: number },
    uniforms: { [name: string]: WebGLUniformLocation }
};

const contextMenuListener = (e: MouseEvent) => e.preventDefault();
const wheelListener = (e: WheelEvent) => camera.setWheelPosition(e.deltaX, camera.curWheel.y - e.deltaY * camera.scrollSensitivity);
const mouseDownListener = (e: MouseEvent) => e.button === 0 && camera.setMouseButtonDown(true);
const mouseUpListener = (e: MouseEvent) => e.button === 0 && camera.setMouseButtonDown(false);
const mouseMoveListener = (e: MouseEvent) => camera.setMousePosition(e.clientX, e.clientY);
const mouseLeaveListener = () => camera.setMouseButtonDown(false);

function init(seed: string) {
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it');
        throw new Error('no webgl');
    }

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.depthMask(false);
    gl.clearDepth(1);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    programInfo = { ...buildProgramInfo(gl, shaderProgram), program: shaderProgram };

    // init planet here
    regenerate(seed);
}

let planet: Planet;
let atmospheres: Atmosphere[] = [];

function run() {
    camera.update();
    atmospheres.forEach(atmosphere => {
        atmosphere.rotation = Vector3.add(atmosphere.rotation, atmosphere.period);
    });

    if (!gl) return;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // render planet
    gl.depthMask(true);
    gl.enable(gl.CULL_FACE);
    renderObject({
        gl: gl!,
        info: programInfo,
        object: {
            mesh: planet.mesh,
            model: {
                position: planet.position,
                rotation: planet.rotation,
                scale: planet.scale
            }
        },
        camera
    });

    // render atmosphere
    if (showAtmosphere) {
        gl.depthMask(false);
        gl.disable(gl.CULL_FACE);
        atmospheres.forEach(atmosphere => {
            renderObject({
                gl: gl!,
                info: programInfo,
                object: {
                    mesh: atmosphere.mesh,
                    model: {
                        position: atmosphere.position,
                        rotation: atmosphere.rotation,
                        scale: atmosphere.scale
                    }
                },
                camera
            });
        });
    }

    if (!running) return;
    window.requestAnimationFrame(run);
}