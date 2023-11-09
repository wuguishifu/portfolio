import { useParams } from "react-router-dom";
import Carousel from "../components/blocks/Carousel";
import Split from "../components/blocks/Split";
import Text from "../components/blocks/Text";
import projects from '.';
import { BlockCarousel, BlockCarouselSplit, BlockSplit, BlockText, Page } from "./page";
import Error from '../pages/Error';
import { Helmet } from "react-helmet-async";
import SplitCarousel from "../components/blocks/SplitCarousel";

export default function Project() {
    const { project = '' } = useParams();
    if (!project?.length || !projects[project]) return <Error />

    return (
        <div className="gap-8 flex flex-col py-20">
            <Helmet>
                <title>Bo | {projects[project].title}</title>
            </Helmet>
            {projects[project].blocks.map((block, index) =>
                <Block block={block} key={`block-${index}`} properties={projects[project]} />
            )}
        </div>
    );
};

interface BlockProps {
    block: Page['blocks'][0];
    properties: Omit<Page, 'blocks'>
}

function Block(props: BlockProps) {
    const { block, properties } = props;

    switch (block.type) {
        case 'carousel':
            return <Carousel block={block as BlockCarousel} image_path={properties.image_path} background={properties.background} hide_shadow={properties.hide_shadow} />;
        case 'text':
            return <Text block={block as BlockText} />;
        case 'split':
            return <Split block={block as BlockSplit} image_path={properties.image_path} properties={properties} />;
        case 'split_carousel':
            return <SplitCarousel block={block as BlockCarouselSplit} image_path={properties.image_path} properties={properties} background={properties.background} hide_shadow={properties.hide_shadow} />;
        default: return <pre>{JSON.stringify(block, null, 2)}</pre>
    }
}