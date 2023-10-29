import { useEffect, useState } from 'react';
import { start, stop, resetCameraPosition, regenerate } from './planets';
import { Helmet } from 'react-helmet-async';

export default function PlanetExample() {
    const [seed, setSeed] = useState(Math.random().toString());

    useEffect(() => {
        start(seed);
        return () => stop();
    }, []);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        regenerate(seed);
    };

    const handleRandom = () => {
        const seed = Math.random().toString();
        setSeed(seed);
        regenerate(seed);
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
                        <h1 className='text-5xl font-bold animate-fade-in fill-mode-both'>Planet Example</h1>
                        <p className='text-lg text-grey animate-fade-in fill-mode-both animation-delay-200'>This is a planet example.</p>
                        <div className='flex flex-row'>
                            <div className='flex flex-col gap-4'>
                                <button
                                    className='text-blue bg-white cursor-pointer text-[1.2em] animate-fade-in animation-delay-400 fill-mode-both font-normal transition-all duration-[0.5s] mt-[1em] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-blue hover:bg-blue hover:text-white'
                                    onClick={resetCameraPosition}
                                >Reset Camera Position</button>
                                <form onSubmit={handleFormSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Enter seed..."
                                        className="bg-white border-2 border-blue rounded-[0.5em] px-4 py-2 outline-none text-black w-full animate-fade-in animation-delay-600 fill-mode-both"
                                        value={seed}
                                        onChange={e => setSeed(e.target.value)}
                                    />
                                </form>
                                <button
                                    className='text-blue bg-white cursor-pointer text-[1.2em] animate-fade-in animation-delay-400 fill-mode-both font-normal transition-all duration-[0.5s] px-[1.1em] py-[0.3em] rounded-[0.5em] border-2 border-solid border-blue hover:bg-blue hover:text-white'
                                    onClick={handleRandom}
                                >Randomize</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};