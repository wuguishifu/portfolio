import { Page } from './page';

import molecular from './pages/molecular.json';
import ptable from './pages/chemtalk-ptable.json';

export default {
    [molecular.meta]: molecular,
    [ptable.meta]: ptable
} as {
    [key: string]: Page;
};