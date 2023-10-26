import { useRef, useState } from "react";
import 'remixicon/fonts/remixicon.css';
import useOnScreen from "../../hooks/useOnScreen";
import { BlockCarousel } from "../../projects/page";

type CarouselProps = {
    block: BlockCarousel;
    image_path: string;
    background: string;
}

export default ({ block, image_path, background }: CarouselProps) => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex(index => index + 1 === block.images.length ? 0 : index + 1);
    const last = () => setIndex(index => index - 1 === -1 ? block.images.length - 1 : index - 1);

    const ref = useRef<HTMLDivElement>(null);
    const [sectionVisible, hasAppeared] = useOnScreen(ref);

    return (
        <div className={`flex flex-col items-center ${background} py-8 ${sectionVisible || hasAppeared ? 'animate-fade-in' : 'opacity-0'}`} ref={ref}>
            <div className="w-1/2 flex flex-row items-center justify-center">
                <i className="ri-arrow-left-s-line px-8 text-[42px] text-white cursor-pointer transition-all duration-300 hover:opacity-50" onClick={last} />
                <div className="flex flex-col items-center w-[75%]">
                    <img
                        className="shadow rounded-lg"
                        src={image_path + block.images[index]}
                        alt={block.images[index]}
                    />
                    <Bullets index={index} num={block.images.length} className="mt-8" onClick={setIndex} />
                </div>
                <i className="ri-arrow-right-s-line px-8 text-[42px] text-white cursor-pointer transition-all duration-300 hover:opacity-50" onClick={next} />
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