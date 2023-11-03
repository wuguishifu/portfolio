import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { blogs } from ".";
import Error from "../pages/Error";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import { Helmet } from "react-helmet-async";

export function Blog() {
    const { blog = '' } = useParams();
    if (!blog?.length || !blogs[blog]) return <Error />;

    return (
        <div className="gap-8 flex flex-col py-20 items-center">
            <Helmet>
                <title>Bo | {blogs[blog].title}</title>
            </Helmet>
            <div className="max-w-screen-lg w-4/5">
                <Markdown
                    remarkPlugins={[rehypeHighlight, remarkGfm, supersub]}
                    components={{
                        img: ({ node, ...props }) => <div className="w-full flex flex-row justify-center"><img {...props} className="w-2/3" /></div>,
                        table: ({ node, ...props }) => <div className="w-full flex flex-row justify-center"><table {...props} className="w-1/2" /></div>,
                    }}
                >{blogs[blog].data}</Markdown>
            </div>
        </div>
    );
}