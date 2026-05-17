import { FormEvent } from 'react';
import { ProductInfo, CATEGORIES, TARGET_AUDIENCES } from '../types';
import { Package, Tag, Building2, Layers, Ruler, Palette, Users, FileText } from 'lucide-react';

interface ProductFormProps {
  product: ProductInfo;
  onUpdate: (field: keyof ProductInfo, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function ProductForm({ product, onUpdate, onSubmit }: ProductFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <Package className="w-5 h-5 text-blue-500" />
          商品基础信息
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              商品名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="请输入商品名称"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                商品类目 <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              value={product.category}
              onChange={(e) => onUpdate('category', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
            >
              <option value="">请选择类目</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                品牌
              </span>
            </label>
            <input
              type="text"
              value={product.brand}
              onChange={(e) => onUpdate('brand', e.target.value)}
              placeholder="请输入品牌名称"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  材质
                </span>
              </label>
              <input
                type="text"
                value={product.material}
                onChange={(e) => onUpdate('material', e.target.value)}
                placeholder="如：纯棉"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Ruler className="w-4 h-4" />
                  尺寸
                </span>
              </label>
              <input
                type="text"
                value={product.size}
                onChange={(e) => onUpdate('size', e.target.value)}
                placeholder="如：M/L/XL"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-4 h-4" />
                  颜色
                </span>
              </label>
              <input
                type="text"
                value={product.color}
                onChange={(e) => onUpdate('color', e.target.value)}
                placeholder="如：黑色"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  适用人群
                </span>
              </label>
              <select
                value={product.targetAudience}
                onChange={(e) => onUpdate('targetAudience', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="">请选择</option>
                {TARGET_AUDIENCES.map(aud => (
                  <option key={aud} value={aud}>{aud}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                其他卖点（可选）
              </span>
            </label>
            <textarea
              value={product.extraSellingPoints}
              onChange={(e) => onUpdate('extraSellingPoints', e.target.value)}
              placeholder="请输入其他卖点信息"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
