---
title: "待ち行列シミュレーション"
slug: "queue-theory-simulation"
date: "2025-05-14"
tags: ["Python","レポート"]
---


![%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-05-13_15.06.47.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/869ddd21-7f28-4904-ad9a-084764054f0f/e98d4bac-1133-4c17-b082-bc9746529585/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-05-13_15.06.47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THJ53L54%2F20250514%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250514T150455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCVeRbs4ojFFVOSQGEwAmgVCy%2B6bSwVd9PJ46WfoavbGwIgFfD%2BCYZ47jjcxCtCPnlro6LXNLb3aObPnHbbewHzTpwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDDfTadE5aZ3PGgK69SrcAz12qfK6%2BwmVBxANES3IAPYVwlCQkFUC%2BhBWpHB5EJgwZ5KOgiLKKUzNh1PHQpmS6jsQWF3B6%2BwmyeMCAxSiWSUmDddf20mZxu3gE5cM7G5UEa5cWWV2EADZh49RRnvUwaE%2BPY2PSkzXGYF8GfPDJfi%2Fe5l9dTk9%2FxoIrxAaYQ3U9ocWXontCU0vI9PgCio1u2k2IjztaV7lqxLPpHPYC3HE6Q5ua1JgVq6nhp%2BwYxx5bhsfPHLSjVwJCvyO4vtW73UgXQXXQftPEzTYtbnssOFuSkUIYHugQa0SRjbiFOwiaGA9SW1QGKQMnoetpGyXo1bP8bn8s6jjLuW05ztZAxzEgurdV1kG8lhC6dZaZNdWqgIX4ei2m9IQio7xCmiljvzq4gbNu%2F3iPXMsYDQpPZHV4Z07XlzkxBgzQdcsoQDCfsOBfOHltYrEqGCvYurs87KER4%2B%2BI4M%2FckrYpeF1JsHUGEkl%2BY8czV98rE7RKGdZd%2FuPyKYQgn%2BccEiKlbzjh3QrQzPqz83x1EG0PKz8WtxTCDJ1PK0CbpiUseZQAQ2sSJmTXaH3Ihe8KEQ0alDytPgR0JHt1dXSKG6B%2F0NlK96LR%2FwarlPPDfqI%2FBGWlEituQKDTtdRr3MJ4dQ2MOnVksEGOqUB1K9POMEd4eAjz9BmCQLiTFVCy%2BjiED96ffc2Yte%2BJPZrDlmK9%2FxdK84z65GNZ%2BxfaMEGfZrumRlorUd1DqmXoVHWXcVhfUg2gqGUGAT46%2BHLiou68rNvONEKvStlTWA%2FQqbHZXJCDud7adm4W5ukF9XLf0eFnnnMniYCaI%2FeWymnKtvNYcDT1OfB%2FHJeDqUG8HZa6RE6ky1ejPGW5Jh1qs9%2BZUnD&X-Amz-Signature=951ea100c439fc451de294afdeda60785661640ac0e5bd3673e0208604e5e568&X-Amz-SignedHeaders=host&x-id=GetObject)


```python
=== 待ち行列シミュレーション結果 ===
顧客数: 10
各顧客の待ち時間: ['0.000', '0.000', '0.022', '0.092', 
'0.121', '0.189', '0.370', '0.444', '0.469', '0.604']
平均待ち時間: 0.231
最大待ち時間: 0.604
```


**分析**　λ > μの場合では、待ち行列理論の古典的な公式は使えないため、計算機を使ってのシミュレーションで待ち時間を出すことができる。グラフでは、正しく計算できているように思える。


[%E5%BE%85%E3%81%A1%E8%A1%8C%E5%88%97%E7%90%86%E8%AB%96.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/869ddd21-7f28-4904-ad9a-084764054f0f/80184bb1-7a3d-4781-bc43-9687c9b7f99d/%E5%BE%85%E3%81%A1%E8%A1%8C%E5%88%97%E7%90%86%E8%AB%96.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THJ53L54%2F20250514%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250514T150455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCVeRbs4ojFFVOSQGEwAmgVCy%2B6bSwVd9PJ46WfoavbGwIgFfD%2BCYZ47jjcxCtCPnlro6LXNLb3aObPnHbbewHzTpwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDDfTadE5aZ3PGgK69SrcAz12qfK6%2BwmVBxANES3IAPYVwlCQkFUC%2BhBWpHB5EJgwZ5KOgiLKKUzNh1PHQpmS6jsQWF3B6%2BwmyeMCAxSiWSUmDddf20mZxu3gE5cM7G5UEa5cWWV2EADZh49RRnvUwaE%2BPY2PSkzXGYF8GfPDJfi%2Fe5l9dTk9%2FxoIrxAaYQ3U9ocWXontCU0vI9PgCio1u2k2IjztaV7lqxLPpHPYC3HE6Q5ua1JgVq6nhp%2BwYxx5bhsfPHLSjVwJCvyO4vtW73UgXQXXQftPEzTYtbnssOFuSkUIYHugQa0SRjbiFOwiaGA9SW1QGKQMnoetpGyXo1bP8bn8s6jjLuW05ztZAxzEgurdV1kG8lhC6dZaZNdWqgIX4ei2m9IQio7xCmiljvzq4gbNu%2F3iPXMsYDQpPZHV4Z07XlzkxBgzQdcsoQDCfsOBfOHltYrEqGCvYurs87KER4%2B%2BI4M%2FckrYpeF1JsHUGEkl%2BY8czV98rE7RKGdZd%2FuPyKYQgn%2BccEiKlbzjh3QrQzPqz83x1EG0PKz8WtxTCDJ1PK0CbpiUseZQAQ2sSJmTXaH3Ihe8KEQ0alDytPgR0JHt1dXSKG6B%2F0NlK96LR%2FwarlPPDfqI%2FBGWlEituQKDTtdRr3MJ4dQ2MOnVksEGOqUB1K9POMEd4eAjz9BmCQLiTFVCy%2BjiED96ffc2Yte%2BJPZrDlmK9%2FxdK84z65GNZ%2BxfaMEGfZrumRlorUd1DqmXoVHWXcVhfUg2gqGUGAT46%2BHLiou68rNvONEKvStlTWA%2FQqbHZXJCDud7adm4W5ukF9XLf0eFnnnMniYCaI%2FeWymnKtvNYcDT1OfB%2FHJeDqUG8HZa6RE6ky1ejPGW5Jh1qs9%2BZUnD&X-Amz-Signature=bfdefa143fbd30de0933673398fd243cf385a705f72acaec1985237b7384daa9&X-Amz-SignedHeaders=host&x-id=GetObject)


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

