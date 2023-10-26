import { useParams } from "react-router-dom";
import Carousel from "../components/blocks/Carousel";
import Split from "../components/blocks/Split";
import Text from "../components/blocks/Text";
import quickCodes from '../quick-codes';
import { BlockCarousel, BlockSplit, BlockText, Page } from "../quick-codes/page";
import Error from './Error';
import { Helmet } from "react-helmet-async";

export default function QuickCode() {
    const { quickCode = '' } = useParams();
    if (!quickCode?.length || !quickCodes[quickCode]) return <Error />

    return (
        <div className="gap-8 flex flex-col py-20">
            <Helmet>
                <title>Bo | {quickCodes[quickCode].title}</title>
            </Helmet>
            {quickCodes[quickCode].blocks.map((block, index) =>
                <Block block={block} key={`block-${index}`} properties={quickCodes[quickCode]} />
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
        default: return <pre>{JSON.stringify(block, null, 2)}</pre>
    }
}