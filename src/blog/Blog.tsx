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
            <div className="max-w-screen-xl w-4/5">
                <Markdown remarkPlugins={[rehypeHighlight, remarkGfm, supersub]}>{blogs[blog].data}</Markdown>
            </div>
        </div>
    );
}