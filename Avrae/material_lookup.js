!alias mat embed
{{data,args=load_json(get_gvar("37acfd64-712e-4b90-97c5-5195dc13f19e")),"&*&".lower()}}
{{err("**\nAvalable materials:** `%s`"%", ".join(data.materials.keys())) if args.startswith("list") else 0}}
{{keys=[x for x in data.materials if args==x]}}
{{keys=[x for x in data.materials if x.startswith(args)] if len(keys)==0 else keys}}
{{keys=[x for x in data.materials if args in x] if len(keys)==0 else keys}}
{{err("**\nAvalable materials:** `%s`"%", ".join(data.materials)) if len(keys)==0 else 0}}
{{err("**What did you mean? I found these materials:\n`%s`**"%", ".join(keys)) if len(keys)>1 else 0}}
{{mat=data.materials[keys[0]]}}
-title "{{mat.name}}"
-desc "{{"**Type:** %s\n**Rarity**: %s \n%s"%(mat.type.capitalize(),mat.rarity.capitalize(),"\n".join(mat.description))}}"
{{" ".join(["-f '**%s**|%s'"%(use.name,"\n".join(use.entries)) for use in mat.usages])}}