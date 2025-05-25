import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const insertLineBreaks = (text: string, maxCharsPerLine: number): string => {
  const result = [];
  for (let i = 0; i < text.length; i += maxCharsPerLine) {
    result.push(text.slice(i, i + maxCharsPerLine));
  }
  return result.join("\n");
};

const generateOGP = async (title: string, slug: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const templatePath = path.join(__dirname, "../public/template.svg");
  console.log(templatePath);
  const rawSVG = fs.readFileSync(templatePath, "utf-8");

  const escapedTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const formattedTitle = insertLineBreaks(escapedTitle, 12);

  const svgWithTitle = rawSVG.replace("{{article_title}}", formattedTitle);

  const svgDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgWithTitle
  )}`;

  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(svgDataURI);

  const outputPath = path.join(__dirname, `../public/ogp/posts/${slug}.png`);
  await page.screenshot({ path: outputPath as `${string}.png` });

  await browser.close();

  console.log(`✅ 画像を生成しました: ${outputPath}`);
};

generateOGP("OGP画像を生成するTypeScriptで改行もサポート", "sakai-ex");
