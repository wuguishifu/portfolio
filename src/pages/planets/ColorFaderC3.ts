import { Vector3 } from "./math";

export class ColorFaderC3 {
    color1: Vector3;
    color2: Vector3;
    color3: Vector3;

    mr1: number;
    mr2: number;
    mg1: number;
    mg2: number;
    mb1: number;
    mb2: number;

    br1: number;
    br2: number;
    bg1: number;
    bg2: number;
    bb1: number;
    bb2: number;

    x1: number = 0;
    x2: number;
    x3: number = 1;

    constructor(c1: Vector3, c2: Vector3, c3: Vector3, dx: number) {
        this.x2 = dx;

        this.color1 = Vector3.scale(c1, 1 / 255);
        this.color2 = Vector3.scale(c2, 1 / 255);
        this.color3 = Vector3.scale(c3, 1 / 255);

        this.mr1 = (this.color2.x - this.color1.x) / (this.x2 - this.x1);
        this.mr2 = (this.color3.x - this.color2.x) / (this.x3 - this.x2);
        this.mg1 = (this.color2.y - this.color1.y) / (this.x2 - this.x1);
        this.mg2 = (this.color3.y - this.color2.y) / (this.x3 - this.x2);
        this.mb1 = (this.color2.z - this.color1.z) / (this.x2 - this.x1);
        this.mb2 = (this.color3.z - this.color2.z) / (this.x3 - this.x2);

        this.br1 = this.color1.x;
        this.br2 = this.color2.x;
        this.bg1 = this.color1.y;
        this.bg2 = this.color2.y;
        this.bb1 = this.color1.z;
        this.bb2 = this.color2.z;
    }

    getColor(x: number) {
        if (x < this.x1) {
            return this.color1;
        } else if (x < this.x2) {
            return new Vector3(
                this.mr1 * (x - this.x1) + this.br1,
                this.mg1 * (x - this.x1) + this.bg1,
                this.mb1 * (x - this.x1) + this.bb1
            );
        } else if (x < this.x3) {
            return new Vector3(
                this.mr2 * (x - this.x2) + this.br2,
                this.mg2 * (x - this.x2) + this.bg2,
                this.mb2 * (x - this.x2) + this.bb2
            );
        } else {
            return this.color3;
        }
    }
}