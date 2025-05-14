// types/notion.d.ts
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export interface NotionPage {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
}

export interface NotionToMarkdownOptions {
  notionClient: Client;
}

declare module "notion-to-md" {
  export class NotionToMarkdown {
    constructor(options: NotionToMarkdownOptions);
    pageToMarkdown(pageId: string): Promise<any>;
    toMarkdownString(mdBlocks: any): string;
  }
}
