import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { components } from "@/components/mdxComponents";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((file) => ({
    params: { slug: file.replace(".mdx", "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const filepath = path.join("posts", `${params.slug}.mdx`);
  const mdxSource = fs.readFileSync(filepath, "utf-8");
  const { content, data } = matter(mdxSource);
  const source = await serialize(content);
  return { props: { source, frontMatter: data } };
}

export default function PostPage({ source, frontMatter }: any) {
  return (
    // <article className="prose">
    <MDXRemote {...source} components={components} />
    // </article>
  );
}
