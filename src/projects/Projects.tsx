import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import projects from ".";
import { BlockSplit, Page } from "./page";

export default function Projects() {
    return (
        <div>
            <Helmet>
                <title>Bo | Projects</title>
            </Helmet>
            <div className="py-20 w-full flex flex-col items-center">
                <div className="text-7xl font-bold animate-fade-in fill-mode-both">Projects</div>
                <div className="text-2xl text-grey opacity-70 text-center mt-2 animate-fade-in fill-mode-both animation-delay-200 max-w-xl">Here are some of my favorite projects I've worked on.</div>
                <div className="gap-8 flex flex-col items-center w-4/5 max-w-screen-xl pt-10">
                    {Object.values(projects).map((project, index) => <ProjectRow project={project} reverse={!!(index % 2)} key={project.title} style={{ animationDelay: `${(index + 2) * 200}ms` }} />)}
                </div>
            </div>
        </div>
    );
};

function ProjectRow({ project, reverse, style }: { project: Page; reverse: boolean; style?: React.CSSProperties }) {
    const block = project.blocks[0] as BlockSplit;
    return (
        <Link className={`flex flex-col ${reverse ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-8 p-4 md:p-8 rounded-xl ${project.background} md:h-[400px] items-center animate-fade-in fill-mode-both w-full`} to={`/projects/${project.meta}`} style={style}>
            <div className="gap-8 flex flex-col justify-between flex-1 max-h-[400px] border border-black py-4 overflow-hidden">
                {project.title && <div className="text-5xl font-bold text-white">{project.title} <i className="ri-external-link-line" /></div>}
                <div className="text-lg text-white opacity-70 md:block hidden">{block.section_text}</div>
            </div>
            <img
                className={`${project.hide_shadow ? '' : 'shadow'} rounded-lg md:h-1/2 lg:h-2/3 xl:h-full aspect-auto`}
                src={project.image_path + block.section_image}
                alt={block.section_image}
            />
        </Link>
    );
}