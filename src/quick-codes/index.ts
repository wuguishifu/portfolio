import { Page } from './page';

export default {
} as {
    [key: string]: Page;
};

export const getImage = (fileName: string) => new URL(fileName, import.meta.url).href;