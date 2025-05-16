import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { OgpCard } from "./ogpCard";

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="w-full h-full px-4 md:px-0 py-6 md:py-10 overflow-auto">
      <div className="prose dark:prose-invert w-full max-w-none text-black">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeHighlight, rehypeKatex]}
          components={{
            pre(props) {
              const { node, ...rest } = props;
              return <pre className="bg-[#0D1117]" {...rest} />;
            },
            a({ href, children }) {
              if (!href) return <>{children}</>;
              if (href.startsWith("http")) {
                return <OgpCard href={href} />;
              }
              return <a href={href}>{children}</a>;
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}
