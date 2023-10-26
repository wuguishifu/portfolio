import { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import { BlockSplit, Page } from "../../projects/page";

type SplitProps = {
    block: BlockSplit;
    image_path: string;
    properties: Omit<Page, 'blocks'>
}

export default ({ properties, block, image_path }: SplitProps) => {

    const ref = useRef<HTMLDivElement>(null);
    const [sectionVisible, hasAppeared] = useOnScreen(ref);

    return (
        <div className={`flex flex-col items-center ${sectionVisible || hasAppeared ? 'animate-fade-in' : 'opacity-0'} ${block.split_type === 'text-left' ? `${properties.background} py-8` : ''}`} ref={ref}>
            <div className={`w-4/5 max-w-screen-xl flex ${block.split_type === 'text-left' ? 'flex-row' : 'flex-row-reverse'} gap-16`}>
                <div className="flex-1 gap-8 flex flex-col justify-center">
                    {block.section_title && <h1 className="text-5xl font-bold">{block.section_title}</h1>}
                    <p className={`text-lg ${block.split_type === 'text-left' ? 'text-white opacity-70' : 'text-grey'}`} dangerouslySetInnerHTML={{ __html: block.section_text }} />
                    {block.section_button &&
                        <div className="flex flex-row">
                            <a
                                target="_blank"
                                href={block.section_button.link}
                                className="text-[#0064a4] bg-[white] cursor-pointer text-[1.2em] animate-fade-in animation-delay-600 fill-mode-both font-normal transition-all duration-[0.5s] mt-[1em] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-[#0064a4] hover:bg-[#0064a4] hover:text-[white]">
                                {block.section_button.text}
                            </a>
                        </div>
                    }
                </div>
                <div className="flex-1">
                    <img
                        className="shadow rounded-lg"
                        src={image_path + block.section_image}
                        alt={block.section_image}
                    />
                </div>
            </div>
        </div>
    );
};