import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import MarkdownPreview from "@/components/markdown-preview";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface PostProps {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    description?: string;
  };
  content: string;
  slug: string;
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
  const slug = params?.slug as string;
  const filePath = path.join(
    process.cwd(),
    "content/posts",
    `${params?.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      frontmatter: data,
      content: content.toString(),
      slug,
    },
  };
};

export default function Post({ frontmatter, content, slug }: PostProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>

        {frontmatter.description && (
          <meta name="description" content={frontmatter.description} />
        )}

        <meta property="og:image" content={`${siteUrl}/ogp/${slug}.png`} />
      </Head>

      <main className="min-h-screen from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex justify-center px-4 sm:px-6 lg:px-8">
        <article className="w-full max-w-3xl py-12">
          {/* ヘッダー部分 */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {frontmatter.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-3 text-gray-600 dark:text-gray-400 text-sm mb-6 text-center">
              {frontmatter.date && (
                <span className="flex items-center justify-center gap-1">
                  <svg
                    className="w-5 h-5"
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

              {frontmatter.tags?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* コンテンツ部分 */}
          <section className="prose dark:prose-invert prose-lg max-w-none">
            <MarkdownPreview content={content} />
          </section>
        </article>
      </main>
    </>
  );
}
