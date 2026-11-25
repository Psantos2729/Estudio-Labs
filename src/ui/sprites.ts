/** Personajes de las islas en píxeles. Cada letra de la cuadrícula es un color de la paleta; '.' es vacío. */
const BASE: Record<string, string> = { k: '#14161f', w: '#f4f6ff', e: '#102030', y: '#ffd447', r: '#ff5a5a' };

const RAW = {
  brote: { pal: { g: '#5bd46a', G: '#2f8f45', b: '#8a5a3a', s: '#f1c39a', c: '#2ec4b6' }, g: [
    '.....gg.....', '....gGGg....', '.....bb.....', '...kkkkkk...', '..kssssssk..', '..ksesseskk.', '..kssssssk..', '...kssssk...',
    '..kcccccck..', '.kscccccsk..', '..kcbbbbck..', '..kcckkcck..', '..kbk..kbk..', '..kkk..kkk..'] },
  golem: { pal: { G: '#3f9a4f', g: '#6fd27a', S: '#8d948a', d: '#5c6359', y: '#7cf5ff', Y: '#e8ffff' }, g: [
    '....GGgGGgGG....', '...GgSSSSSSgG...', '..kSSSSSSSSSSk..', '.kSSSSkkkkSSSSk.', '.kSSSkyyyykSSSk.', '.kSSSkyYYykSSSk.', '.kSSSSkkkkSSSSk.', 'kSSGSSSSSSSSGSSk',
    'kSGGSSddddSSGGSk', 'kSSSSSSSSSSSSSSk', 'kSSkSSSSSSSSkSSk', 'kGSk.kSSSSk.kSGk', 'kSSk.kSSSSk.kSSk', '.kk..kSkkSk..kk.', '.....kSk.kSk....', '.....kkk.kkk....'] },
  piedra: { pal: { G: '#3f9a4f', g: '#6fd27a', S: '#8d948a' }, g: [
    '...GGgGG....', '..kSSSSSSk..', '.kSSSSSSSSk.', '.kSkSSSSkSk.', '.kSSSSSSSSk.', '.kSSkkkkSSk.', '.kSSSSSSSSk.', '..kkkkkkkk..'] },
  nutria: { pal: { b: '#3a6fd8', t: '#a8743f', T: '#e9c99a', n: '#2a1a10', r: '#e2453b' }, g: [
    '...wwwwww...', '..wbbbbbbw..', '..kttttttk..', '.kttettettk.', '.ktTTnnTTtk.', '..kTTTTTTk..', '..rrrrrrrr..', '.kttrrtttttk',
    '.kttTTTTttk.', '..kttTTttk..', '..ktk..ktk..', '..kk....kk..'] },
  kraken: { pal: { p: '#8a5cff', P: '#c4a8ff' }, g: [
    '.....kkkkkk.....', '....kppppppk....', '...kppPPPPppk...', '..kpppppppppPk..', '..kppwwppwwppk..', '..kppwkppwkppk..', '..kpppppppppk...', '...kppprrpppk...',
    '..kpkpppppkpk...', '.kpk.kpkpk.kpk..', 'kpk..kpkpk..kpk.', 'kpk.kpk.kpk..kpk', '.kpkpk...kpk.kpk', '..kk.......kk.k.'] },
  pluma: { pal: { o: '#9c6b3c', O: '#ead9b5', g: '#ffc94a', B: '#b8402f', y: '#ff9a2e' }, g: [
    '.kk......kk.', '.kokkkkkkok.', '.kooooooook.', 'kogggoogggok', 'kogegoogegok', 'kogggoogggok', '.koooyyoook.', '.kOOOOOOOOk.',
    '.koBBBBBBok.', '.koBwwwwBok.', '.koBBBBBBok.', '..kyk..kyk..', '..kk....kk..'] },
  dragon: { pal: { g: '#4cc25a', W: '#2a7a3d', Y: '#e7e08a', r: '#ff6b3a' }, g: [
    '..........k.k...', '.........kgkgk..', '........kggggk..', '...k...kgggeggk.', '..kWk..kgggggggk', '.kWWWk.kggggrrk.', 'kWWWWWkkgggk....', 'kWWWWkggggggk...',
    '.kWWkgggYYgggk..', '..kkggggYYggggk.', '...kgggYYYgggk..', '...kggggggggk...', '..kgk.kggk.kgk..', '..kk..kgk..kk...', '.....kgggk......', '......kkk.......'] },
  libro: { pal: { B: '#6f4bd8' }, g: [
    '.kkkkkkkkkk.', '.kBBBBBBBBk.', '.kBwwBBwwBk.', '.kBwkBBwkBk.', '.kBBBBBBBBk.', '.kwkwkwkwkk.', '.kwwwwwwwwk.', '.kkkkkkkkkk.', '..kk....kk..'] },
  chispa: { pal: { b: '#7a4a2a', G: '#6ff0ff', o: '#ff8a2e', w: '#e8f2ff' }, g: [
    '...kkkkk....', '..kbbbbbk...', '.kbGGbGGbk..', '.kbGwbGwbk..', '.kyyyyyyyk..', '.kyyyooyyyk.', '..kyyyyyyk..', '.kwwyyyywwk.',
    'kwwyyyyyywwk', '.kwyyyyyywk.', '..kyyyyyyk..', '...ko..ok...', '...kk..kk...'] },
  sierpe: { pal: { p: '#5b6cff', P: '#a8b4ff', y: '#ffe14a', r: '#ff4fa3' }, g: [
    '....kk.....k....', '...kppk...kyk...', '..kpppppk.kyk...', '..kpwkpppkyyk...', '..kpppppppkk....', '...kprrpppk.....', '....kkkpppk.....', '......kpppk.....',
    '.....kpppk......', '....kpppk..kk...', '...kpPpk..kppk..', '...kpppkkkpPpk..', '....kpppppppk...', '.....kkpppkk....', '......kpPk......', '.......kk.......'] },
  // Mini jefes de cada módulo (ver src/features/game/minibosses.ts).
  esfinge: { pal: { s: '#e0b860', S: '#a87a32', b: '#3a6fd8' }, g: [
    '..kkkkk.......', '.kbyyybk......', '.kbsssbk......', '.kbesebk......', '.kbsssbk......', '.kbsrsbkkkkkk.', '..kssssssssssk', '..kSsssssssssk',
    '.ksskSsssskssk', '.kkkk.kkkk.kkk'] },
  uroboros: { pal: { g: '#3fae4a', G: '#2a7a3d' }, g: [
    '....kkkkk...', '..kkgggggkk.', '.kggkkkkgewk', 'kgk.....kgrk', 'kgk......kk.', 'kgk.....kgk.', 'kgk.....kgk.', 'kgGk...kGgk.',
    '.kggkkkkggk.', '..kkggggkk..', '....kkkk....'] },
  termita: { pal: { t: '#e8c89a', T: '#b07a3a', j: '#7a4a2a' }, g: [
    '.k........k.', '..k......k..', '...kkkkkk...', '..kTeTTeTk..', '.jkTTTTTTkj.', '..jkkkkkkj..', '.kttttttttk.', 'ktkttttttktk',
    'k.kttttttk.k', '...kkkkkk...'] },
  ermitano: { pal: { r: '#ff6b4a', s: '#e9c99a', S: '#b07a3a' }, g: [
    '...kkkkkk...', '..kssSSssk..', '.ksSkkkkSsk.', '.kSkssssSsk.', '.ksSSSSSssk.', '.krekrrekrk.', 'krrrrrrrrrrk', 'k.krrkkrrk.k',
    '..kk....kk..'] },
  cardumen: { pal: { f: '#4fb3ff', F: '#ffb547' }, g: [
    '...k.kkk....', '...kkffek...', '...k.kkk....', '............', 'k.kkk.k.kkk.', 'kkFFekkkffek', 'k.kkk.k.kkk.'] },
  burbuja: { pal: { p: '#ffc94a', P: '#e09a2a', b: '#9fdcff' }, g: [
    '..........b.', '...kkkkk..b.', '..kpppppk...', '.kpppepppk.b', 'kkpppppppk..', 'kPkpprrppk..', 'kkpppppppk..', '.kPpPpPpk...',
    '..kkkkkk....'] },
  muralla: { pal: { b: '#b8402f', m: '#d9c2a0' }, g: [
    'kkkkkkkkkkkk', 'kbbbmbbbmbbk', 'kmmmmmmmmmmk', 'kbmwebbbwebk', 'kmmmmmmmmmmk', 'kbbbmbkkkbbk', 'kmmmmmmmmmmk', 'kbmbbbmbbbmk',
    'kkkkkkkkkkkk'] },
  mimico: { pal: { o: '#9c6b3c', O: '#6b4423' }, g: [
    '.kkkkkkkkkk.', 'koOooyyooOok', 'kOOOOyyOOOOk', 'kwkwkwkwkwkk', 'kkrrrrrrrrkk', 'kwkwkwkwkwkk', 'kooooyyooook', 'kOOOOOOOOOOk',
    'kkkkkkkkkkkk'] },
  nubarron: { pal: { w: '#b9c3dd', W: '#8a95b5' }, g: [
    '....kkkk....', '...kwwwwk...', '..kkkkkkkk..', '..kWWWWWWk..', '.kkkkkkkkkk.', '.kwwewwewwk.', 'kkkkkkkkkkkk', 'kWWWWWWWWWWk',
    'kkkkkkkkkkkk', '...y....y...'] },
  cuervo: { pal: { c: '#3a4060', C: '#5a6290' }, g: [
    '...kkkk.....', '..kccccck...', '.kcwecccyy..', '.kcccccck...', '..kcCCcccck.', 'kcCCCccccck.', '.kcCCcccck..', '..kccccck...',
    '...y..y.....'] },
  panda: { pal: {}, g: [
    '.kk......kk.', '.kkkwwwwkkk.', '.kwwwwwwwwk.', '.kwkkwwkkwk.', '.kwkwwwwkwk.', '.kwwwkkwwwk.', '..kwwwwwwk.y', 'kkkkwwwwkkyy',
    'kkkwwwwwwkky', '.kkkk..kkkk.'] }
};

export type SpriteName = keyof typeof RAW;

export const SPRITES = Object.fromEntries(
  Object.entries(RAW).map(([n, s]) => [n, { pal: { ...BASE, ...s.pal } as Record<string, string>, g: s.g }]),
) as Record<SpriteName, { pal: Record<string, string>; g: string[] }>;
