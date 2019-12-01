!alias gather embed
{{D,A,S,PB=load_json(get_gvar("d5431597-2f78-428d-be16-ab7fcda0b96b")),"&*&".lower().split(),get_raw(),proficiencyBonus}}
{{M,K=D.mats,D.mats.keys()}}
{{av=[k for k in M if(D.EX not in M[k] or M[k][D.EX]>time())and(D.AV not in M[k] or M[k][D.AV]<time())]}}
{{err(D.E%", ".join(av))if len(A)==0 else""}}
{{s=[x for x in K if A[0]==x]}}
{{s=[x for x in K if x.startswith(A[0])] if len(s)==0 else s}}
{{s=[x for x in K if A[0] in x] if len(s)==0 else s}}
{{s=err(D.E%", ".join(av))if len(s)!=1 else M[s[0]]}}
{{adv,sk,st,pT,eT=1 if D.A in A else -1 if D.D in A else 0,S.skills,S.stats,get(D.pT,dict()),get(D.eT,dict())}}
{{p,b=max([int(x[2])if len(x)==3 and x[:2].lower()=="-p"and x[2]in D.N else 0 for x in A]),max([int(x[2])if len(x)==3 and x[:2].lower()=="-b"and x[2]in D.N else 0 for x in A])}}
{{[A.remove(D.A)if D.A in A else A.remove(D.D)if D.D in A else 0,A.remove("-p%d"%p)if p>0 else 0,A.remove("-b%d"%b)if b>0 else 0]}}
{{tool,WC=[[[PB+st[y]if x in pT else 2*PB+st[y]if x in eT else sk[x]if x in sk else st[y],x,y]for y in s.tool[x]]for x in s.tool],int(get("WC","1"))if"wood"in s.type else 1}}
{{tm=[max([max([y[0]for y in x])for x in tool])][0]}}
{{tool=[x for x in[[[y[1],y[2]]for y in x if y[0]==tm]for x in tool]if len(x)>0][0][0]}}
{{tm=2*PB+b+get(tool[1])if s.type=="scrap"and"tiefling"in S.race.lower()else tm+b}}
{{d,t,R=s.dc,s[D.T]-p,vroll("%dd20%s+%d"%(1+adv*adv,D.DM[adv+1],tm))}}
{{r=R.total}}
{{suc,exh=max(0,min((r+1)-d,1))+max(0,min((r-9)-d,1))+max(0,r-19-tm-WC),max(0,min(d-(r),1))+max(0,min(t-(r),1))+max(0,min((d-10)-r,1))}}
-title "{{D.TITLE%(name,s.name.capitalize(),tool[0].capitalize(),tool[1][:3])}}"
-f "Meta|{{D.META%(d,t,p,b)}}"
-f "Roll:|{{R}}"
-f "Result:|
{{"%s %s"%("%d Successes!\n"%suc if suc>0 else"Failure!",D.WC if(r-tm-WC)==20 else"")}}
{{D.EXH%(exh)if exh else""}}"
-color {{"%s%s00"%("FF"if exh>0 else"00","CC"if suc>0 else"00")}}
-desc "{{" ".join(A[1:]).capitalize()if len(A)>1 else""}}"
-thumb {{image}}
