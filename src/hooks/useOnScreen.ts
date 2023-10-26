import {RefObject, useEffect, useMemo, useState} from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {

    const [isIntersecting, setIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);

    useEffect(() => {
        if (isIntersecting) setHasIntersected(true);
    }, [isIntersecting]);

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        {threshold: 0.3}
    ), [ref]);


    useEffect(() => {
        // @ts-ignore
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [])

    return [isIntersecting, hasIntersected];
}