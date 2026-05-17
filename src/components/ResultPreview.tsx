import { useState, useEffect } from 'react';
import { GeneratedResult, LayoutType } from '../types';
import { generateMainImage, downloadImage } from '../utils/canvasUtils';
import {
  LayoutTemplate,
  Copy,
  Download,
  RefreshCw,
  Check,
  Image as ImageIcon,
  AlignCenter,
  ArrowUp,
  ArrowDown,
  Edit3,
  Save,
  X,
  Wand2
} from 'lucide-react';

interface ResultPreviewProps {
  mainImageUrl: string | null;
  result: GeneratedResult | null;
  layout: LayoutType;
  isGenerating: boolean;
  prompt: string;
  onLayoutChange: (layout: LayoutType) => void;
  onRegenerate: () => void;
  onRegenerateWithPrompt: (prompt: string) => void;
  onCopy: (text: string) => Promise<boolean>;
}

export function ResultPreview({
  mainImageUrl,
  result,
  layout,
  isGenerating,
  prompt,
  onLayoutChange,
  onRegenerate,
  onRegenerateWithPrompt,
  onCopy
}: ResultPreviewProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState('');

  // 判断是否是外部URL（AI生成的图片）
  const isExternalUrl = mainImageUrl?.startsWith('http');

  useEffect(() => {
    if (result) {
      setPreviewImage(result.mainImageDataUrl);
    }
  }, [result]);

  useEffect(() => {
    const updatePreview = async () => {
      if (!mainImageUrl || !result) return;

      // 如果是外部URL（AI生成的图片或测试数据图片），直接显示原图
      if (isExternalUrl) {
        setPreviewImage(mainImageUrl);
        return;
      }

      // 本地图片才叠加文字
      try {
        const image = await generateMainImage(
          mainImageUrl,
          result.title,
          result.sellingPoints,
          layout
        );
        setPreviewImage(image);
      } catch (error) {
        console.error('预览更新失败:', error);
        setPreviewImage(mainImageUrl);
      }
    };

    updatePreview();
  }, [mainImageUrl, result, layout, isExternalUrl]);

  const handleCopy = async (text: string, field: string) => {
    const success = await onCopy(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleEditPrompt = () => {
    setEditedPrompt(prompt);
    setIsEditingPrompt(true);
  };

  const handleSavePrompt = () => {
    if (editedPrompt.trim()) {
      onRegenerateWithPrompt(editedPrompt.trim());
    }
    setIsEditingPrompt(false);
  };

  const handleCancelEdit = () => {
    setIsEditingPrompt(false);
    setEditedPrompt('');
  };

  const layoutOptions: { value: LayoutType; label: string; icon: React.ReactNode }[] = [
    { value: 'center', label: '居中', icon: <AlignCenter className="w-4 h-4" /> },
    { value: 'bottom', label: '底部', icon: <ArrowDown className="w-4 h-4" /> },
    { value: 'top', label: '顶部', icon: <ArrowUp className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-full">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <ImageIcon className="w-5 h-5 text-green-500" />
        生成结果预览
      </h2>

      {!result ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
          <LayoutTemplate className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-center">
            请填写商品信息并上传图片<br />
            然后点击"生成内容"按钮
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* 提示词编辑区域 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-700">生图提示词</span>
              </div>
              {!isEditingPrompt ? (
                <button
                  onClick={handleEditPrompt}
                  className="flex items-center gap-1 text-xs px-2 py-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  修改
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleSavePrompt}
                    disabled={isGenerating}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" />
                    确认
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 text-xs px-2 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="w-3 h-3" />
                    取消
                  </button>
                </div>
              )}
            </div>

            {isEditingPrompt ? (
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                rows={3}
                placeholder="输入新的提示词..."
                className="w-full px-3 py-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              />
            ) : (
              <p className="text-sm text-gray-700 line-clamp-3">{prompt}</p>
            )}

            {isEditingPrompt && (
              <p className="text-xs text-purple-500 mt-2">
                修改提示词后点击"确认"重新生成图片
              </p>
            )}
          </div>

          {/* 主图预览 */}
          <div className="relative">
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={previewImage || result.mainImageDataUrl}
                alt="主图预览"
                className="w-full h-64 object-contain"
              />
              {isGenerating && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-500" />
                    <span className="text-sm">生成中...</span>
                  </div>
                </div>
              )}
            </div>

            {/* 布局切换 */}
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <LayoutTemplate className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">文字布局</span>
              </div>
              <div className="flex gap-2">
                {layoutOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => onLayoutChange(opt.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      layout === opt.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 生成文案 */}
          <div className="space-y-4">
            {/* 标题 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">商品标题</label>
                <button
                  onClick={() => handleCopy(result.title, 'title')}
                  className={`flex items-center gap-1 text-sm px-2 py-1 rounded transition-all ${
                    copiedField === 'title'
                      ? 'text-green-600 bg-green-50'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {copiedField === 'title' ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-800 font-medium leading-relaxed">
                  {result.title}
                </p>
              </div>
            </div>

            {/* 卖点文案 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">卖点文案</label>
                <button
                  onClick={() => handleCopy(result.sellingPoints.join('\n'), 'points')}
                  className={`flex items-center gap-1 text-sm px-2 py-1 rounded transition-all ${
                    copiedField === 'points'
                      ? 'text-green-600 bg-green-50'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {copiedField === 'points' ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                {result.sellingPoints.map((point, index) => (
                  <p key={index} className="text-gray-700 text-sm leading-relaxed">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => previewImage && downloadImage(previewImage, `商品主图_${Date.now()}.png`)}
              disabled={!previewImage}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              下载主图
            </button>
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              重新生成
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
