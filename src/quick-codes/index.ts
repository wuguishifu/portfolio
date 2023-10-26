import { Page } from './page';
import marchingCubes from './marching-cubes/marching-cubes.json';

export default {
    [marchingCubes.meta]: marchingCubes
} as {
    [key: string]: Page;
};