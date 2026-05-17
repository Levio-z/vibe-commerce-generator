// 测试商品数据
export interface TestProduct {
  name: string;
  category: string;
  brand: string;
  material: string;
  size: string;
  color: string;
  targetAudience: string;
  extraSellingPoints: string;
  imageUrl: string;
}

export const testProducts: TestProduct[] = [
  {
    name: '韩版宽松连帽卫衣',
    category: '服装',
    brand: '潮流前线',
    material: '80%棉+20%聚酯纤维',
    size: 'S/M/L/XL',
    color: '经典黑',
    targetAudience: '女士',
    extraSellingPoints: '百搭款式，适合多种场景',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'
  },
  {
    name: '无线蓝牙降噪耳机',
    category: '数码',
    brand: '音悦汇',
    material: 'ABS塑料+蛋白皮',
    size: '通用尺寸',
    color: '星空灰',
    targetAudience: '通用',
    extraSellingPoints: '主动降噪40dB，续航30小时',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
  },
  {
    name: '北欧简约实木餐桌',
    category: '家居',
    brand: '木语空间',
    material: '白橡木实木',
    size: '140x80x75cm',
    color: '原木色',
    targetAudience: '通用',
    extraSellingPoints: '环保水性漆，可容纳4-6人',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400'
  },
  {
    name: '氨基酸温和洁面乳',
    category: '美妆',
    brand: '肌研坊',
    material: '氨基酸表面活性剂',
    size: '120ml',
    color: '乳白色',
    targetAudience: '女士',
    extraSellingPoints: '敏感肌可用，温和不刺激',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'
  },
  {
    name: '商务真皮男士手包',
    category: '箱包',
    brand: '爵绅',
    material: '头层牛皮',
    size: '28x20x5cm',
    color: '深棕色',
    targetAudience: '男士',
    extraSellingPoints: '多卡位设计，适合商务出行',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'
  },
  {
    name: '智能变频冷暖空调',
    category: '家电',
    brand: '智凉',
    material: '金属外壳+ABS塑料',
    size: '1.5匹',
    color: '纯白',
    targetAudience: '通用',
    extraSellingPoints: '一级能效，智能WiFi控制',
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400'
  },
  {
    name: '儿童益智积木套装',
    category: '母婴用品',
    brand: '趣玩星',
    material: '食品级ABS塑料',
    size: '500pcs',
    color: '多彩',
    targetAudience: '儿童',
    extraSellingPoints: '安全无毒，开发智力',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'
  },
  {
    name: '户外轻便登山背包',
    category: '运动户外',
    brand: '探途',
    material: '尼龙面料',
    size: '50L大容量',
    color: '军绿色',
    targetAudience: '男士',
    extraSellingPoints: '防泼水设计，多仓位收纳',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
  }
];
