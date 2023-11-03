export * from "./Blogs";
export * from "./Blog";

import safelyStoringAuthenticationData from './pages/securePasswords.md?raw';
import apiBestPractices from './pages/apiBestPractices.md?raw';

export const blogs = {
    'safely-storing-authentication-data': {
        data: safelyStoringAuthenticationData,
        title: 'Safely Storing User Passwords',
        slug: 'safely-storing-authentication-data',
        blurb: 'In this blog post, I talk about some of the dangers of storing user passwords in plain text, and how to avoid them using techniques such as hashing, salting, and hash rate dampening.',
        image: 'securePasswords/passwords-default.png'
    },
    'api-best-practices': {
        data: apiBestPractices,
        title: 'The Pitfall of API Best Practices',
        slug: 'api-best-practices',
        blurb: 'In this blog post, I talk about the pitfalls of blindly following "best practices," why it\'s important to think about the context of your system, and how to avoid falling into the trap of cargo cult programming.',
        image: 'apiBestPractices/clients.png'
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