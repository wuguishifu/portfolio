import { Page } from './page';

import molecular from './pages/molecular.json';

export default {
    [molecular.meta]: molecular
} as {
    [key: string]: Page;
};