let metaMacroExpand = script => {
    let metamacros = [...script.matchAll(/(.+) := (.+)/g)].map(([_,a,b]) => [a,b])
    for([a,b] of metamacros){
        sc = sc.replace(new RegExp(a,"gs"),b)
    }
    sc = sc.replace(/(.+) := (.+)/g,'')
}
let extractMacros = script => [...script.matchAll(/(.+) = (.+)/g)].map(([_,a,b]) => [a,b])
let macroExpand = (script,macros) => {
    let sc = script
    let sc_ch = sc
    for([a,b] of macros){
        while(true){
            sc = sc.replace(new RegExp(a,"gs"),b)
            if(sc != sc_ch) sc_ch = sc
            else break;
        }
    }
    return sc
}
let evaluate = script => {
    let sc = script.replace(/{%([^{][^%]+?)%}/gs,(_,$1) => eval(evaluate($1)) || '')
    if(sc.match('{%')) return evaluate(sc)
    else return sc
}
let run = script => evaluate(macroExpand(script,extractMacros(script)))