import { Package, ChevronRight } from 'lucide-react';
import { TestProduct } from '../data/testData';

interface TestDataSelectorProps {
  products: TestProduct[];
  onSelect: (product: TestProduct) => void;
}

export function TestDataSelector({ products, onSelect }: TestDataSelectorProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <Package className="w-5 h-5 text-indigo-500" />
        测试数据选择
        <span className="text-sm font-normal text-gray-500 ml-1">（快速填充测试）</span>
      </h2>

      <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
        {products.map((product, index) => (
          <button
            key={index}
            onClick={() => onSelect(product)}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left group"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%239ca3af" font-size="12">无图</text></svg>';
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
              <p className="text-xs text-gray-500">{product.category} | {product.brand}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          共 {products.length} 个测试商品，点击即可快速填充并生成内容
        </p>
      </div>
    </div>
  );
}
