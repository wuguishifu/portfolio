import { useState } from "react";
import { BlurhashCanvas } from "react-blurhash";

export default function LazyImage({ src, hash, alt }: { src: any, hash: string, alt: string }) {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return (
        <>
            <div style={{ display: imageLoaded ? 'none' : 'inline' }}>
                <BlurhashCanvas hash={hash} style={{ width: '100%' }} />
            </div>
            <img
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'inline' : 'none' }}
                src={src}
                alt={alt}
            />
        </>
    );
};