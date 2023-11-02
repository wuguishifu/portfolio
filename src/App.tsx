import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Error from './pages/Error';
import QuickCodes from './pages/QuickCodes';
import Project from './pages/Project';
import Projects from './pages/Projects';
import QuickCode from './pages/QuickCode';
import PlanetExample from './pages/planets/PlanetExample';
import { useEffect } from 'react';

export default function App() {
    import.meta.glob('/assets/*/*/*/*/*/*/*', { eager: true })

    const location = useLocation();
    useEffect(() => {
        document.querySelector('body')?.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Wrapper />}>
                <Route index element={<Landing />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='quick-codes'>
                    <Route index element={<QuickCodes />} />
                    <Route path=':quickCode' element={<QuickCode />} />
                </Route>
                <Route path='projects'>
                    <Route index element={<Projects />} />
                    <Route path=':project' element={<Project />} />
                </Route>
                <Route path='planets/:seed' element={<PlanetExample />} />
                <Route path='planets' element={<PlanetExample />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
};

function Wrapper() {
    const location = useLocation();
    return (
        <div className="flex flex-col h-screen py-0 relative">
            <div className="absolute z-100 items-center w-screen flex flex-row justify-center left-0 top-0">
                <div className="w-full flex flex-row items-center px-8 py-5">
                    <Link to="/" className="font-extrabold text-black text-[32px] leading-10 transition-all duration-[0.5s] hover:text-blue cursor-pointer">Bo Bramer</Link>
                    <div className="flex-1" />
                    {(location.pathname !== '/') && <Link to="/" className="font-normal text-base leading-4 text-grey transitionall duration-[0.3s] ml-5 hover:text-black cursor-pointer">Home</Link>}
                    <Link to={'/about'} className="font-normal text-base leading-4 text-grey transition-all duration-[0.3s] ml-5 hover:text-black cursor-pointer">About</Link>
                    <Link to={'/projects'} className="font-normal text-base leading-4 text-grey transition-all duration-[0.3s] ml-5 hover:text-black cursor-pointer">Projects</Link>
                    <Link to={'/quick-codes'} className="font-normal text-base leading-4 text-grey transition-all duration-[0.3s] ml-5 hover:text-black cursor-pointer">Quick Codes</Link>
                    <Link to={'/contact'} className="font-normal text-base leading-4 text-grey transition-all duration-[0.3s] ml-5 hover:text-black cursor-pointer">Contact</Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}