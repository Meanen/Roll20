!{{B,V,D="!",3.1,{"O":"&1&","T":"&2&"} }}
{{G,I,N=load_json(get_gvar("2408a8c0-eb9a-4df7-b9d3-ae94ca6493c4")),get_gvar(D.T),"&*&".replace('"','')[len(f"{D.O} {D.T}"):]}}
{{set_cvar_nx(G.E,"[]")}}{{set_cvar(G.s,"&2&")if I else""}}
{{R=get_raw()}}
{{W,U,v,s=not"&"in"&2&",V<G.m[13],R.cvars,R.stats}}
{{u,b=load_json(v[G.E]),load_json(get_gvar(v[G.s]))if G.s in v else[]}}
{{P,E,l=v[G.p]if G.p in v else"",v[G.e]if G.e in v else"",G.H+b+u}}
{{Z,c=len(G.c),G.c+[x.t for x in l]}}
{{D['p']=P}}{{D['e']=E}}
{{z=[[D.update({x:D[x].lower().replace(y,"")})for y in G[B]]for x in D]}}
{{m=min(([c.index(x)for x in c if D.O in x]+[0])[0],Z)}}
{{O=D.O if m==Z else D.T}}{{t=[x for x in l if O in x.t]if m!=6 else[{"t":D.T,"n":"&2&","d":N}]}}
{{t=t[0]if t else G.m[12]}}
{{D['P']=P}}
{{D['E']=E}}
{{z=[set(x,D[x].split(","+(" "*(x in"PE")))if D[x] else []) for x in G.Y]}}
{{r,o=s[G.r],3 if e and[x for x in e if D.O in x]else 2 if p and[x for x in p if D.O in x]else 1 if int(get(G.l,0))>1 else 0}}
{{Q=P if m<3 else E if m<5 else load_json(v[G.E])}}
{{q=t in Q}}
{{Q.append(t.n if m<6 else t)if(not t.n in Q)*(m in[1,3])or(m==6)*(not q)else Q.remove(t.n if m<7 else t)if(m in[2,4]and t.n in Q)or(m==7 and q)else""}}
{{r='-b "'+str(floor(r*(G.é[o].m)))+G.é[o].t+' "'}}
{{set_cvar(("p"if m<3 else"e"if m<5 else"extra")+"Tools",", ".join(Q) if m<5 else dump_json(Q))if(0<m<5 or 5<m<8)*(W)else""}}
{{C=[name,t.n if t.n else D.T,t.d,t.t,v[G.E],D.T,r,str(V)+G.P*U,get_gvar(G.L),v[G.p].replace(", ","\n")if P else"None",v[G.e].replace(", ","\n")if E else"None",color,image,f"a{'n'*(D.T[0]in'iI')} ["]}}
{{F=(m in[1,3])*(t.t)or(m==2)*(t.n in D.P)or(m==4)*(t.n in D.E)or(m==Z)*(D.T in G.a)or(m==6)*W or(m==7)*q or(m==8)*(v[G.E])or(I!=None)*(m==9)or(m==10)*(U)or(m in[0,5])}}
{{T=(G.m if F else G.f)[m]}}
{{z,f=[set("T",T.replace(G.o[x],str(C[x])))for x in range(14)],[G.H,u,b]}}
{{T+N}}
{{""if m else"".join([G.F[x]+", ".join([i.n for i in f[x]])+'"'if f[x]else""for x in[0,1,2]])}}
