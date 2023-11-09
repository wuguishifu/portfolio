import 'remixicon/fonts/remixicon.css';
import bo from '../assets/bo/bo-full.png';
import { Helmet } from 'react-helmet-async';

export default function About() {

    return (
        <div className="flex items-center w-full px-4 md:px-[15%] flex-col h-screen md:justify-center">
            <Helmet>
                <title>Bo | About</title>
            </Helmet>
            <div className="z-10 lg:gap-8 gap-4 flex flex-col pb-8 mt-20">
                <div className="text-[4em] font-bold pb-2 animate-fade-in fill-mode-both">What's Poppin!</div>
                <div className="text-[1.2em] text-grey animate-fade-in fill-mode-both animation-delay-200">
                    Hi! My name is <span className="text-blue">Bo Bramer</span>, and I'm a full-stack engineer with a degree in chemical
                    engineering from the University of California, Irvine. I like building websites and web applications for people around the
                    world to use. Currently, I'm developing interactive learning tools for students studying chemistry related fields for my
                    nonprofit, ChemTalk, and I'm working as the lead software engineer for iBored.
                </div>
                <div className="text-[1.2em] text-grey animate-fade-in fill-mode-both animation-delay-400">
                    In my free time, I've been learning how to grow vegetables and mushrooms in my garden. Most recently, I've been
                    designing an automated hydroponics system for lettuce. Side projects I'm working on include Applico, a website built in React that uses
                    column-based group layout to help users organize their job applications, and VCBB, a wesite built using the T3 stack for users to share virtual circuit board blueprints.
                </div>
                <div className="pt-2 w-full flex flex-row items-center gap-4 animate-fade-in animation-delay-600 fill-mode-both">
                    <a href="https://www.linkedin.com/in/bo-bramer/" target="_blank">
                        <i className="ri-linkedin-fill bg-white text-[1.4em] p-2 text-blue cursor-pointer transition-all duration-300 rounded-full border-2 border-solid border-blue hover:bg-blue hover:text-[white]" />
                    </a>
                    <a href="https://github.com/wuguishifu" target="_blank">
                        <i className="ri-github-fill bg-white text-[1.4em] p-2 text-blue cursor-pointer transition-all duration-300 rounded-full border-2 border-solid border-blue hover:bg-blue hover:text-[white]" />
                    </a>
                    <a href="https://instagram.com/theonetheycallbo" target="_blank">
                        <i className="ri-instagram-line bg-white text-[1.4em] p-2 text-blue cursor-pointer transition-all duration-300 rounded-full border-2 border-solid border-blue hover:bg-blue hover:text-[white]" />
                    </a>
                    <a href="mailto:bramer.bo@gmail.com" target="_blank">
                        <i className="ri-at-line bg-white text-[1.4em] p-2 text-blue cursor-pointer transition-all duration-300 rounded-full border-2 border-solid border-blue hover:bg-blue hover:text-[white]" />
                    </a>
                </div>
            </div >
            <div className="flex-1 place-content-center hidden xl:block" style={{ zIndex: -1 }}>
                <img className="fixed h-[90%] select-none bottom-0 animate-[fade-in_1.5s] animation-delay-200 fill-mode-both right-0" src={bo} alt={'bo.png'} />
            </div>
        </div >
    );
};