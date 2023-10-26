import molecular from './molecular/molecular.json';
import { Page } from './page';

export default {
    [molecular.meta]: molecular
} as {
    [key: string]: Page;
};