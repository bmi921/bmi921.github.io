---
title: "待ち行列理論"
slug: "waiting-theory"
date: "2025-05-13"
tags: ["レポート"]
---

1. 1時間に20.3台到着し、1時間に53台のゲート処理を行える場合、待ち時間Wqはいくつか

$$
W_q = \frac{\lambda}{\mu (\mu - \lambda)} = \frac{20.3}{53 \times (53 - 20.3)} \approx 0.0117 \text{ 時間} \approx 0.70 \text{ 分}
$$

1. 一時間に20.3台到着したとき、待ち時間Wqは53分であった。この時、平均処理能力は何台か？

$$
W_q = \frac{\lambda}{\mu (\mu - \lambda)} \Rightarrow\mu^2 - \lambda \mu - \frac{\lambda}{W_q} = 0
$$


$$
W_q = 53 \, \text{分} = \frac{53}{60} \, \text{時間} \approx 0.883 \, \text{時間}
$$


$$
\frac{\lambda}{W_q} = \frac{20.3}{0.883} \approx 22.99
$$


$$
\mu = \frac{20.3 \pm \sqrt{20.3^2 + 4 \times 22.99}}{2}= \frac{20.3 \pm \sqrt{504.05}}{2}\Rightarrow \mu \approx \frac{42.75}{2} = 21.38 \text{ 台/時}
$$

1. 宿題1と2を比較し、なぜゲート待ちが長くなってしまうか原因を考えて述べよ

宿題1では、 μ>>λであり、待ち時間は0.7分と非常に短い。一方、宿題2では、 μ≈λであり、待ち時間が53分と爆発的に増加しているのがわかる。つまり、 μ≈λであるのが原因である。よって、余裕をもって処理能力を到着台数より大きく設定するのが大事である。

