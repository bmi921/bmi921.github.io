import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import crypto from "crypto";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const OGP_DIR = path.join(process.cwd(), "public/ogp");

// ハッシュ化関数
function generateHashFilename(url: string): string {
  // 1. URLをハッシュ化（MD5やSHA-1など）
  const hash = crypto.createHash("md5").update(url).digest("hex");
  // 2. 拡張子を追加
  return `${hash}.jpg`;
}

function getAllMarkdownFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file));
}

function extractLinksFromMarkdown(content: string): string[] {
  const linkRegex = /\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
  const links: string[] = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

async function fetchOgpImageUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {});
    const html = await res.text();
    const $ = cheerio.load(html);
    return $('meta[property="og:image"]').attr("content") || null;
  } catch (e) {
    console.warn(`❌ OGP取得失敗: ${url}`);
    return null;
  }
}

async function downloadImage(
  imageUrl: string,
  filepath: string
): Promise<void> {
  try {
    const res = await fetch(imageUrl);
    const buffer = await res.buffer();
    fs.writeFileSync(filepath, buffer);
  } catch (e) {
    console.warn(`❌ 画像保存失敗: ${imageUrl}`);
  }
}

export async function fetchOgps() {
  if (!fs.existsSync(OGP_DIR)) {
    fs.mkdirSync(OGP_DIR, { recursive: true });
  }

  const files = getAllMarkdownFiles(POSTS_DIR);
  const links = new Set<string>();

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    extractLinksFromMarkdown(content).forEach((url) => links.add(url));
  }

  for (const link of links) {
    // const filename = encodeURIComponent(link) + ".jpg";
    const filename = generateHashFilename(link); // 新方式
    const filepath = path.join(OGP_DIR, filename);

    if (fs.existsSync(filepath)) continue;

    const ogpImageUrl = await fetchOgpImageUrl(link);
    if (ogpImageUrl) {
      await downloadImage(ogpImageUrl, filepath);
      console.log(`✅ OGP画像保存: ${link}`);
    } else {
      console.warn(`⚠️ OGP画像なし: ${link}`);
    }
  }
}

// 単体で実行されたとき用
if (require.main === module) {
  fetchOgps().catch((err) => {
    console.error("❌ OGP取得エラー:", err);
    process.exit(1);
  });
}
