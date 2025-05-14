import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import path from "path";
import { NotionPage } from "@/types/notion";

export class NotionExporter {
  [x: string]: any;
  private notion: Client;
  private n2m: NotionToMarkdown;

  constructor() {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Missing Notion environment variables");
    }

    this.notion = new Client({ auth: process.env.NOTION_API_KEY });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
  }

  public async exportToMarkdown(outputDir: string): Promise<NotionPage[]> {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const response = await this.notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const exportedPages: NotionPage[] = [];

    for (const page of response.results) {
      if (!("properties" in page)) continue;

      const pageId = page.id;
      const properties = page.properties;

      // 型ガード付きのプロパティ取得
      const title = this.getTitle(properties.Title || properties.title);
      const slug = this.getRichText(properties.Slug || properties.slug);
      const date = this.getDate(properties.Date || properties.date);
      const tags = this.getMultiSelect(properties.Tags || properties.tags);

      if (!title || !slug || !date) {
        console.warn(`Skipping page ${pageId} due to missing required fields`);
        continue;
      }

      // Markdownコンテンツの取得
      const mdBlocks = await this.n2m.pageToMarkdown(pageId);
      const mdResult = this.n2m.toMarkdownString(mdBlocks);
      const mdString =
        typeof mdResult === "string"
          ? mdResult
          : (mdResult as { parent: string }).parent;

      // Frontmatterの生成
      const frontmatter = this.generateFrontmatter({
        title,
        slug,
        date,
        tags,
      });

      // ファイル保存
      const outputPath = path.join(outputDir, `${slug}.md`);
      fs.writeFileSync(outputPath, frontmatter + mdString);

      exportedPages.push({ id: pageId, title, slug, date, tags });
    }

    return exportedPages;
  }

  // ヘルパーメソッド
  private getTitle(prop: any): string | null {
    return prop?.title?.[0]?.plain_text || null;
  }

  private getRichText(prop: any): string | null {
    return prop?.rich_text?.[0]?.plain_text || null;
  }

  private getDate(prop: any): string | null {
    return prop?.date?.start || null;
  }

  private getMultiSelect(prop: any): string[] {
    return prop?.multi_select?.map((item: any) => item.name) || [];
  }

  private generateFrontmatter(params: {
    title: string;
    slug: string;
    date: string;
    tags: string[];
  }): string {
    return `---
title: "${params.title}"
slug: "${params.slug}"
date: "${params.date}"
tags: ${JSON.stringify(params.tags)}
---\n\n`;
  }
}

const CACHE_FILE = path.join(process.cwd(), ".notion-cache.json");

async function getCache() {
  return fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"))
    : null;
}

async function saveCache(data: any) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data));
}
