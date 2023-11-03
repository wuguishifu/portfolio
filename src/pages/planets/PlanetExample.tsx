import { useEffect, useState } from 'react';
import { start, stop, resetCameraPosition, regenerate, toggleAtmosphere } from './planets';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

export default function PlanetExample() {
    const { seed = '' } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(atob(seed));

    useEffect(() => {
        start(btoa(seed));
        return () => stop();
    }, []);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/planets/${btoa(value)}`, { replace: true });
        regenerate(btoa(value));
    };

    const handleRandom = () => {
        const seed = Math.random().toString();
        navigate(`/planets/${btoa(seed)}`, { replace: true });
        regenerate(btoa(seed));
        setValue(seed);
    }

    return (
        <div className='gap-8 flex flex-col py-20'>
            <Helmet>
                <title>Bo | Planets</title>
            </Helmet>
            <div className='flex flex-col items-center'>
                <div className='w-4/5 max-w-screen-xl flex flex-row gap-16'>
                    <canvas id="canvas" width={1920} height={1080} className='w-1/2 bg-black' style={{ aspectRatio: 1 }} />
                    <div className='flex-1 gap-8 flex flex-col justify-center'>
                        <div className='text-5xl font-bold animate-fade-in fill-mode-both'>Planet Example</div>
                        <div className='text-lg text-grey animate-fade-in fill-mode-both animation-delay-200'>On this page, I have ported my Java + OpenGL code to TypeScript + WebGL. The camera is an arcball, meaning you can rotate the entire universe by dragging with your cursor, and you can zoom in and out with your scroll bar. The seed can be any string, and a specific seed will always generate the same planet and atmosphere.</div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col gap-4'>
                                <button
                                    className='text-blue bg-white cursor-pointer text-[1.2em] animate-fade-in animation-delay-400 fill-mode-both font-normal transition-all duration-[0.5s] mt-[1em] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-blue hover:bg-blue hover:text-white'
                                    onClick={resetCameraPosition}
                                >Reset Camera Position</button>
                                <form onSubmit={handleFormSubmit} className='flex flex-row items-center gap-4 animate-fade-in animation-delay-600 fill-mode-both'>
                                    <input
                                        type="text"
                                        placeholder="Enter seed..."
                                        className="bg-white border-2 border-blue rounded-[0.5em] px-4 py-2 outline-none text-black w-full"
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                    /><p className='text-[1.2em] text-blue'>seed</p>
                                </form>
                                <button
                                    className='text-blue bg-white cursor-pointer text-[1.2em] animate-fade-in animation-delay-800 fill-mode-both font-normal transition-all duration-[0.5s] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-blue hover:bg-blue hover:text-white'
                                    onClick={handleRandom}
                                >Randomize</button>
                                <button
                                    className='text-blue bg-white cursor-pointer text-[1.2em] animate-fade-in animation-delay-1000 fill-mode-both font-normal transition-all duration-[0.5s] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-blue hover:bg-blue hover:text-white'
                                    onClick={toggleAtmosphere}
                                >Toggle Atmosphere</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};