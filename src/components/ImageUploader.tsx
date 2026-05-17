import { useCallback, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon, ImagePlus } from 'lucide-react';

interface ImageUploaderProps {
  mainImage: string | null;
  referenceImages: string[];
  onSetMainImage: (url: string, file: File) => void;
  onAddReference: (url: string) => void;
  onRemoveReference: (index: number) => void;
  onClearMain: () => void;
}

export function ImageUploader({
  mainImage,
  referenceImages,
  onSetMainImage,
  onAddReference,
  onRemoveReference,
  onClearMain
}: ImageUploaderProps) {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const refInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File, type: 'main' | 'reference') => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (type === 'main') {
        onSetMainImage(url, file);
      } else {
        onAddReference(url);
      }
    };
    reader.readAsDataURL(file);
  }, [onSetMainImage, onAddReference]);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
  };

  const handleDragLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
  };

  const handleDrop = (e: DragEvent, type: 'main' | 'reference') => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, type);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'main' | 'reference') => {
    const file = e.target.files?.[0];
    if (file) handleFile(file, type);
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {/* 商品主图上传 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <ImageIcon className="w-5 h-5 text-purple-500" />
          商品主图
          <span className="text-sm font-normal text-gray-500 ml-1">（白底图/场景图）</span>
        </h2>

        {mainImage ? (
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <img src={mainImage} alt="商品主图" className="w-full h-48 object-contain bg-gray-50" />
            <button
              type="button"
              onClick={onClearMain}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'main')}
            onClick={() => mainInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
          >
            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">点击或拖拽上传商品主图</p>
            <p className="text-gray-400 text-sm mt-1">支持 JPG、PNG 格式</p>
            <input
              ref={mainInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'main')}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* 参考素材上传 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <ImagePlus className="w-5 h-5 text-orange-500" />
          参考素材（可选）
          <span className="text-sm font-normal text-gray-500 ml-1">最多5张</span>
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {referenceImages.map((url, index) => (
            <div key={index} className="relative group">
              <img src={url} alt={`参考图${index + 1}`} className="w-full h-16 object-cover rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={() => onRemoveReference(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {referenceImages.length < 5 && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'reference')}
              onClick={() => refInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-2 flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all h-16"
            >
              <ImagePlus className="w-6 h-6 text-gray-400" />
              <input
                ref={refInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'reference')}
                className="hidden"
              />
            </div>
          )}
        </div>

        {referenceImages.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            已上传 {referenceImages.length}/5 张参考图
          </p>
        )}
      </div>
    </div>
  );
}
