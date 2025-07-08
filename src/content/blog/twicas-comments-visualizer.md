---
title: 'ツイキャス大手配信者のコメント欄をワードクラウドで可視化してみた'
description: 'ツイキャスで大手配信者のコメント欄をワードクラウドで可視化しました。個人的に面白い配信かどうかを見分けるツールが作りたかったためです。使用技術は、janome,python, wordcloudなど。'
pubDate: '2023-07-12'
# heroImage: '../../assets/blog-placeholder-1.jpg'
---

# 1. 何がしたいの？

私はよくツイキャス配信をみますが、大手配信者のコメント欄の内容の薄さというか、特に男性ASMR配信者が雑談する時に肯定の「うん」「w」みたいなシャワーコメントしか流れないのがあまり好きじゃないです。というのも、個人的な意見ですが配信は双方向コミュニティーで面白くなっていくものなのに肯定だけで満足できるリスナーが嫌です。大手で多数の人のための配信だから仕方ないかもしれませんが....

というわけで、個人的には「どれぐらい肯定コメントがあるのか＝つまらない」だと勝手に考えているのでワードクラウドでコメント欄を可視化することで、配信の質が一目瞭然になるのではないかと考えました。

（※特定の個人配信者を攻撃する意図はないです... あくまで、個人的に面白い配信かどうかを見分けるツールが作りたいだけです）

# 2. 動作環境と使用ライブラリ

Pythonを用いて典型的なWordCloud+janomeの構成でいきます。参考になったnote記事は最後に貼ってあります。

- Mac OS Ventura 13.5
- 使用言語 Python 3.10.0
- ワードクラウドライブラリ　WordCloud (latest)
- 日本語形態素解析ライブラリ　janome (latest)

# 3. 大まかな流れ

ツイキャス公式の開発者向けAPIドキュメントを読み、それに従いユーザー名からコメントを取得する。
アプリの登録を行い、bearer_tokenを発行しそれで認証を行う。

なお、ユーザー名(user_id)はユーザー名と同義でツイキャスサイト上で使われるidと同じものである。そのため、サイトから対象配信者を選定しidを特定し APIから主にコメントを取得する。

janomeを用いて形態素解析をするこの時点で、頻出するが日本語の機能にためで配信者の特徴とは関係ないような"する", "ある", "こと", "ない"を除去すること、また、改行や使用できない文字を排除する処理を行う。

最後に、wordcloudにより頻出文字や文字同士のつながりを色と大きさによって表す。

# 4.スクリプトの利用方法

必要ライブラリをダウンロードし、以下の入力からスクリプトを動作させられる。

1. user_name(配信サイトで使われるuser_idと同義、twitterで利用している人は”c:{user_name}”となる)
2. アクセストークン(アプリ登録して発行)

なお、配信中のライブ以外のコメントは保存されていないので、配信中のライブのみコメントを取得可能です。また、limitからコメント取得件数を0-50まで変更できますが、limitより少ないコメントしかなかった場合など特殊な場合はコメント件数(counts)に誤差が生じることがあります。

↓ main.py

```python
import time
import requests
import json

# ユーザー名(配信中のキャス主https://.../{user_id}) とトークンを入れる
user_name = "{user_name}"
bearer_token = "{access_token}"

def get_last_movie_id(user_name, bearer_token):
    url = f"https://apiv2.twitcasting.tv/users/{user_name}"
    headers = {
    "Accept": "application/json",
    "X-Api-Version": "2.0",
    "Authorization": f"Bearer {bearer_token}"  # {ACCESS_TOKEN} を実際のトークンに置き換えてください
}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        last_movie_id = data["user"]["last_movie_id"]
        return last_movie_id
    else:
        return f"Failed to get data: {response.status_code}"

movie_id = get_last_movie_id(user_name, bearer_token)
print(f"Last Movie ID: {movie_id}")

# 設定
base_url = f"https://apiv2.twitcasting.tv/movies/{movie_id}/comments"
headers = {
    "Accept": "application/json",
    "X-Api-Version": "2.0",
    "Authorization": f"Bearer {bearer_token}"
}

all_comments = []
offset = 0
limit = 40
counts=0

while True:
    params = {
        "offset": offset,
        "limit": limit
    }

    response = requests.get(base_url, headers=headers,params=params)

    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        break


    data = response.json()
    comments = data.get("comments", [])

    if not comments:
        break

    for comment in comments:
        all_comments.append(comment["message"])
        # print(all_comments)

    offset += limit
    counts += limit
    print("success to get comments")
    time.sleep(1)

# コメントを一つの文字列に結合
text = "".join(all_comments)

print(f"comments counts: {counts}")
# sample.txtファイルに書き込み
with open("sample.txt", "w", encoding="utf-8") as file:
    file.write(text)

import pandas as pd
import numpy as np
import unicodedata
import MeCab
from collections import Counter
import requests
from bs4 import BeautifulSoup
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import ipadic
import re

# sample.txtからテキストを読み込み
def read_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            return content
    except FileNotFoundError:
        return "File not found."
    except Exception as e:
        return str(e)

file_path = 'sample.txt'
text = read_file(file_path)
# print(text)

# 関数の設定
def mecab_tokenizer(text):
    mecab = MeCab.Tagger(ipadic.MECAB_ARGS)  # MeCab.Tagger オブジェクトの初期化

    replaced_text = unicodedata.normalize("NFKC", text)
    replaced_text = replaced_text.upper()
    replaced_text = re.sub(r'[【】 () （） 『』　「」]', '', replaced_text)  # 【】 () 「」　『』の除去
    replaced_text = re.sub(r'[\[\［］\]]', ' ', replaced_text)  # ［］の除去
    replaced_text = re.sub(r'[@＠]\w+', '', replaced_text)  # メンションの除去
    replaced_text = re.sub(r'\d+\.*\d*', '', replaced_text)  # 数字の除去

    parsed_lines = mecab.parse(replaced_text).split("\n")[:-2]

    # 表層系を取得
    surfaces = [l.split("\t")[0] for l in parsed_lines]
    # 品詞を取得
    pos = [l.split("\t")[1].split(",")[0] for l in parsed_lines]
    # 名詞、動詞、形容詞に絞り込み
    target_pos = ["名詞", "動詞", "形容詞"]
    token_list = [t for t, p in zip(surfaces, pos) if p in target_pos]

    # ひらがなのみの単語を除く
    kana_re = re.compile("^[ぁ-ゖ]+$")
    token_list = [t for t in token_list if not kana_re.match(t)]

    # 各トークンを少しスペースを空けて（' '）結合
    return ' '.join(token_list)

# 関数の実行
words = mecab_tokenizer(text)

# フォントの設定(OSによってフォントの場所が違うので気を付ける.この場合mac)
font_path = '/System/Library/Fonts/ヒラギノ丸ゴ ProN W4.ttc'
# 色の設定
colormap = "Paired"

wordcloud = WordCloud(
    background_color="white",
    width=800,
    height=800,
    font_path=font_path,
    colormap=colormap,
    stopwords=["する", "ある", "こと", "ない"],
    max_words=100,
).generate(words)

plt.figure(figsize=(10, 10))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
# savefig の前にshowすると保存できないので逆にしない
plt.savefig(f"results/{user_name}.png")
plt.show()
```

# 5.実際に使ってみる

ガールズ、ボーイズで2名づつ上位に出てくる大手配信者の大体1000件のコメントがある配信のコメントを取得する。あまり解析の差が出ないように、同時視聴者数は200-300人の間で、雑談配信、特別な企画をしていない配信を対象にする。
（再々になりますが、特定の配信者のidを出していますが個人を攻撃する意図はありません。）

## ガールズ部門

### mille_tomo

![mille_tomo.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3091887/57f28f04-2258-9a45-8cae-4c0a50ef2db7.png)

### kochu30422

![kochu30422.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3091887/24680031-76c1-3544-85e5-f1c63a41d3e4.png)

## ボーイズ部門

### c:volvolvol9

![c:volvolvol9.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3091887/c26caabc-e08a-52f1-4633-98d2f71c6607.png)

### gazyumarma22

![gazyumarma22.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3091887/e795fbfd-d39f-4213-6fad-59c57fd5f731.png)

# 6.結果

まあ、概ね予想していた通りです。男性のASMR配信者に限らない話ですが、アイドル売りしている大手男性のファン層はJC,JKなのでWで埋まり一方的になりがちです。逆に、女性配信者はキャバクラみたいな感じで女性配信者はエロ売りするか、「俺以外のやつと結婚するなんて」のような弱者男性いじりみたいなある種の決まった様式美ムーブなどをしなければならず、それが結果としてW以外のコメントを生み内容があるように見えているのかもしれません。

男女はどちらもWが使われていますね。女性配信者のコメント欄では草の方が使われているかと思ったのですが、大手すぎると一般向けで、もう少しアングラになるとターゲット層がオタクになるので草が使われてそうです。

結論としては、体感している以上のことはテキストマイニングで明らかにはなりませんでしたが、配信を可視化することには成功したと思います。見なくても、この話してたのか〜とか、全体的な雰囲気を掴むにはもってこいです。

以上が記事になります。あまり技術的にも面白いものではありませんが、まだコメント欄解析は聞いたことがなかったので発想としては面白いのではないでしょうか。では。

# 7.参考文献

jaonme+wordcloud周辺技術でのテキストマイニング
https://note.com/ekazu_10/n/ne2a20de4b167

ツイキャス開発者APIドキュメント
https://apiv2-doc.twitcasting.tv/#introduction
