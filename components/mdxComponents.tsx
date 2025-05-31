import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-7" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4" {...props} />,
  code: ({ className, children }: any) => {
    const language = className?.replace("language-", "") || "text";
    return (
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {String(children).trim()}
      </SyntaxHighlighter>
    );
  },
};
