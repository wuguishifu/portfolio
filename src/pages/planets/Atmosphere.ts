import { ImprovedNoise } from "./ImprovedNoise";
import { Mesh, Vertex } from "./Mesh";
import { Vector3, Vector4 } from "./math";

const depth = 4;
const phi = 1.618;

export class Atmosphere {
    mesh: Mesh;
    previousVertices: Vector3[] = [];

    position: Vector3;
    rotation: Vector3;
    scale: Vector3;

    period: Vector3;

    constructor(gl: WebGLRenderingContext, seed: string, radius: number) {
        Math.seedrandom(seed);

        const spareDistance = 0.8 * Math.random();
        const spareOffset = 0.3 * Math.random();
        const amplitude = 0.2;

        const triangles = this.generateTriangles(radius);
        const noise = new ImprovedNoise();

        for (let i = 0; i < this.previousVertices.length; i++) {
            this.previousVertices[i] = Vector3.scale(
                Vector3.normalize(this.previousVertices[i]),
                radius + amplitude * noise.noise(
                    this.previousVertices[i].x * spareDistance + spareOffset,
                    this.previousVertices[i].y * spareDistance + spareOffset,
                    this.previousVertices[i].z * spareDistance + spareOffset
                )
            );
        }

        const vertices: Vertex[] = [];
        for (let i = 0; i < triangles.length; i++) {
            const t = triangles[i];
            const alpha = noise.noise(
                this.previousVertices[t.x].x * spareDistance,
                this.previousVertices[t.x].y * spareDistance,
                this.previousVertices[t.x].z * spareDistance
            );
            const color = new Vector4(1, 1, 1, alpha);
            vertices.push(
                new Vertex(this.previousVertices[t.x], this.previousVertices[t.x], color),
                new Vertex(this.previousVertices[t.y], this.previousVertices[t.y], color),
                new Vertex(this.previousVertices[t.z], this.previousVertices[t.z], color),
            );
        }

        const indices: number[] = [];
        for (let i = 0; i < triangles.length * 3; i++) indices.push(i);

        this.mesh = new Mesh(gl, vertices, indices);

        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);

        this.period = new Vector3(Math.random() * 0.001, Math.random() * 0.001, Math.random() * 0.001);
    }

    generateTriangles(radius: number): Vector3[] {
        this.previousVertices = [];

        const faces: Vector3[] = [];

        faces.push(...this.subdivide(i[0], i[2], i[10], depth, radius));
        faces.push(...this.subdivide(i[0], i[10], i[5], depth, radius));
        faces.push(...this.subdivide(i[0], i[5], i[4], depth, radius));
        faces.push(...this.subdivide(i[0], i[4], i[8], depth, radius));
        faces.push(...this.subdivide(i[0], i[8], i[2], depth, radius));
        faces.push(...this.subdivide(i[3], i[1], i[11], depth, radius));
        faces.push(...this.subdivide(i[3], i[11], i[7], depth, radius));
        faces.push(...this.subdivide(i[3], i[7], i[6], depth, radius));
        faces.push(...this.subdivide(i[3], i[6], i[9], depth, radius));
        faces.push(...this.subdivide(i[3], i[9], i[1], depth, radius));
        faces.push(...this.subdivide(i[2], i[6], i[7], depth, radius));
        faces.push(...this.subdivide(i[2], i[7], i[10], depth, radius));
        faces.push(...this.subdivide(i[10], i[7], i[11], depth, radius));
        faces.push(...this.subdivide(i[10], i[11], i[5], depth, radius));
        faces.push(...this.subdivide(i[5], i[11], i[1], depth, radius));
        faces.push(...this.subdivide(i[5], i[1], i[4], depth, radius));
        faces.push(...this.subdivide(i[4], i[1], i[9], depth, radius));
        faces.push(...this.subdivide(i[4], i[9], i[8], depth, radius));
        faces.push(...this.subdivide(i[8], i[9], i[6], depth, radius));
        faces.push(...this.subdivide(i[8], i[6], i[2], depth, radius));

        return faces;
    }

    subdivide(v1: Vector3, v2: Vector3, v3: Vector3, depth: number, radius: number): Vector3[] {
        const faces: Vector3[] = [];

        // base case
        if (depth === 0) {
            let v1p = Vector3.scale(Vector3.normalize(v1), radius);
            let v2p = Vector3.scale(Vector3.normalize(v2), radius);
            let v3p = Vector3.scale(Vector3.normalize(v3), radius);

            const p1 = this.previousVertices.findIndex(Vector3.equalsFn(v1p));
            const p2 = this.previousVertices.findIndex(Vector3.equalsFn(v2p));
            const p3 = this.previousVertices.findIndex(Vector3.equalsFn(v3p));

            let indexVector = new Vector3(0, 0, 0);

            if (p1 > -1) {
                indexVector.x = p1;
            } else {
                indexVector.x = this.previousVertices.length;
                this.previousVertices.push(v1p);
            }

            if (p2 > -1) {
                indexVector.y = p2;
            } else {
                indexVector.y = this.previousVertices.length;
                this.previousVertices.push(v2p);
            }

            if (p3 > -1) {
                indexVector.z = p3;
            } else {
                indexVector.z = this.previousVertices.length;
                this.previousVertices.push(v3p);
            }

            faces.push(indexVector);
            return faces;
        }

        // recursive case
        const v12 = Vector3.scale(Vector3.normalize(Vector3.add(v1, v2)), radius);
        const v23 = Vector3.scale(Vector3.normalize(Vector3.add(v2, v3)), radius);
        const v31 = Vector3.scale(Vector3.normalize(Vector3.add(v3, v1)), radius);

        faces.push(...this.subdivide(v1, v12, v31, depth - 1, radius));
        faces.push(...this.subdivide(v2, v23, v12, depth - 1, radius));
        faces.push(...this.subdivide(v3, v31, v23, depth - 1, radius));
        faces.push(...this.subdivide(v12, v23, v31, depth - 1, radius));

        return faces;
    }
}

const radius = 1;
const i = [
    new Vector3(0.5 * radius, 0, phi / 2 * radius),
    new Vector3(0.5 * radius, 0, -phi / 2 * radius),
    new Vector3(-0.5 * radius, 0, phi / 2 * radius),
    new Vector3(-0.5 * radius, 0, -phi / 2 * radius),
    new Vector3(phi / 2 * radius, 0.5 * radius, 0),
    new Vector3(phi / 2 * radius, -0.5 * radius, 0),
    new Vector3(-phi / 2 * radius, 0.5 * radius, 0),
    new Vector3(-phi / 2 * radius, -0.5 * radius, 0),
    new Vector3(0, phi / 2 * radius, 0.5 * radius),
    new Vector3(0, phi / 2 * radius, -0.5 * radius),
    new Vector3(0, -phi / 2 * radius, 0.5 * radius),
    new Vector3(0, -phi / 2 * radius, -0.5 * radius),
];