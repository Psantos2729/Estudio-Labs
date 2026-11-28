import { createElement } from 'react';
import type { Block } from './model';
import { FlowSvg, LIGHT } from './FlowSvg';

/** Baja el diagrama como PNG con fondo blanco (sin ＋), para pegarlo en la entrega. */
export async function downloadPng(blocks: Block[], name: string) {
  const ctx = { pal: LIGHT, interactive: false, onPlus: () => {}, onPick: () => {} };
  const { renderToStaticMarkup } = await import('react-dom/server'); // solo al descargar: no pesa en la carga
  const svg = renderToStaticMarkup(createElement(FlowSvg, { blocks, ctx, background: '#ffffff' }));
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  const canvas = document.createElement('canvas');
  const scale = 2; // nítida al imprimir
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  const g = canvas.getContext('2d')!;
  g.scale(scale, scale);
  g.drawImage(img, 0, 0);
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = `${name}.png`;
  a.click();
}
