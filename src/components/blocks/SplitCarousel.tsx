import { useRef, useState } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import { BlockCarouselSplit, Page } from "../../projects/page";

type SplitCarouselProps = {
    block: BlockCarouselSplit;
    image_path: string;
    properties: Omit<Page, 'blocks'>
    background: string;
    hide_shadow?: boolean;
}

export default ({ block, image_path, properties, background, hide_shadow = false }: SplitCarouselProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [sectionVisible, hasAppeared] = useOnScreen(ref);

    const [index, setIndex] = useState(0);
    const next = () => setIndex(index => index + 1 === block.section_images.length ? 0 : index + 1);
    const last = () => setIndex(index => index - 1 === -1 ? block.section_images.length - 1 : index - 1);

    return (
        <div className={`flex flex-col items-center ${sectionVisible || hasAppeared ? 'animate-fade-in' : 'opacity-0'} ${block.split_type === 'text-left' ? `${properties.background} py-8` : ''} ${background}`} ref={ref}>
            <div className={`w-4/5 max-w-screen-xl flex ${block.split_type === 'text-left' ? 'flex-row' : 'flex-row-reverse'} gap-16`}>
                <div className="flex-1 gap-8 flex flex-col justify-center">
                    {block.section_title && <div className={`text-5xl font-bold ${block.split_type === 'text-left' ? 'text-white' : 'text-black'}`}>{block.section_title}</div>}
                    <div className={`text-lg ${block.split_type === 'text-left' ? 'text-white opacity-70' : 'text-grey'}`} dangerouslySetInnerHTML={{ __html: block.section_text }} />
                    <div>
                        {block.section_buttons?.length &&
                            block.section_buttons.map((button) => (
                                <div className="flex flex-row" key={button.link}>
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
                <div className="flex-1 flex flex-row items-center justify-center">
                    <i className="ri-arrow-left-s-line px-2 text-[42px] text-white cursor-pointer transition-all duration-300 hover:opacity-50" onClick={last} />
                    <div className="flex flex-col items-center w-full">
                        <img
                            className={`rounded-lg ${hide_shadow ? '' : 'shadow'}`}
                            src={image_path + block.section_images[index]}
                            alt={block.section_images[index]}
                        />
                        <Bullets index={index} num={block.section_images.length} className="mt-8" onClick={setIndex} />
                    </div>
                    <i className="ri-arrow-right-s-line px-2 text-[42px] text-white cursor-pointer transition-all duration-300 hover:opacity-50" onClick={next} />
                </div>
            </div>
        </div>
    );
};

function Bullets({ index, num, className, onClick }: { index: number, num: number, className?: string, onClick: (index: number) => void }) {
    const bullets = [];
    for (let i = 0; i < num; i++) {
        bullets.push(<div
            key={`bullet-${i}`}
            className={`w-4 h-4 rounded-full border-2 border-solid border-[white] ${index === i ?
                'bg-[white]' : 'bg-transparent'} ${className} cursor-pointer transition-all duration-300 hover:opacity-50`}
            onClick={() => onClick(i)}
        />);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '30%' }}>
            {bullets}
        </div>
    );
}