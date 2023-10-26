import molecular from './molecular/molecular.json';
import { Page } from './page';

export default {
    [molecular.meta]: molecular
} as {
    [key: string]: Page;
};

export const getImage = (fileName: string) => new URL(fileName, import.meta.url).href;