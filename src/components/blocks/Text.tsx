import { useRef } from "react";
import { BlockText } from "../../projects/page";
import useOnScreen from "../../hooks/useOnScreen";

type TextProps = {
    block: BlockText;
}

export default ({ block }: TextProps) => {

    const ref = useRef<HTMLDivElement>(null);
    const [sectionVisible, hasAppeared] = useOnScreen(ref);

    return (
        <div className={`flex flex-col items-center ${sectionVisible || hasAppeared ? 'animate-fade-in' : 'opacity-0'}`} ref={ref}>
            <div className="w-4/5 max-w-screen-xl flex flex-row">
                <p className="text-lg text-grey" dangerouslySetInnerHTML={{ __html: block.section_text }} />
            </div>
        </div>
    );
};