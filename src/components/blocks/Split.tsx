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
            <div className={`w-4/5 max-w-screen-xl flex flex-col ${block.split_type === 'text-left' ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-16`}>
                <div className="flex-1 gap-8 flex flex-col justify-center">
                    {block.section_title && <div className={`text-5xl font-bold ${block.split_type === 'text-left' ? 'text-white' : 'text-black'}`}>{block.section_title}</div>}
                    <div className={`text-lg ${block.split_type === 'text-left' ? 'text-white opacity-70' : 'text-grey'}`} dangerouslySetInnerHTML={{ __html: block.section_text }} />
                    <div>
                        {block.section_buttons?.length &&
                            block.section_buttons.map((button) => (
                                <div className="flex flex-row pb-8 md:pb-0" key={button.link}>
                                    <a
                                        target="_blank"
                                        href={button.link}
                                        className="text-[#0064a4] bg-[white] cursor-pointer text-[1.2em] animate-fade-in animation-delay-600 fill-mode-both font-normal transition-all duration-[0.5s] mt-[1em] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-[#0064a4] hover:bg-[#0064a4] hover:text-[white]">
                                        {button.text}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex-1 flex-col items-center justify-center flex">
                    <img
                        className={`rounded-lg ${(properties.hide_shadow && !block.force_show_shadow) ? '' : 'shadow'}`}
                        src={image_path + block.section_image}
                        alt={block.section_image}
                    />
                </div>
            </div>
        </div>
    );
};