!alias prop embed
{{data,args=load_json(get_gvar("37acfd64-712e-4b90-97c5-5195dc13f19e")),"&*&".lower()}}
{{err("**\nAvalable properties:** `%s`"%", ".join(data.properties.keys())) if args.startswith("list") else 0}}
{{keys=[x for x in data.properties.keys() if args==x]}}
{{keys=[x for x in data.properties.keys() if x.startswith(args)] if len(keys)==0 else keys}}
{{keys=[x for x in data.properties.keys() if args in x] if len(keys)==0 else keys}}
{{err("**\nAvalable properties:** `%s`"%", ".join(data.properties.keys())) if len(keys)==0 else 0}}
{{err("**What did you mean? I found these properties:\n`%s`**"%", ".join(keys)) if len(keys)>1 else 0}}
{{prop=data.properties[keys[0]]}}
-title "{{prop.name}}"
-desc "{{"\n".join(prop.description)}}"
{{" ".join(["-f '**%s**|**%s**'"%(use.name,"\n".join(use.entries)) for use in prop.usages])}}