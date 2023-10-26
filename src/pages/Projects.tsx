import { Helmet } from "react-helmet-async";
import projects, { getImage } from "../projects";
import { BlockSplit, Page } from "../projects/page";
import { Link } from "react-router-dom";

export default function Projects() {
    return (
        <div>
            <Helmet>
                <title>Bo | Projects</title>
            </Helmet>
            <div className="py-20 w-full flex flex-col items-center">
                <div className="text-7xl font-bold animate-fade-in fill-mode-both">Projects</div>
                <div className="text-2xl text-grey opacity-70 text-center mt-2 animate-fade-in fill-mode-both animation-delay-200">I've worked on a lot of projects over the years. Here are some of my favorites.</div>
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
        <Link className={`w-full flex ${reverse ? 'flex-row' : 'flex-row-reverse'} gap-16 p-8 rounded-xl ${project.background} h-[400px] items-center animate-fade-in fill-mode-both`} to={`/projects/${project.meta}`} style={style}>
            <div className="flex-1 gap-8 flex flex-col justify-center">
                {project.title && <h1 className="text-5xl font-bold text-white">{project.title} <i className="ri-external-link-line" /></h1>}
                <p className="text-lg text-white opacity-70">{block.section_text}</p>
            </div>
            <div className="flex-1">
                <img
                    className="shadow rounded-lg w-full aspect-auto"
                    src={getImage(project.image_path + block.section_image)}
                    alt={block.section_image}
                />
            </div>
        </Link>
    );
}