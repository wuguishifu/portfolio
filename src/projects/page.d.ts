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
    type: string;
    split_type: "text-right" | "text-left"
    section_title: string;
    section_text: string;
    section_image: string;
    force_show_shadow?: boolean;
    section_button?: {
        text: string;
        link: string;
    }
}

export type BlockText = {
    type: string;
    section_text: string;
}

export type BlockCarousel = {
    type: string;
    images: string[];
};