import { Helmet } from "react-helmet-async";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import { blogs } from ".";
import Error from "../pages/Error";

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
                        img: ({ node, ...props }) => <img {...props} className="w-2/3 mx-auto" />,
                        table: ({ node, ...props }) => <div className="w-full flex flex-row justify-center"><table {...props} className="w-1/2" /></div>,
                        a: ({ node, ...props }) => <a {...props} target="_blank" className="text-blue hover:underline" />,
                        ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside text-grey" />,
                        ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-inside text-grey" />,
                        pre: ({ node, ...props }) => <pre {...props} className="bg-lightGrey p-4 rounded-md" />,
                    }}
                >{blogs[blog].data}</Markdown>
            </div>
        </div>
    );
}