!alias slots embed
-title "{{"**%s attempts the Slot Machine %s times**"%(name,"&1&")}}"
-thumb "{{image}}"
{{rolls,data=[vroll("3d8") for x in range(int("&1&"))],load_json(get_gvar("fdbad845-e6ec-4cce-89f3-9a9b0888685a"))}}
-f "**Rolls**|{{"\n".join(["".join("%s=`%d`"%(r.dice,r.total))for r in rolls])}}"
{{tier,reward,JP=data[data.active]["tier"],data[data.active]["reward"],"7, 7, 7"}}
{{prizes=[len([1 for x in rolls if x.total not in tier["low"]+tier["mid"]+tier["high"]]),len([1 for x in rolls if x.total in tier["low"]]),len([1 for x in rolls if x.total in tier["mid"]]),len([1 for x in rolls if x.total in tier["high"] and JP not in x.dice]),len([1 for x in rolls if JP in x.dice])]}}
-f "**You won:**|{{"**Consolation prizes**: %dGP"%+(prizes[0]) if prizes[0]>0 else ""}}{{"\n**%dx Low prizes**\n> %s"%(prizes[1],"\n> ".join([reward["low"][roll("1d%d"%len(reward.low))-1] for x in range(prizes[1])])) if prizes[1]>0 else ""}}{{"\n**%dx Medium prizes**:\n> %s"%(prizes[2],"\n> ".join([reward["mid"][roll("1d%d"%len(reward.mid))-1] for x in range(prizes[2])])) if prizes[2]>0 else ""}}{{"\n**%dx High prizes**:\n> %s"%(prizes[3],"\n> ".join([reward["high"][roll("1d%d"%len(reward.high))-1] for x in range(prizes[3])])) if prizes[3]>0 else ""}}{{"\n**%dx JACKPOT!!!**"%prizes[4] if prizes[4]>0 else ""}}"