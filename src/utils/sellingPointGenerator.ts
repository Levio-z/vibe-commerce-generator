import { ProductInfo } from '../types';

/**
 * 卖点文案生成规则
 * 基于商品属性智能组合卖点
 */
export function generateSellingPoints(product: ProductInfo): string[] {
  const points: string[] = [];

  // 材质卖点
  if (product.material) {
    const materialPoints = [
      `优质${product.material}，舒适耐用，触感细腻`,
      `${product.material}材质，透气亲肤，品质之选`,
      `甄选${product.material}，匠心工艺，值得信赖`
    ];
    points.push(materialPoints[Math.floor(Math.random() * materialPoints.length)]);
  }

  // 品牌卖点
  if (product.brand) {
    const brandPoints = [
      `${product.brand}品质保证，正品保障，放心选购`,
      `官方旗舰店正品 ${product.brand}，品牌授权`,
      `${product.brand}专注品质，匠心打造经典`
    ];
    points.push(brandPoints[Math.floor(Math.random() * brandPoints.length)]);
  }

  // 人群卖点
  if (product.targetAudience) {
    const audiencePoints = [
      `专为${product.targetAudience}设计，贴合需求`,
      `${product.targetAudience}专属，舒适体验`,
      `适合${product.targetAudience}，彰显品味`
    ];
    points.push(audiencePoints[Math.floor(Math.random() * audiencePoints.length)]);
  }

  // 颜色卖点
  if (product.color) {
    const colorPoints = [
      `${product.color}时尚配色，百搭耐看`,
      `${product.color}经典色调，优雅大方`,
      `${product.color}精致设计，吸睛有型`
    ];
    points.push(colorPoints[Math.floor(Math.random() * colorPoints.length)]);
  }

  // 尺寸卖点
  if (product.size) {
    const sizePoints = [
      `多尺寸可选：${product.size}`,
      `标准尺寸${product.size}，合身舒适`
    ];
    points.push(sizePoints[Math.floor(Math.random() * sizePoints.length)]);
  }

  // 额外卖点
  if (product.extraSellingPoints) {
    points.push(product.extraSellingPoints);
  }

  // 默认通用卖点
  if (points.length === 0) {
    points.push('精选优质面料，舒适透气，品质保障');
    points.push('厂家直销，售后无忧，放心购买');
  }

  // 返回1-2条卖点
  return points.slice(0, 2);
}
