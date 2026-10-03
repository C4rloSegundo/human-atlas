// Gera public/models/names-pt.json a partir de scripts/i18n/names-pt.tsv, para os dois modelos
// (atlas.json masculino e atlas-female.json feminino).
// Uso: node scripts/i18n/build-names-pt.mjs
// Cada nome em inglês é normalizado (left/right e os sufixos L/R -> {s}, minúsculas) e procurado no TSV.
// Na tradução, {Sm}/{Sf}/{Smp}/{Sfp} viram esquerdo/esquerda/esquerdos/esquerdas (ou direito...),
// e {S1m}, {S2f}... indicam a ordem em que o lado aparece no nome original.
import fs from 'node:fs';
const base=new URL('../../public/models/',import.meta.url);
const table=new Map();
for(const line of fs.readFileSync(new URL('./names-pt.tsv',import.meta.url),'utf8').split('\n')){
 if(!line.trim()||line.startsWith('#'))continue;
 const [en,pt]=line.split('\t');table.set(en,pt);
}
const sideOf=m=>/^(left|l)$/i.test(m)?'left':'right';
const forms={left:{m:'esquerdo',f:'esquerda',mp:'esquerdos',fp:'esquerdas'},right:{m:'direito',f:'direita',mp:'direitos',fp:'direitas'}};
const names=new Set();
for(const file of ['atlas.json','atlas-female.json']){
 const atlas=JSON.parse(fs.readFileSync(new URL(file,base),'utf8'));
 for(const item of [...atlas.parts,...atlas.concepts])names.add(item.name);
}
const out={},missing=[];
for(const name of names){
 // Uppercase L/R count as sides only as standalone words (female source uses "mammary gland L").
 const sides=[...name.matchAll(/\b(?:[Ll][Ee][Ff][Tt]|[Rr][Ii][Gg][Hh][Tt])\b|\b[LR]\b/g)].map(m=>sideOf(m[0]));
 const key=name.replace(/\b(left|right)\b/gi,'{s}').replace(/\b[LR]\b/g,'{s}').replace(/\s+/g,' ').toLowerCase().trim();
 const template=table.get(key);
 if(!template){missing.push(name);continue;}
 const pt=template.replace(/\{S(\d?)(m|f|mp|fp)\}/g,(_,k,g)=>forms[sides[(k?+k:1)-1]][g]).replace(/\s+/g,' ').trim();
 out[name]=pt.charAt(0).toUpperCase()+pt.slice(1);
}
if(missing.length){console.error(`Sem tradução (${missing.length}):\n`+missing.join('\n'));process.exit(1);}
fs.writeFileSync(new URL('names-pt.json',base),JSON.stringify(out));
console.log(`${Object.keys(out).length} nomes traduzidos.`);
