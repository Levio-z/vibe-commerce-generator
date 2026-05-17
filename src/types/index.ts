export interface ProductInfo {
  name: string;
  category: string;
  brand: string;
  material: string;
  size: string;
  color: string;
  targetAudience: string;
  extraSellingPoints: string;
}

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  file: File;
  type: 'main' | 'reference';
}

export interface GeneratedResult {
  title: string;
  sellingPoints: string[];
  mainImageDataUrl: string;
}

export type LayoutType = 'center' | 'bottom' | 'top';

export const CATEGORIES = [
  '服装',
  '数码',
  '家居',
  '美妆',
  '食品',
  '箱包',
  '家电',
  '运动户外',
  '母婴用品',
  '其他'
] as const;

export const TARGET_AUDIENCES = [
  '男士',
  '女士',
  '儿童',
  '通用'
] as const;
