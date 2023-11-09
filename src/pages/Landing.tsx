import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Chibi from '../assets/chibi/chibi-reflected.png';
import { Helmet } from "react-helmet-async";
import projects from "../projects";
import quickCodes from "../quick-codes";
import { blogs } from "../blog";

const projectPaths = Object.values(projects).map(project => `projects/${project.meta}`);
const qcPaths = Object.values(quickCodes).map(qc => `quick-codes/${qc.meta}`);
const blogPaths = Object.values(blogs).map(blog => `blog/${blog.slug}`);

const paths = [...projectPaths, ...qcPaths, ...blogPaths];

export default function Landing() {

    const navigate = useNavigate();
    const handleShowMe = useCallback(() => navigate(paths[Math.floor(Math.random() * paths.length)]), []);

    return (
        <div className="flex items-center w-full px-[15%] h-full justify-center">
            <Helmet>
                <title>Bo</title>
            </Helmet>
            <div className="flex-1 place-content-center z-10">
                <div className="text-[5em] font-bold mt-0 mb-4 mx-0 animate-fade-in fill-mode-both leading-[1]">Hey there!</div>
                <div className="text-[4em] font-bold mt-0 mb-4 mx-0 animate-fade-in animation-delay-200 fill-mode-both leading-[1]">
                    I'm <span className="text-blue">Bo Bramer</span>.
                </div>
                <div className="text-[1.2em] text-grey mt-0 mb-2 mx-0 animate-fade-in animation-delay-400 fill-mode-both">
                    I'm a full-stack developer building web and mobile apps using React Native. My go-to tech stack is MERN on AWS.
                </div>
                <div className="flex flex-row">
                    <div
                        className="text-[#0064a4] bg-[white] cursor-pointer text-[1.2em] animate-fade-in animation-delay-600 fill-mode-both font-normal transition-all duration-[0.5s] mt-[1em] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-[#0064a4] hover:bg-[#0064a4] hover:text-[white]"
                        onClick={handleShowMe}>
                        Show me something cool!
                    </div>
                </div>
            </div>
            <div className="flex-1 place-content-center hidden md:block">
                <img src={Chibi} className="fixed left-[55%] h-4/5 bottom-0 animate-[fade-in_1.5s] fill-mode-both animation-delay-200" alt="chibi bo" />
            </div>
        </div>
    );
};