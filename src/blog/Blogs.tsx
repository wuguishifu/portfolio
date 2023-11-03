import { Helmet } from "react-helmet-async";
import { blogs } from './index';
import { Link } from "react-router-dom";
import Masonry from 'react-responsive-masonry';

export function Blogs() {
    return (
        <div>
            <Helmet>
                <title>Bo | Blogs</title>
            </Helmet>
            <div className="py-20 w-full flex flex-col items-center">
                <div className="text-7xl font-bold animate-fade-in fill-mode-both">Blog</div>
                <div className="text-2xl text-grey opacity-70 text-center mt-2 animate-fade-in fill-mode-both animation-delay-200 px-40">Posts about fun projects, issues I encounter, and anything else engineering related.</div>
                <div className="gap-8 flex flex-row items-center w-4/5 max-w-screen-xl pt-10">
                    <Masonry gutter="32px">
                        {Object.values(blogs).map((blog, index) => <BlogRow blog={blog} key={index} reverse={Math.random() < 0.5} style={{ animationDelay: `${(index / 3 + 2) * 200}ms` }} />)}
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

function BlogRow({ blog, style, reverse }: { blog: any, style?: React.CSSProperties, reverse: boolean }) {
    return (
        <Link className={`flex ${reverse ? 'flex-col-reverse' : 'flex-col'} p-8 gap-4 rounded-xl bg-lightGrey items-center animate-fade-in fill-mode-both w-full`} to={`/blog/${blog.slug}`} style={style}>
            <img
                className={`rounded-lg h-full aspect-auto`}
                src={`/blog/${blog.image}`}
                alt={blog.image}
            />
            <div className="flex-col gap-4 flex">
                {blog.title && <div className="text-4xl font-bold text-black hover:text-blue">{blog.title} <i className="ri-external-link-line" /></div>}
                <div className="text-lg text-black opacity-70">{blog.blurb}</div>
            </div>
        </Link>
    );
}