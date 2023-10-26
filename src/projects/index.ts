import { Page } from './page';

import molecular from './pages/molecular.json';
import ptable from './pages/chemtalk-ptable.json';
import mujank from './pages/mujank.json';

export default {
    [molecular.meta]: molecular,
    [ptable.meta]: ptable,
    [mujank.meta]: mujank
} as {
    [key: string]: Page;
};