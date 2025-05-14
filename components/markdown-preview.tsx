import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={
          {
            // pre(props) {
            //   const { node, ...rest } = props;
            //   return <pre className="bg-green-200" {...rest} />;
            // },
            // a(props) {
            //   const { node, ...rest } = props;
            //   return <a className="bg-green-200" {...rest} />;
            // },
          }
        }
      >
        {content}
      </Markdown>
    </div>
  );
}
