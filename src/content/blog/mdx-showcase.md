---
title: 'Markdown Showcase'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: 'Jun 19 2024'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

このページは、`global.css`で定義されたスタイルが、MDX（Markdown）コンテンツにどのように適用されるかを示すためのショーケースです。

## 見出し (Headings)

h1からh6までの見出しです。h1は`gradient-text`クラスが自動的に適用されます。h2には下線が表示されます。

# これがH1見出しです

## これがH2見出しです

### これがH3見出しです

#### これがH4見出しです

##### これがH5見出しです

###### これがH6見出しです

---

## 段落とリンク

これは通常の段落(pタグ)です。テキストの色や行間が適切に設定されています。この文章は、テキストが長くなった場合にどのように折り返されるかを示すためのダミーテキストです。Lorem ipsum dolor sit amet, consectetur adipiscing elit.

文章中には[Astroの公式サイト](https://astro.build)のようなリンク(aタグ)を埋め込むことができます。ホバーすると下線が表示されます。

---

## インライン要素

段落の中には、さまざまなインライン要素を配置できます。

インラインでコードを記述する場合は `const a = 1;` のように `code` タグを使います。
キーボードの入力を示すには <kbd>Ctrl</kbd> + <kbd>C</kbd> のように `kbd` タグが便利です。
文章の一部を<mark>ハイライト</mark>したい場合は `mark` タグが使えます。
<abbr title="HyperText Markup Language">HTML</abbr>のような略語には `abbr` タグで正式名称をツールチップ表示できます。

---

## 引用 (Blockquote)

> The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.  
> — <cite>Bill Gates</cite>

---

## リスト (Lists)

### 番号付きリスト (Ordered List)

1.  最初のアイテム
2.  二番目のアイテム
3.  三番目のアイテム

### 箇条書きリスト (Unordered List)

- リンゴ
- オレンジ
- バナナ

### ネストしたリスト (Nested List)

- 飲み物
  - コーヒー
  - 紅茶
    - アールグレイ
    - ダージリン
- 食べ物
  - パン
  - チーズ

---

## テーブル (Table)

| ヘッダー1 | ヘッダー2   | ヘッダー3   |
| --------- | ----------- | ----------- |
| セル1-1   | セル1-2     | セル1-3     |
| セル2-1   | セ\_ル\_2-2 | **セル2-3** |
| セル3-1   | `セル3-2`   | セル3-3     |

---

## コードブロック (Code Block)

以下はJavaScriptのコードブロックの例です。シンタックスハイライトが適用されます。

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetch successful:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData('[https://api.example.com/data](https://api.example.com/data)');
```
