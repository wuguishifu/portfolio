import { mat4 } from "gl-matrix";
import { Vector3 } from "./math";

const defaults = {
    focus: new Vector3(0, 0, 0),
    up: new Vector3(0, 1, 0),
    distance: 10.0,
    verticalAngle: -40,
    horizontalAngle: -45,
};

export class Camera {
    mouse = { x: 0, y: 0 };
    prevMouse = { x: 0, y: 0 };
    curMouse = { x: 0, y: 0 };

    wheel = { x: 0, y: 0 };
    prevWheel = { x: 0, y: 0 };
    curWheel = { x: 0, y: 0 };

    mouseButtonDown = false;

    focus: Vector3;
    up: Vector3;
    distance: number;
    verticalAngle: number;
    horizontalAngle: number;

    position: Vector3;

    mouseSensitivity = 0.2;
    scrollSensitivity = 1 / 150;

    fov: number = 45 * Math.PI / 180;
    aspect: number;
    zNear: number = 0.1;
    zFar: number = 100.0;

    constructor(aspect: number) {
        this.focus = new Vector3(defaults.focus.x, defaults.focus.y, defaults.focus.z);
        this.up = new Vector3(defaults.up.x, defaults.up.y, defaults.up.z);
        this.distance = defaults.distance
        this.verticalAngle = defaults.verticalAngle;
        this.horizontalAngle = defaults.horizontalAngle;

        let horizontalDistance = this.distance * Math.cos(degToRad(this.verticalAngle));
        let verticalDistance = this.distance * Math.sin(degToRad(this.verticalAngle));

        let xOffset = horizontalDistance * Math.sin(degToRad(-this.horizontalAngle));
        let zOffset = horizontalDistance * Math.cos(degToRad(-this.horizontalAngle));

        this.position = new Vector3(this.focus.x + xOffset, this.focus.y - verticalDistance, this.focus.z + zOffset);
        this.aspect = aspect;
    }

    reset() {
        this.focus = new Vector3(defaults.focus.x, defaults.focus.y, defaults.focus.z);
        this.up = new Vector3(defaults.up.x, defaults.up.y, defaults.up.z);
        this.distance = defaults.distance
        this.verticalAngle = defaults.verticalAngle;
        this.horizontalAngle = defaults.horizontalAngle;

        let horizontalDistance = this.distance * Math.cos(degToRad(this.verticalAngle));
        let verticalDistance = this.distance * Math.sin(degToRad(this.verticalAngle));

        let xOffset = horizontalDistance * Math.sin(degToRad(-this.horizontalAngle));
        let zOffset = horizontalDistance * Math.cos(degToRad(-this.horizontalAngle));

        this.position = new Vector3(this.focus.x + xOffset, this.focus.y - verticalDistance, this.focus.z + zOffset);
    }

    update() {
        this.curMouse = { x: this.mouse.x, y: this.mouse.y };
        this.curWheel.y = this.wheel.y;
        let dm = { x: this.curMouse.x - this.prevMouse.x, y: this.curMouse.y - this.prevMouse.y };
        let dy = this.curWheel.y - this.prevWheel.y;

        this.prevMouse = { x: this.curMouse.x, y: this.curMouse.y };
        this.prevWheel = { x: this.curWheel.x, y: this.curWheel.y };

        if (this.mouseButtonDown) {
            this.verticalAngle -= dm.y * this.mouseSensitivity;
            this.horizontalAngle += dm.x * this.mouseSensitivity;
        }

        if (this.verticalAngle > 90) this.verticalAngle = 90;
        else if (this.verticalAngle < -90) this.verticalAngle = -90;

        this.distance = Math.max(this.distance - dy, 0);

        // arcball
        let horizontalDistance = this.distance * Math.cos(degToRad(this.verticalAngle));
        let verticalDistance = this.distance * Math.sin(degToRad(this.verticalAngle));

        let xOffset = horizontalDistance * Math.sin(degToRad(-this.horizontalAngle));
        let zOffset = horizontalDistance * Math.cos(degToRad(-this.horizontalAngle));

        this.position = new Vector3(this.focus.x + xOffset, this.focus.y - verticalDistance, this.focus.z + zOffset);
    }

    setMousePosition(x: number, y: number) {
        this.mouse.x = x;
        this.mouse.y = y;
    }

    setWheelPosition(x: number, y: number) {
        this.wheel.x = x;
        this.wheel.y = y;
    }

    setMouseButtonDown(down: boolean) {
        this.mouseButtonDown = down;
    }

    viewMatrix() {
        let viewMatrix = mat4.create();
        mat4.lookAt(viewMatrix, this.position.toReadonlyVec3(), this.focus.toReadonlyVec3(), this.up.toReadonlyVec3());
        return viewMatrix;
    }

    projectionMatrix() {
        let projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, this.fov, this.aspect, this.zNear, this.zFar);
        return projectionMatrix;
    }
}

function degToRad(degree: number) {
    return degree * Math.PI / 180;
}