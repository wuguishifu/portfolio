import { Page } from './page';

import marchingCubes from './pages/marching-cubes.json';
import planets from './pages/planets.json';
import mathParser from './pages/math-parser.json';

export default {
    [marchingCubes.meta]: marchingCubes,
    [planets.meta]: planets,
    [mathParser.meta]: mathParser,
} as {
    [key: string]: Page;
};