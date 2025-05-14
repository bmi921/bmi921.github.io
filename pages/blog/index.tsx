import fs from "fs";
import path from "path";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Topページのprops定義
export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDir);

  const slugs = filenames
    .filter((file) => file.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));

  return {
    props: {
      slugs,
    },
  };
}

export default function Blog({ slugs }: { slugs: string[] }) {
  return (
    <main className={`${geistSans.variable} font-sans p-6`}>
      <a href="/">Home</a>
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
      <ul className="list-disc pl-4 space-y-2">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`} className="text-blue-600 underline">
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
