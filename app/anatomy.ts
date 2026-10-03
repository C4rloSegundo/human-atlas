export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Esqueleto',color:'#e2d9ba',description:'Os ossos formam a estrutura de sustentação do corpo, protegem os órgãos e servem de ponto de fixação para os músculos. Seu tecido interno também armazena minerais e produz células sanguíneas.'},
 {id:'muscular',name:'Músculos',color:'#a85b50',description:'Os músculos esqueléticos geram movimento ao tracionar seus pontos de fixação. Junto com os tendões, movem as articulações, estabilizam a postura e produzem calor.'},
 {id:'cardiac',name:'Coração',color:'#b96760',description:'O coração é uma bomba muscular com quatro câmaras. Suas valvas direcionam o sangue adiante pelas circulações pulmonar e sistêmica.'},
 {id:'sensory',name:'Sentidos',color:'#b0c8ce',description:'Estas estruturas participam dos sentidos especiais, como visão, audição e equilíbrio. Seus tecidos especializados detectam estímulos e atuam com o sistema nervoso para transmitir informações.'},
 {id:'arterial',name:'Artérias',color:'#c05245',description:'O coração impulsiona o sangue pela circulação. As artérias levam o sangue para longe do coração, irrigando os tecidos ou, na circulação pulmonar, os pulmões.'},
 {id:'venous',name:'Veias',color:'#527c9f',description:'As veias levam o sangue de volta ao coração. Redes superficiais e profundas recolhem o sangue dos tecidos; as veias pulmonares trazem o sangue oxigenado dos pulmões.'},
 {id:'nervous',name:'Sistema nervoso',color:'#d8b565',description:'O encéfalo, a medula espinal e os nervos periféricos conduzem e processam sinais. Eles sustentam a sensibilidade, o movimento, a coordenação e a regulação automática das funções do corpo.'},
 {id:'respiratory',name:'Respiratório',color:'#b98991',description:'As vias aéreas conduzem o ar até os pulmões, onde oxigênio e gás carbônico são trocados entre o ar e o sangue. A respiração depende de variações de pressão produzidas pelos músculos respiratórios.'},
 {id:'digestive',name:'Digestório',color:'#b8916b',description:'O trato digestório decompõe os alimentos, absorve nutrientes e água e conduz os resíduos adiante. Os órgãos anexos fornecem bile e enzimas digestivas.'},
 {id:'urinary',name:'Urinário',color:'#b47961',description:'Os rins filtram o sangue e regulam o equilíbrio de líquidos, eletrólitos e ácido–base. A urina segue pelos ureteres até a bexiga e sai pela uretra.'},
 {id:'lymphatic',name:'Linfático',color:'#879f7c',description:'Os vasos linfáticos devolvem à circulação o excesso de líquido dos tecidos. Os linfonodos e outros órgãos linfoides participam da vigilância e das respostas imunológicas.'},
 {id:'endocrine',name:'Endócrino',color:'#c5a09a',description:'Os órgãos endócrinos liberam hormônios no sangue para coordenar processos como metabolismo, crescimento, resposta ao estresse e reprodução.'},
 {id:'reproductive',name:'Reprodutor',color:'#bda098',description:'As estruturas reprodutoras masculinas representadas aqui participam da produção, maturação e transporte dos espermatozoides e da produção de hormônios sexuais.'},
 {id:'integumentary',name:'Superfície corporal',color:'#ba9b7d',description:'A superfície do corpo serve de referência anatômica externa. O sistema tegumentar forma uma barreira protetora e contribui para a sensibilidade e a regulação da temperatura.'},
 {id:'connective',name:'Tecido conjuntivo',color:'#aec3bb',description:'Cartilagens, ligamentos e outros tecidos conjuntivos sustentam, unem e separam estruturas. Entre suas funções estão estabilizar articulações e distribuir cargas mecânicas.'},
];
export interface Part {id:string;name:string;nameEn?:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;nameEn?:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'Uma bomba muscular no tórax. O lado direito envia o sangue aos pulmões; o lado esquerdo o envia pela circulação sistêmica.',
 'liver':'Um órgão grande abaixo do lado direito do diafragma. Processa os nutrientes absorvidos, produz bile e sintetiza muitas proteínas transportadas no sangue.',
 'brain':'O órgão central do sistema nervoso. Suas regiões interligadas sustentam a percepção, o movimento, a memória, a linguagem e a regulação das funções do corpo.',
 'stomach':'Uma câmara muscular entre o esôfago e o intestino delgado. Armazena o alimento e o mistura com ácido e enzimas antes de liberá-lo para o duodeno.',
 'spleen':'Um órgão linfoide na parte superior esquerda do abdome. Filtra o sangue, remove células sanguíneas envelhecidas e participa das respostas imunológicas.',
 'pancreas':'Um órgão abdominal com funções digestivas e endócrinas. Fornece enzimas ao intestino delgado e libera hormônios como insulina e glucagon.',
 'urinary bladder':'Um reservatório muscular na pelve que armazena a urina que chega dos rins pelos ureteres.',
 'trachea':'A principal via aérea entre a laringe e os brônquios. Seus anéis de cartilagem mantêm a via aberta durante a respiração.',
 'diaphragm':'Um músculo largo que separa o tórax do abdome. Ao se contrair, aumenta o volume do tórax e ajuda a puxar o ar para os pulmões.',
};
/** Explanations are keyed by the original English source name. */
export function explanation(nameEn:string,system:SystemId){return EXPLANATIONS[nameEn.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
/** Merge the Portuguese name map into the atlas, keeping the English source name for search and lookups. */
export function localizeAtlas(atlas:Atlas,names:Record<string,string>):Atlas{
 const pt=(name:string)=>names[name]??name;
 return {...atlas,parts:atlas.parts.map(p=>({...p,nameEn:p.name,name:pt(p.name)})),concepts:atlas.concepts.map(c=>({...c,nameEn:c.name,name:pt(c.name)}))};
}
/** Accent- and case-insensitive text used for search. */
export function fold(text:string){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
