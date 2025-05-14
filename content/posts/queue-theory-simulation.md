---
title: "待ち行列シミュレーション"
slug: "queue-theory-simulation"
date: "2025-05-14"
tags: ["Python","レポート"]
---


![%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-05-13_15.06.47.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/869ddd21-7f28-4904-ad9a-084764054f0f/e98d4bac-1133-4c17-b082-bc9746529585/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-05-13_15.06.47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAX6HQY3%2F20250514%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250514T153326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQChyUoDRS%2FEK%2FjenMv%2F10%2BJZYe5aieV0hifJaZ81adpBgIhAMR7lG3xmDrN5RGO0%2FzbO93IK726z8CUFaZ%2Fl9nS18NJKv8DCBgQABoMNjM3NDIzMTgzODA1IgwTywTpy6j3Rn5b2foq3ANGn1ZaObWKLEvL2SoinuCKVLjOzCox7qY%2B%2FlmAsJUMmOVCKlHmFAf3yq%2BzyjAfIEzkscbDqeLIvZKt0xTlU5qHRk2iFaGDbfQ5gi%2By4DKpY8q%2BCO5uIUnxWIolrT%2F%2BMeLEKE0d4vqTsk8%2F2gFuuDLJsQ%2BZDSHt29yEedDP1cX3Em7SME4UMjRheygxiKgXLfqKPdHe35Ppv8OL9SlXlpBE%2BXseeoFK6YSmEYr8h5XKTx1c4gqpWNLZgkWseMYMWiuTGj4yFnOtneEPXigHXXhGUue5A%2FHAwVbh04%2FjzkAWXD7%2B7XV%2F8HOx762nnxqJ8kmrn1IzZmot%2F5DNUDmFDc4FALet4NJA%2BFXqdpi%2BYt8VwUWVY92teWgG1A5w4EiBVjVMCL0Lsc%2BTcxud966J1Y86c0mP6Hm6AhiP187ojoGWFmOeuSSveZPKPDNt8JrN3caKqqi0hubswel1X%2B%2FE%2B%2B815pNJlc9h5wIH15calgATJuO%2BYT5Ao9tM2CIDJnTTdquaT2rlqfu0jnFyhpjzYhaU5fl%2Bpk2qtp7yxauRWP8Tqrn9k2y2R2zJbfMd1vgZq4k%2BLI2UQsqiXc5qiCjPmdXUpTeIQyb54SVGl2yDE%2BhZtFK5h8GbAxWQAz%2BuCTDT1ZLBBjqkAW8YhjlgmG9sGsYLene5wzTU3tbn9yThr61%2B7ZppU6%2BsRtG4yL%2FUl8ZrbMGgjv3Xb4XJj6DBgcOl1uiUm7vb2cVNePkGp9QW98n7%2FYFHv%2F8LDeT2EmkImqcI3K1DhPR07gL9Fjx6aMI%2BWw0vlnuUftfEE3YGoLbDFQ5%2FaZcHBLD24u1%2BlydGQaIqfyah6Qb2JG9YO3JyrILoqpUcCtqq9ikVj4b4&X-Amz-Signature=c64f9ca3f7050540033d49d3d64b8cb1176a404b768ebb045f34d6f58f483ea7&X-Amz-SignedHeaders=host&x-id=GetObject)


```python
=== 待ち行列シミュレーション結果 ===
顧客数: 10
各顧客の待ち時間: ['0.000', '0.000', '0.022', '0.092', 
'0.121', '0.189', '0.370', '0.444', '0.469', '0.604']
平均待ち時間: 0.231
最大待ち時間: 0.604
```


**分析**　λ > μの場合では、待ち行列理論の古典的な公式は使えないため、計算機を使ってのシミュレーションで待ち時間を出すことができる。グラフでは、正しく計算できているように思える。


[%E5%BE%85%E3%81%A1%E8%A1%8C%E5%88%97%E7%90%86%E8%AB%96.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/869ddd21-7f28-4904-ad9a-084764054f0f/80184bb1-7a3d-4781-bc43-9687c9b7f99d/%E5%BE%85%E3%81%A1%E8%A1%8C%E5%88%97%E7%90%86%E8%AB%96.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAX6HQY3%2F20250514%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250514T153326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQChyUoDRS%2FEK%2FjenMv%2F10%2BJZYe5aieV0hifJaZ81adpBgIhAMR7lG3xmDrN5RGO0%2FzbO93IK726z8CUFaZ%2Fl9nS18NJKv8DCBgQABoMNjM3NDIzMTgzODA1IgwTywTpy6j3Rn5b2foq3ANGn1ZaObWKLEvL2SoinuCKVLjOzCox7qY%2B%2FlmAsJUMmOVCKlHmFAf3yq%2BzyjAfIEzkscbDqeLIvZKt0xTlU5qHRk2iFaGDbfQ5gi%2By4DKpY8q%2BCO5uIUnxWIolrT%2F%2BMeLEKE0d4vqTsk8%2F2gFuuDLJsQ%2BZDSHt29yEedDP1cX3Em7SME4UMjRheygxiKgXLfqKPdHe35Ppv8OL9SlXlpBE%2BXseeoFK6YSmEYr8h5XKTx1c4gqpWNLZgkWseMYMWiuTGj4yFnOtneEPXigHXXhGUue5A%2FHAwVbh04%2FjzkAWXD7%2B7XV%2F8HOx762nnxqJ8kmrn1IzZmot%2F5DNUDmFDc4FALet4NJA%2BFXqdpi%2BYt8VwUWVY92teWgG1A5w4EiBVjVMCL0Lsc%2BTcxud966J1Y86c0mP6Hm6AhiP187ojoGWFmOeuSSveZPKPDNt8JrN3caKqqi0hubswel1X%2B%2FE%2B%2B815pNJlc9h5wIH15calgATJuO%2BYT5Ao9tM2CIDJnTTdquaT2rlqfu0jnFyhpjzYhaU5fl%2Bpk2qtp7yxauRWP8Tqrn9k2y2R2zJbfMd1vgZq4k%2BLI2UQsqiXc5qiCjPmdXUpTeIQyb54SVGl2yDE%2BhZtFK5h8GbAxWQAz%2BuCTDT1ZLBBjqkAW8YhjlgmG9sGsYLene5wzTU3tbn9yThr61%2B7ZppU6%2BsRtG4yL%2FUl8ZrbMGgjv3Xb4XJj6DBgcOl1uiUm7vb2cVNePkGp9QW98n7%2FYFHv%2F8LDeT2EmkImqcI3K1DhPR07gL9Fjx6aMI%2BWw0vlnuUftfEE3YGoLbDFQ5%2FaZcHBLD24u1%2BlydGQaIqfyah6Qb2JG9YO3JyrILoqpUcCtqq9ikVj4b4&X-Amz-Signature=c32dcab9f798d78b86e5210a4961bd1affd2c7b204e16b115774974646ef01f7&X-Amz-SignedHeaders=host&x-id=GetObject)


```python
import math
import matplotlib.pyplot as plt

def generate_interarrival_time(p, arrival_rate):
    """到着間隔を生成"""
    return (-1 / arrival_rate) * math.log(1 - p)

def generate_service_time(p, service_rate):
    """サービス時間を生成"""
    return (-1 / service_rate) * math.log(1 - p)

def simulate_queue(p1, p2, arrival_rate, service_rate):
    """待ち行列シミュレーション"""
    arrival_times = [0]  # 到着時刻
    start_times = [0]    # サービス開始時刻
    departure_times = [0] # サービス終了時刻
    wait_times = [0]      # 待ち時間
    
    for i in range(1, len(p1)):
        # 到着間隔とサービス時間を生成
        interarrival = generate_interarrival_time(p1[i], arrival_rate)
        service_time = generate_service_time(p2[i], service_rate)
        
        # 到着時刻を計算
        arrival_times.append(arrival_times[i-1] + interarrival)
        
        # サービス開始時刻を計算
        start_times.append(max(arrival_times[i], departure_times[i-1]))
        
        # サービス終了時刻を計算
        departure_times.append(start_times[i] + service_time)
        
        # 待ち時間を計算
        wait_times.append(start_times[i] - arrival_times[i])
    
    return arrival_times, wait_times

def plot_waiting_times(arrival_times, wait_times):
    """待ち時間の推移をグラフ化"""
    plt.figure(figsize=(10, 6))
    plt.plot(arrival_times, wait_times, 'bo-', label='wait time')
    plt.xlabel('Simulation time', fontsize=12)
    plt.ylabel('Waiting time', fontsize=12)
    plt.title('Simulation of queue theory', fontsize=14)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.legend()
    
    # 平均待ち時間の水平線を追加
    avg_wait = sum(wait_times)/len(wait_times)
    plt.axhline(y=avg_wait, color='r', linestyle='--', label=f'average time ({avg_wait:.3f})')
    plt.legend()
    
    plt.tight_layout()
    plt.show()

def main():
    # 入力データ
    p1 = [0.298, 0.208, 0.285, 0.048, 0.717, 0.124, 0.927, 0.201, 0.587, 0.497]
    p2 = [0.682, 0.429, 0.755, 0.641, 0.755, 0.989, 0.791, 0.555, 0.947, 0.862]
    
    # パラメータ設定
    arrival_rate = 58  # λ (到着率)
    service_rate = 20   # μ (サービス率)
    
    # シミュレーション実行
    arrival_times, waiting_times = simulate_queue(p1, p2, arrival_rate, service_rate)
    
    # 結果表示
    print("=== 待ち行列シミュレーション結果 ===")
    print(f"顧客数: {len(waiting_times)}")
    print("各顧客の待ち時間:", [f"{t:.3f}" for t in waiting_times])
    print("各顧客の待ち時間:", [f"{t:.3f}" for t in waiting_times])
    print(f"平均待ち時間: {sum(waiting_times)/len(waiting_times):.3f}")
    print(f"最大待ち時間: {max(waiting_times):.3f}")
    
    # グラフ描画
    plot_waiting_times(arrival_times, waiting_times)

if __name__ == '__main__':
    main()
```

