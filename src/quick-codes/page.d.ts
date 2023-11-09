export type Page = {
    background: string;
    title: string;
    meta: string;
    image_path: string;
    hide_shadow?: boolean;
    blocks: {
        type: string;
    }[];
};

export type BlockSplit = {
    type: 'block';
    split_type: 'text-right' | 'text-left'
    section_title: string;
    section_text: string;
    section_image: string;
    force_show_shadow?: boolean;
    section_buttons?: {
        text: string;
        link: string;
    }[]
}

export type BlockText = {
    type: 'text';
    section_text: string;
}

export type BlockCarousel = {
    type: 'carousel';
    images: string[];
};

export type BlockCarouselSplit = {
    type: 'split_carousel';
    split_type: 'text-right' | 'text-left'
    section_title: string;
    section_text: string;
    section_image: string;
    force_show_shadow?: boolean;
    section_buttons?: {
        text: string;
        link: string;
    }[]
}