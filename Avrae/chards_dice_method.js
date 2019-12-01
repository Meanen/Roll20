!embed -title "**Chards' Dice Methodology**"
-f "**Rolled**|{{ result=[roll("1d6") for x in range(24)] }} {{ result }} {{result.sort()}}"
-f "**Dropped**|{{ result[:4] + result[22:]}} {{result = result[4:22]}}"
-f "**Stats:**|
**{{sum(result[:3])}}** {{result[:3]}}
**{{sum(result[3:6])}}** {{result[3:6]}}
**{{sum(result[6:9])}}** {{result[6:9]}}
**{{sum(result[9:12])}}** {{result[9:12]}}
**{{sum(result[12:15])}}** {{result[12:15]}}
**{{sum(result[15:18])}}** {{result[15:18]}} 
**Total: {{summ=sum(result)}}{{summ}}**"
-color {{"FF" if summ <= 71 else "00"}}{{"CC" if summ > 63 else "00"}}00