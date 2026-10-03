// Gera public/models/names-pt.json a partir de scripts/i18n/names-pt.tsv.
// Uso: node scripts/i18n/build-names-pt.mjs
// Cada nome em inglês é normalizado (left/right -> {s}, minúsculas) e procurado no TSV.
// Na tradução, {Sm}/{Sf}/{Smp}/{Sfp} viram esquerdo/esquerda/esquerdos/esquerdas (ou direito...),
// e {S1m}, {S2f}... indicam a ordem em que left/right aparecem no nome original.
import fs from 'node:fs';
const base=new URL('../../public/models/',import.meta.url);
const atlas=JSON.parse(fs.readFileSync(new URL('atlas.json',base),'utf8'));
const table=new Map();
for(const line of fs.readFileSync(new URL('./names-pt.tsv',import.meta.url),'utf8').split('\n')){
 if(!line.trim()||line.startsWith('#'))continue;
 const [en,pt]=line.split('\t');table.set(en,pt);
}
const forms={left:{m:'esquerdo',f:'esquerda',mp:'esquerdos',fp:'esquerdas'},right:{m:'direito',f:'direita',mp:'direitos',fp:'direitas'}};
const names=[...new Set([...atlas.parts.map(p=>p.name),...atlas.concepts.map(c=>c.name)])];
const out={},missing=[];
for(const name of names){
 const key=name.replace(/\b(left|right)\b/gi,'{s}').toLowerCase().trim();
 const sides=[...name.matchAll(/\b(left|right)\b/gi)].map(m=>m[1].toLowerCase());
 const template=table.get(key);
 if(!template){missing.push(name);continue;}
 const pt=template.replace(/\{S(\d?)(m|f|mp|fp)\}/g,(_,k,g)=>forms[sides[(k?+k:1)-1]][g]).replace(/\s+/g,' ').trim();
 out[name]=pt.charAt(0).toUpperCase()+pt.slice(1);
}
if(missing.length){console.error(`Sem tradução (${missing.length}):\n`+missing.join('\n'));process.exit(1);}
fs.writeFileSync(new URL('names-pt.json',base),JSON.stringify(out));
console.log(`${Object.keys(out).length} nomes traduzidos.`);
