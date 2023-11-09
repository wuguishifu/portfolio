import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import codes from ".";
import { BlockSplit, Page } from "./page";

export default function QuickCodes() {
    return (
        <div>
            <Helmet>
                <title>Bo | Quick Codes</title>
            </Helmet>
            <div className="py-20 w-full flex flex-col items-center">
                <div className="text-7xl font-bold animate-fade-in fill-mode-both text-center">Quick Codes</div>
                <div className="text-2xl px-3 max-w-xl text-grey opacity-70 text-center mt-2 animate-fade-in fill-mode-both animation-delay-200">These are small scale-projects that I spent a couple of days on to learn about a specific algorithm or concept or just for fun.</div>
                <div className="gap-8 flex flex-col items-center w-4/5 max-w-screen-xl pt-10">
                    {Object.values(codes).map((project, index) => <CodeRow project={project} reverse={!!(index % 2)} key={project.title} style={{ animationDelay: `${(index + 2) * 200}ms` }} />)}
                </div>
            </div>
        </div>
    );
};

function CodeRow({ project, reverse, style }: { project: Page; reverse: boolean; style?: React.CSSProperties }) {
    const block = project.blocks[0] as BlockSplit;
    return (
        <Link
            className={`flex flex-col ${reverse ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-8 p-4 md:p-8 rounded-xl ${project.background} items-center animate-fade-in fill-mode-both w-full`}
            to={`/quick-codes/${project.meta}`}
            style={style}>
            <div className="flex-[1] gap-8 flex flex-col justify-between pb-4 md:py-4 overflow-hidden flex-shrink-0">
                {project.title && <div className="text-4xl md:text-5xl font-bold text-white">{project.title} <i className="ri-external-link-line" /></div>}
                <div className="text-lg text-white opacity-70 md:block hidden">{block.section_text}</div>
            </div>
            <img
                className={`${project.hide_shadow ? '' : 'shadow'} rounded-lg flex-[1] flex-shrink overflow-hidden`}
                src={project.image_path + block.section_image}
                alt={block.section_image}
            />
        </Link>
    );
}