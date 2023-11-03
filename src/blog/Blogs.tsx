import { Helmet } from "react-helmet-async";
import { blogs } from './index';
import { Link } from "react-router-dom";

export function Blogs() {
    return (
        <div>
            <Helmet>
                <title>Bo | Blogs</title>
            </Helmet>
            <div className="py-20 w-full flex flex-col items-center">
                <div className="text-7xl font-bold animate-fade-in fill-mode-both">Blog</div>
                <div className="text-2xl text-grey opacity-70 text-center mt-2 animate-fade-in fill-mode-both animation-delay-200 px-40">Posts about fun projects, issues I encounter, and anything else engineering related.</div>
                <div className="gap-8 flex flex-col items-center w-4/5 max-w-screen-xl pt-10">
                    {Object.values(blogs).map((blog, index) => <BlogRow blog={blog} key={index} style={{ animationDelay: `${(index + 2) * 200}ms` }} />)}
                </div>
            </div>
        </div>
    );
}

function BlogRow({ blog, style }: { blog: any, style?: React.CSSProperties }) {
    return (
        <Link className={`flex flex-col p-8 gap-4 rounded-xl bg-lightGrey items-center animate-fade-in fill-mode-both w-1/3`} to={`/blog/${blog.slug}`} style={style}>
            <img
                className={`rounded-lg h-full aspect-auto`}
                src={`/blog/${blog.image}`}
                alt={blog.image}
            />
            {blog.title && <div className="text-4xl font-bold text-black">{blog.title} <i className="ri-external-link-line" /></div>}
            <div className="text-lg text-black opacity-70">{blog.blurb}</div>
        </Link>
    );
}