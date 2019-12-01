!alias train embed
{{args="&*&".lower().split()}}
{{err("Start by typing\n`!train start {name} {CP required}`\nYou can then increment it using `!train {name} {number}`") if len(args)==0 else create_cc_nx(args[1],0,args[2]) if args[0]=="start" and len(args)>2 else delete_cc(args[1]) if args[0]=="del" and len(args)>1 else err("Doh") if len(args)>2 else ""}}
{{set_cc(args[1],3) if args[0]=="start" else "AAAA"}}
{{err("OK") if args[0] in ["start","del","help",] else ""}}
{{mod_cc(args[0],int(args[1])) if len(args)>1 else ""}}
-title "{{name+" trains "+args[0]+"." if len(args)>1 else name+"'s progress on "+args[0]}} ({{cc_str(args[0])}})"