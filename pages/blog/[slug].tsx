import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import MarkdownPreview from "@/components/markdown-preview";

interface PostProps {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    description?: string;
  };
  content: string;
}

export default function Post({ frontmatter, content }: PostProps) {
  return (
    <>
      <Head>
        {frontmatter.description}
        <title>{frontmatter.title}</title>
        {frontmatter.description && (
          <meta name="description" content={frontmatter.description} />
        )}
      </Head>

      {/* <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200"> */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* ヘッダー部分 */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {frontmatter.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            {frontmatter.date && (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(frontmatter.date).toLocaleDateString()}
              </span>
            )}

            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        {/* <div className="" dangerouslySetInnerHTML={{ __html: content }} /> */}
        <MarkdownPreview content={content} />
      </article>
      {/* </div> */}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDir);

  return {
    paths: filenames.map((filename) => ({
      params: { slug: filename.replace(/\.md$/, "") },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(
    process.cwd(),
    "content/posts",
    `${params?.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Markdown → HTML変換 with enhanced plugins
  // const processedContent = await unified()
  //   .use(remarkParse)
  //   .use(remarkRehype)
  //   .use(rehypeSlug) // 見出しにIDを追加
  //   .use(rehypeAutolinkHeadings, {
  //     // 見出しにアンカーリンクを追加
  //     behavior: "wrap",
  //     properties: {
  //       className: ["heading-anchor"],
  //       ariaHidden: true,
  //     },
  //     content: {
  //       type: "element",
  //       tagName: "span",
  //       properties: {
  //         className: [
  //           "ml-2 opacity-0 group-hover:opacity-100",
  //           "text-blue-400 hover:text-blue-600",
  //           "transition-opacity duration-200",
  //           "text-lg font-mono",
  //         ],
  //       },
  //       children: [
  //         {
  //           type: "text",
  //           value: "#",
  //         },
  //       ],
  //     },
  //   })
  //   .use(rehypePrettyCode, {
  //     theme: "one-dark-pro",
  //     keepBackground: true,
  //     onVisitLine(node: any) {
  //       if (node.children.length === 0) {
  //         node.children = [{ type: "text", value: " " }];
  //       }
  //       node.properties.className = ["px-4 py-1 block"];
  //     },
  //     onVisitHighlightedLine(node: any) {
  //       // ハイライト行番号スタイル
  //       const lineNumber = node.properties["data-line"];
  //       if (lineNumber) {
  //         node.properties["data-line"] = {
  //           className: [
  //             "before:content-[attr(data-line)]",
  //             "before:text-blue-400/80",
  //             "before:font-mono",
  //             "before:text-sm",
  //           ],
  //         };
  //       }
  //     },
  //   })
  //   .use(rehypeStringify)
  //   .process(content);

  return {
    props: {
      frontmatter: data,
      // content: processedContent.toString(),
      content: content.toString(),
    },
  };
};
