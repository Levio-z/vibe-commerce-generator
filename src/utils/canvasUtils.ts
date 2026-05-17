import { LayoutType } from '../types';

const CANVAS_SIZE = 800;
const TEXT_STROKE_WIDTH = 4;
const FONT_SIZE = 48;

/**
 * 加载图片为HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 绘制带描边的文字
 */
function drawTextWithStroke(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number
) {
  ctx.font = `bold ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 描边
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = TEXT_STROKE_WIDTH;
  ctx.strokeText(text, x, y);

  // 填充
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(text, x, y);
}

/**
 * 绘制多行文字
 */
function drawMultiLineText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  fontSize: number
) {
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    drawTextWithStroke(ctx, line, x, startY + index * lineHeight, fontSize);
  });
}

/**
 * 生成主图草稿
 */
export async function generateMainImage(
  imageUrl: string,
  title: string,
  sellingPoints: string[],
  layout: LayoutType
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext('2d')!;

  // 绘制背景
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // 加载并绘制图片
  const img = await loadImage(imageUrl);
  const scale = Math.min(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
  const imgWidth = img.width * scale * 0.8;
  const imgHeight = img.height * scale * 0.8;
  const imgX = (CANVAS_SIZE - imgWidth) / 2;
  const imgY = (CANVAS_SIZE - imgHeight) / 2;

  ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

  // 根据布局绘制文字
  const padding = 40;
  const lineHeight = FONT_SIZE + 16;

  if (layout === 'center') {
    const textX = CANVAS_SIZE / 2;
    const textY = CANVAS_SIZE / 2 + imgHeight / 2 + 80;
    drawMultiLineText(ctx, [title], textX, textY, lineHeight, FONT_SIZE);
  } else if (layout === 'bottom') {
    const textX = CANVAS_SIZE / 2;
    const textY = CANVAS_SIZE - padding - lineHeight * 1.5;
    drawMultiLineText(ctx, [title, ...sellingPoints.slice(0, 1)], textX, textY, lineHeight, FONT_SIZE);
  } else if (layout === 'top') {
    const textX = CANVAS_SIZE / 2;
    const textY = padding + lineHeight * 1.5;
    drawMultiLineText(ctx, [title], textX, textY, lineHeight, FONT_SIZE);
  }

  return canvas.toDataURL('image/png');
}

/**
 * 下载Canvas图片
 */
export function downloadImage(dataUrl: string, filename: string = '商品主图.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
