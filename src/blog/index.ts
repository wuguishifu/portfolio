export * from "./Blogs";
export * from "./Blog";

import safelyStoringAuthenticationData from './pages/securePasswords.md?raw';

export const blogs = {
    'safely-storing-authentication-data': {
        data: safelyStoringAuthenticationData,
        title: 'Safely Storing User Passwords',
        slug: 'safely-storing-authentication-data',
        blurb: 'In this blog post, I talk about some of the dangers of storing user passwords in plain text, and how to avoid them using techniques such as hashing, salting, and hash rate dampening.',
        image: 'securePasswords/passwords.png'
    },
} as {
    [key: string]: {
        data: string;
        title: string;
        slug: string;
        blurb: string;
        image: string;
    };
};