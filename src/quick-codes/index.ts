import { Page } from './page';

import marchingCubes from './pages/marching-cubes.json';
import planets from './pages/planets.json';

export default {
    [marchingCubes.meta]: marchingCubes,
    [planets.meta]: planets
} as {
    [key: string]: Page;
};