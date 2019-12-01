!alias trinket embed {{arg = &1&}}
{{D=load_json(get_gvar("fdbad845-e6ec-4cce-89f3-9a9b0888685a"))}}
{{pool=D[D.active].trinket}}
-title "**{{name}} chooses from {{arg}} trinkets**"
-f "Choose 1 from:|{{dice=[roll("1d100") for x in range(arg)]}} {{"\n".join(['- '+pool[x-1]+'`('+str(x)+')`' for x in dice])}}"
-thumb "{{image}}"