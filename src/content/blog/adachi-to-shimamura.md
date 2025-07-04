---
title: '幸せというにしては不幸だが、不幸というにしては幸せだ'
description: 'なる'
pubDate: '2024-07-03'
# heroImage: '../../assets/adachi-to-shimamura-1.jpg'
---

## 安達としまむら

安達としまむらが好きだ。安達としまむらとは、

- なんで好きなの？
- わからない

```javascript
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

export const collections = { blog };
```

`javascript`は`typescript`のかたなしバージョン
