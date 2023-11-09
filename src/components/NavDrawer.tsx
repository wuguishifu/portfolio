import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import Chibi from '../assets/chibi/chibi-reflected.png';

export default function NavDrawer({ show }: { show: boolean }) {
    const translate = useSpring({ right: show ? window.innerWidth - 250 : window.innerWidth });
    const opacity = useSpring({ opacity: show ? 1 : 0 });

    return (
        <>
            <animated.div style={opacity} className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 pointer-events-none" />
            <animated.div style={translate} className='flex flex-col gap-6 pt-4 px-4 bg-white w-[250px] h-full absolute z-50'>
                <Link to="/" className="font-bold text-3xl leading-4 text-black transitionall duration-[0.3s] hover:text-grey cursor-pointer">Bo Bramer</Link>
                <Link to={'/about'} className="font-normal text-2xl leading-4 text-black transition-all duration-[0.3s] hover:text-grey cursor-pointer">About <i className="ri-external-link-line" /></Link>
                <Link to={'/projects'} className="font-normal text-2xl leading-4 text-black transition-all duration-[0.3s] hover:text-grey cursor-pointer">Projects <i className="ri-external-link-line" /></Link>
                <Link to={'/quick-codes'} className="font-normal text-2xl leading-4 text-black transition-all duration-[0.3s] hover:text-grey cursor-pointer">Quick Codes <i className="ri-external-link-line" /></Link>
                <div className="flex-1" />
                <img src={Chibi} className="bottom-0" alt="chibi bo" />
            </animated.div>
        </>
    );
};