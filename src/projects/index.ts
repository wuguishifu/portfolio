import { Page } from './page';

import molecular from './pages/molecular.json';
import ptable from './pages/chemtalk-ptable.json';
import mujank from './pages/mujank.json';
import engine3d from './pages/engine3d.json';

export default {
    [molecular.meta]: molecular,
    [ptable.meta]: ptable,
    [engine3d.meta]: engine3d,
    [mujank.meta]: mujank
} as {
    [key: string]: Page;
};