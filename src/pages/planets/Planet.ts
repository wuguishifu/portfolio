import { ColorFaderC3 } from "./ColorFaderC3";
import { ImprovedNoise } from "./ImprovedNoise";
import { Mesh, Vertex } from "./Mesh";
import { Vector3, Vector4 } from "./math";

const depth = 4;
const phi = 1.618;

const blend = true;

export class Planet {
    mesh: Mesh;
    previousVertices: Vector3[] = [];
    radius: number;
    maxRadius: number;

    position: Vector3;
    rotation: Vector3;
    scale: Vector3;

    constructor(gl: WebGLRenderingContext, seed: string) {
        Math.seedrandom(seed);

        const color1 = new Vector3(Math.random() * 255, Math.random() * 255, Math.random() * 255);
        const color2 = new Vector3(Math.random() * 255, Math.random() * 255, Math.random() * 255);
        const color3 = new Vector3(Math.random() * 255, Math.random() * 255, Math.random() * 255);

        const spareDistance = 5.0 * Math.random();
        const spareOffset = 2.0 * Math.random();
        const amplitude = 2.0 * Math.random();
        const radius = 2.0;
        this.radius = radius;

        const triangles = this.generateTriangles(radius);
        const cf = new ColorFaderC3(color1, color2, color3, 0.5);
        const noise = new ImprovedNoise();

        // proecedural heightmap generation
        let maxHeight = 0;
        for (let i = 0; i < this.previousVertices.length; i++) {
            const randomFloat = noise.noise(
                this.previousVertices[i].x * spareDistance + spareOffset,
                this.previousVertices[i].y * spareDistance + spareOffset,
                this.previousVertices[i].z * spareDistance + spareOffset
            );
            let newRadius = radius + Math.max(amplitude * randomFloat, 0);
            this.previousVertices[i] = Vector3.scale(Vector3.normalize(this.previousVertices[i]), newRadius);
            if (newRadius > maxHeight) {
                maxHeight = newRadius;
            }
        }
        this.maxRadius = maxHeight;

        // generate vao
        const vertices: Vertex[] = [];
        for (let i = 0; i < triangles.length; i++) {
            const t = triangles[i];

            // calculate the color based on the magnitude of the vertex
            let ps2, ps3;
            let _c2, _c3;
            let c2 = new Vector4(0, 0, 0, 0);
            let c3 = new Vector4(0, 0, 0, 0);

            if (blend) {
                ps2 = (Vector3.magnitude(this.previousVertices[t.y]) - radius) / (maxHeight - radius);
                ps3 = (Vector3.magnitude(this.previousVertices[t.z]) - radius) / (maxHeight - radius);
                _c2 = cf.getColor(ps2);
                _c3 = cf.getColor(ps3);
                c2 = new Vector4(_c2.x, _c2.y, _c2.z, 1);
                c3 = new Vector4(_c3.x, _c3.y, _c3.z, 1);
            }

            let ps1 = (Vector3.magnitude(this.previousVertices[t.x]) - radius) / (maxHeight - radius);
            let _c1 = cf.getColor(ps1);
            let c1 = new Vector4(_c1.x, _c1.y, _c1.z, 1);

            const normal = Vector3.normalize(Vector3.cross(Vector3.subtract(this.previousVertices[t.y], this.previousVertices[t.x]), Vector3.subtract(this.previousVertices[t.z], this.previousVertices[t.x])));

            if (blend) {
                vertices[3 * i + 0] = new Vertex(this.previousVertices[triangles[i].x], normal, c1);
                vertices[3 * i + 1] = new Vertex(this.previousVertices[triangles[i].y], normal, c2);
                vertices[3 * i + 2] = new Vertex(this.previousVertices[triangles[i].z], normal, c3);
            } else {
                vertices[3 * i + 0] = new Vertex(this.previousVertices[triangles[i].x], normal, c1);
                vertices[3 * i + 1] = new Vertex(this.previousVertices[triangles[i].y], normal, c1);
                vertices[3 * i + 2] = new Vertex(this.previousVertices[triangles[i].z], normal, c1);
            }
        }

        // generate draw order indices
        const indices = [];
        for (let i = 0; i < triangles.length * 3; i++) {
            indices[i] = i;
        }

        this.mesh = new Mesh(gl, vertices, indices);

        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
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