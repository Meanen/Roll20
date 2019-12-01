!alias wc embed
{{M,A,P=load_json(get_gvar("d5431597-2f78-428d-be16-ab7fcda0b96b")),"&*&".lower().split(),2 if "Woodcutter's Tools" in eTools else 1 if "Woodcutter's Tools" in pTools else 0}}
{{m,p,a="".join(A[0]),A[1] if len(A)>1 and len(A[1])<3 else 0,1 if "adv" in A else -1 if "dis" in A else 0}}
{{A.remove("adv") if "adv" in A else A.remove("dis") if "dis" in A else ""}}
{{d,t=M[m].get("d",15),M[m].get("t", 5)-int(p)}}
-title "{{name}} attempts to gather {{m.capitalize()}} using Woodcutter's Tools(str)!"
{{w=proficiencyBonus*P+strengthMod}}
-f "Meta|**DC:** {{d}} **Threat:** {{t}} {{"(prot, -"+p+")" if int(p)>0 else ""}}"
-f "Roll:|{{R=vroll(str(1+(a*a))+"d20"+["kl1","","kh1"][a+1]+"+"+str(w))}}{{r=R.total}} {{R}}"
-f "Result:|
{{successes,exhaustion=max(0,min((r+1)-d,1))+max(0,min((r-9)-d,1))+max(0,r-19-w),max(0,min(d-(r),1))+max(0,min(t-(r),1))+max(0,min((d-9)-r,1))}}
{{str(successes)+" Successes!\n" if successes>0 else "Failure!"}} {{" (+1 success due to Woodchuck)" if r-w==20 else""}}
{{str(exhaustion)+" Level(s) of exhaustions gained" if exhaustion else ""}}"
-color {{"FF" if exhaustion>0 else "00" + "CC" if successes>0 else "00"}}00
-desc "{{" ".join([A[2:] if len(A[1])<3 else A[1:]][0]).capitalize() if len(A)>1 else ""}}"
-thumb {{image}}