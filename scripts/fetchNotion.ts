import { NotionExporter } from "../lib/notionToMarkdown";
import fs from "fs";
import path from "path";
import { fetchOgps } from "./fetchOgps";
import { generateOgpData } from "./ogp-generator";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });

const OUTPUT_DIR = path.join(process.cwd(), "content/posts");

function prepareDirectory() {
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function main() {
  prepareDirectory();
  const exporter = new NotionExporter();
  await exporter.exportToMarkdown(OUTPUT_DIR);
  console.log("✅Complete to export Notion data as Markdown file!");

  // await fetchOgps();
  // console.log("✅ OGP画像取得完了");

  // await generateOgpData();
  // console.log("✅ OGPデータ取得完了");
}

main().catch((err) => {
  console.error("❌Error occured:", err);
  process.exit(1);
});
