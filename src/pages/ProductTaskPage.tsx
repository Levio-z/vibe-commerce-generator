import { FormEvent, useCallback, useState } from 'react';
import { Sparkles, Play, Wand2, Loader2 } from 'lucide-react';
import { useContentGenerator } from '../hooks/useContentGenerator';
import { ProductForm } from '../components/ProductForm';
import { ResultPreview } from '../components/ResultPreview';
import { TestDataSelector } from '../components/TestDataSelector';
import { testProducts, TestProduct } from '../data/testData';
import { generateImage } from '../services/imageApi';
import { generateTitle } from '../utils/titleGenerator';
import { generateSellingPoints } from '../utils/sellingPointGenerator';

export function ProductTaskPage() {
  const {
    product,
    result,
    layout,
    isGenerating,
    mainImage,
    updateProduct,
    setAiGeneratedImage,
    setExternalImageUrl,
    setGeneratedResult,
    updateLayout,
    copyToClipboard,
    reset
  } = useContentGenerator();

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isRealApiEnabled, setIsRealApiEnabled] = useState(false);

  const handleSelectTestProduct = useCallback((testProduct: TestProduct) => {
    reset();

    // 设置商品信息
    updateProduct('name', testProduct.name);
    updateProduct('category', testProduct.category);
    updateProduct('brand', testProduct.brand);
    updateProduct('material', testProduct.material);
    updateProduct('size', testProduct.size);
    updateProduct('color', testProduct.color);
    updateProduct('targetAudience', testProduct.targetAudience);
    updateProduct('extraSellingPoints', testProduct.extraSellingPoints);

    // 设置预览图片
    if (testProduct.imageUrl) {
      setExternalImageUrl(testProduct.imageUrl);
    }
  }, [reset, updateProduct, setExternalImageUrl]);

  const handleDemo = useCallback(() => {
    handleSelectTestProduct(testProducts[0]);
  }, [handleSelectTestProduct]);

  // 生成提示词
  const generatePrompt = useCallback((title?: string, sellingPoints?: string[]) => {
    const parts: string[] = [];

    // 明确生图目的
    parts.push('【电商主图】');

    // 商品名称
    if (product.name) parts.push(product.name);

    // 品牌信息
    if (product.brand) parts.push(`品牌：${product.brand}`);

    // 商品类别
    if (product.category) parts.push(`类别：${product.category}`);

    // 产品属性
    if (product.material) parts.push(`材质：${product.material}`);
    if (product.color) parts.push(`颜色：${product.color}`);
    if (product.size) parts.push(`尺寸：${product.size}`);
    if (product.targetAudience) parts.push(`适用人群：${product.targetAudience}`);

    // 标题和卖点（作为参考）
    if (title) parts.push(`参考标题：${title}`);
    if (sellingPoints && sellingPoints.length > 0) {
      parts.push(`核心卖点：${sellingPoints.join('；')}`);
    }

    // 生图风格要求
    parts.push('【风格要求】纯白背景、产品居中展示、高清细节、专业商业摄影棚灯光、正面视角、完整展示商品全貌、无多余元素干扰');

    return parts.join('，');
  }, [product]);

  // 生成标题
  const generateTitleText = useCallback(() => {
    const parts: string[] = [];

    if (product.brand) parts.push(product.brand);
    if (product.material) parts.push(product.material);
    if (product.category) parts.push(product.category);
    if (product.color) parts.push(product.color);
    if (product.targetAudience) parts.push(`${product.targetAudience}款`);

    return parts.filter(Boolean).join(' ') || product.name || '商品标题';
  }, [product]);

  // 生成标题+提示词
  const handleGenerate = useCallback(() => {
    if (!product.name) {
      alert('请先填写商品名称');
      return;
    }

    const title = generateTitle(product);
    const sellingPoints = generateSellingPoints(product);
    const prompt = generatePrompt(title, sellingPoints);

    setCurrentPrompt(prompt);

    // 设置结果（用于右侧预览）
    setGeneratedResult({
      title,
      sellingPoints,
      mainImageDataUrl: mainImage || ''
    });

    // 如果开启了真实API调用
    if (isRealApiEnabled) {
      setIsAiGenerating(true);

      generateImage({
        prompt,
        onProgress: () => {},
        onComplete: async (images) => {
          setIsAiGenerating(false);

          if (images.length > 0) {
            setAiGeneratedImage(images[0]);
          }
        },
        onError: () => {
          setIsAiGenerating(false);
        },
      });
    }
  }, [product, mainImage, generatePrompt, isRealApiEnabled, setAiGeneratedImage, setGeneratedResult]);

  // 使用自定义提示词重新生成
  const handleRegenerateWithPrompt = useCallback(async (customPrompt: string) => {
    if (!customPrompt.trim()) {
      alert('请输入提示词');
      return;
    }

    setCurrentPrompt(customPrompt);

    // 更新结果
    const title = generateTitle(product);
    const sellingPoints = generateSellingPoints(product);
    setGeneratedResult({
      title,
      sellingPoints,
      mainImageDataUrl: mainImage || ''
    });

    if (isRealApiEnabled) {
      setIsAiGenerating(true);

      await generateImage({
        prompt: customPrompt,
        onProgress: () => {},
        onComplete: async (images) => {
          setIsAiGenerating(false);

          if (images.length > 0) {
            setAiGeneratedImage(images[0]);
          }
        },
        onError: () => {
          setIsAiGenerating(false);
        },
      });
    }
  }, [product, mainImage, setGeneratedResult, isRealApiEnabled, setAiGeneratedImage]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">商品任务</h1>
          <p className="text-gray-500">输入商品信息，生成标题和提示词</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDemo}
            className="flex items-center gap-2 text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Play className="w-4 h-4" />
            快速演示
          </button>
        </div>
      </div>

      {/* 主内容 */}
      <div className="grid grid-cols-12 gap-8">
        {/* 左侧 - 输入区域 */}
        <div className="col-span-12 lg:col-span-5 space-y-5">
          <TestDataSelector
            products={testProducts}
            onSelect={handleSelectTestProduct}
          />

          <ProductForm
            product={product}
            onUpdate={updateProduct}
            onSubmit={handleSubmit}
          />

          {/* API开关 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isRealApiEnabled ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Wand2 className={`w-5 h-5 ${isRealApiEnabled ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">调用真实API</h3>
                  <p className="text-sm text-gray-500">
                    {isRealApiEnabled ? '已开启 - 将调用豆包API生成图片' : '已关闭 - 仅生成标题和提示词'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRealApiEnabled(!isRealApiEnabled)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isRealApiEnabled ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    isRealApiEnabled ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 生成结果 */}
          {currentPrompt && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                生成结果
              </h3>

              {/* 标题 */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-1 block">商品标题</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">{generateTitleText()}</p>
                </div>
              </div>

              {/* 提示词 */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">生图提示词</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-sm line-clamp-4">{currentPrompt}</p>
                </div>
              </div>
            </div>
          )}

          {/* 生成按钮 */}
          <button
            onClick={handleGenerate}
            disabled={!product.name || isAiGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAiGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                生成标题 + 提示词
              </>
            )}
          </button>

          {/* 提示信息 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>使用方式：</strong><br />
              1. 选择测试数据或填写商品信息<br />
              2. 点击"生成标题+提示词"<br />
              3. 开启"调用真实API"开关可生成图片
            </p>
          </div>
        </div>

        {/* 右侧 - 结果预览 */}
        <div className="col-span-12 lg:col-span-7">
          <ResultPreview
            mainImageUrl={result?.mainImageDataUrl || null}
            result={result}
            layout={layout}
            isGenerating={isGenerating || isAiGenerating}
            prompt={currentPrompt || generatePrompt()}
            onLayoutChange={updateLayout}
            onRegenerate={handleGenerate}
            onRegenerateWithPrompt={handleRegenerateWithPrompt}
            onCopy={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
}
