import { ProductInfo } from '../types';

/**
 * 标题生成规则引擎
 * 提供3套模板，随机选择
 */
export function generateTitle(product: ProductInfo): string {
  const templates = [
    // 模板1: 品牌 + 材质 + 类目 + 颜色 + 人群款
    () => {
      const parts = [];
      if (product.brand) parts.push(product.brand);
      if (product.material) parts.push(product.material);
      if (product.category) parts.push(product.category);
      if (product.color) parts.push(product.color);
      if (product.targetAudience) parts.push(`${product.targetAudience}款`);
      return parts.filter(Boolean).join(' ') || product.name;
    },

    // 模板2: 品牌 + 核心特性 + 类目 - 尺寸
    () => {
      const parts = [];
      if (product.brand) parts.push(product.brand);
      parts.push(product.name || product.category || '商品');
      if (product.size) parts.push(`- ${product.size}`);
      return parts.filter(Boolean).join(' ');
    },

    // 模板3: 人群 + 类目 | 材质 + 颜色 | 品牌
    () => {
      const parts = [];
      if (product.targetAudience) parts.push(product.targetAudience);
      if (product.category) parts.push(product.category);
      const second = [];
      if (product.material) second.push(product.material);
      if (product.color) second.push(product.color);
      if (second.length > 0) parts.push('|', second.join(' '));
      if (product.brand) parts.push('|', product.brand);
      return parts.join(' ');
    }
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const title = template();

  // 确保标题长度在合理范围内
  if (title.length < 10 && product.name) {
    return `${product.brand || ''} ${product.name} ${product.category || ''}`.trim();
  }

  return title.slice(0, 40); // 最多40字
}
