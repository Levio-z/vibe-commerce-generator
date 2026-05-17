import { useState, useCallback } from 'react';
import { ProductInfo, GeneratedResult, LayoutType } from '../types';
import { generateTitle } from '../utils/titleGenerator';
import { generateSellingPoints } from '../utils/sellingPointGenerator';
import { generateMainImage, downloadImage } from '../utils/canvasUtils';

const initialProduct: ProductInfo = {
  name: '',
  category: '',
  brand: '',
  material: '',
  size: '',
  color: '',
  targetAudience: '',
  extraSellingPoints: ''
};

export function useContentGenerator() {
  const [product, setProduct] = useState<ProductInfo>(initialProduct);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [layout, setLayout] = useState<LayoutType>('center');
  const [isGenerating, setIsGenerating] = useState(false);

  const updateProduct = useCallback((field: keyof ProductInfo, value: string) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  }, []);

  const setMainImageData = useCallback((url: string, file: File) => {
    setMainImage(url);
    setMainImageFile(file);
  }, []);

  const setAiGeneratedImage = useCallback((url: string) => {
    setMainImage(url);
    setMainImageFile(null);
    // 同时更新result中的图片URL
    setResult(prev => {
      if (prev) {
        return { ...prev, mainImageDataUrl: url };
      }
      return prev;
    });
  }, []);

  // 设置外部图片URL（如测试数据中的图片）
  const setExternalImageUrl = useCallback((url: string) => {
    setMainImage(url);
    setMainImageFile(null);
  }, []);

  const clearMainImage = useCallback(() => {
    setMainImage(null);
    setMainImageFile(null);
  }, []);

  // 生成文案（不需要图片）
  const generateContentOnly = useCallback(async () => {
    if (!product.name || !product.category) {
      return false;
    }

    setIsGenerating(true);
    try {
      const title = generateTitle(product);
      const sellingPoints = generateSellingPoints(product);

      setResult({
        title,
        sellingPoints,
        mainImageDataUrl: mainImage || ''
      });
      return true;
    } catch (error) {
      console.error('生成失败:', error);
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, [product, mainImage]);

  // 生成带主图的内容（需要图片）
  const generateContent = useCallback(async () => {
    setIsGenerating(true);
    try {
      const title = generateTitle(product);
      const sellingPoints = generateSellingPoints(product);

      let mainImageDataUrl = '';

      if (mainImage) {
        // 判断是否是外部URL（AI生成的图片）
        const isExternalUrl = mainImage.startsWith('http');

        if (isExternalUrl) {
          // 外部URL直接使用，不进行Canvas处理
          mainImageDataUrl = mainImage;
        } else {
          // 本地图片叠加文字
          mainImageDataUrl = await generateMainImage(mainImage, title, sellingPoints, layout);
        }
      }

      setResult({
        title,
        sellingPoints,
        mainImageDataUrl
      });
      return true;
    } catch (error) {
      console.error('生成失败:', error);
      // 即使图片处理失败，也设置文案结果
      const title = generateTitle(product);
      const sellingPoints = generateSellingPoints(product);
      setResult({
        title,
        sellingPoints,
        mainImageDataUrl: mainImage || ''
      });
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, [mainImage, product, layout]);

  const regenerateContent = useCallback(async () => {
    return generateContent();
  }, [generateContent]);

  const updateLayout = useCallback((newLayout: LayoutType) => {
    setLayout(newLayout);
  }, []);

  const downloadMainImage = useCallback(() => {
    if (result?.mainImageDataUrl) {
      downloadImage(result.mainImageDataUrl, `${product.name || '商品'}_主图.png`);
    }
  }, [result, product.name]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setProduct(initialProduct);
    setMainImage(null);
    setMainImageFile(null);
    setResult(null);
  }, []);

  const setGeneratedResult = useCallback((resultData: GeneratedResult) => {
    setResult(resultData);
  }, []);

  return {
    product,
    mainImage,
    mainImageFile,
    result,
    layout,
    isGenerating,
    updateProduct,
    setMainImageData,
    setAiGeneratedImage,
    setExternalImageUrl,
    setGeneratedResult,
    clearMainImage,
    generateContentOnly,
    generateContent,
    regenerateContent,
    updateLayout,
    downloadMainImage,
    copyToClipboard,
    reset
  };
}
