import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import crypto from "crypto";

type OGPData = {
  url: string;
  title: string;
  description: string;
  image: string;
  domain: string;
};

// ハッシュ化関数
function generateHashFilename(url: string): string {
  // 1. URLをハッシュ化（MD5やSHA-1など）
  const hash = crypto.createHash("md5").update(url).digest("hex");
  // 2. 拡張子を追加
  return `${hash}`;
}

export async function generateOgpData(): Promise<void> {
  const POSTS_DIR = path.join(process.cwd(), "content/posts");
  const OGP_DIR = path.join(process.cwd(), "public/ogp");
  const OGP_JSON_PATH = path.join(process.cwd(), "public/ogp-data.json");

  // 既存データの読み込み
  let existingData: Record<string, OGPData> = {};
  if (fs.existsSync(OGP_JSON_PATH)) {
    existingData = JSON.parse(fs.readFileSync(OGP_JSON_PATH, "utf-8"));
  }

  // Markdownからリンクを抽出
  const extractLinks = (content: string): string[] => {
    const regex = /\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
    return [...content.matchAll(regex)].map((m) => m[1]);
  };

  // OGPデータを取得
  const fetchOgp = async (url: string): Promise<OGPData> => {
    const cached = existingData[url];
    if (cached) return cached;

    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);

      const getMeta = (prop: string) =>
        $(`meta[property="og:${prop}"]`).attr("content") ||
        $(`meta[name="${prop}"]`).attr("content");

      const domain = new URL(url).hostname.replace("www.", "");
      const imageUrl = getMeta("image");

      // 画像を保存
      if (imageUrl) {
        const imageName = generateHashFilename(domain) + ".jpg";
        // const imageName = `${domain}-${Date.now()}.jpg`;
        const imagePath = path.join(OGP_DIR, imageName);
        const imageRes = await fetch(imageUrl);
        const buffer = await imageRes.buffer();
        fs.writeFileSync(imagePath, buffer);
      }

      return {
        url,
        title: getMeta("title") || $("title").text() || domain,
        description: getMeta("description") || "",
        image: imageUrl
          ? `/ogp/${generateHashFilename(domain)}.jpg`
          : "/default-ogp.jpg",
        domain,
      };
    } catch (error) {
      console.error(`Failed to fetch OGP for ${url}:`, error);
      return {
        url,
        title: url,
        description: "",
        image: "/default-ogp.jpg",
        domain: new URL(url).hostname,
      };
    }
  };

  // 全投稿を処理
  const posts = fs.readdirSync(POSTS_DIR);
  const allLinks = new Set<string>();

  for (const post of posts) {
    const content = fs.readFileSync(path.join(POSTS_DIR, post), "utf-8");
    extractLinks(content).forEach((link) => allLinks.add(link));
  }

  // OGPデータを収集
  const ogpResults: Record<string, OGPData> = {};
  for (const link of Array.from(allLinks)) {
    ogpResults[link] = await fetchOgp(link);
  }

  // 結果を保存
  fs.writeFileSync(OGP_JSON_PATH, JSON.stringify(ogpResults, null, 2));
  console.log("✅OGP data generated successfully!");
}
