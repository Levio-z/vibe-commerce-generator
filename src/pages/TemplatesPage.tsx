import { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  ImageIcon,
  Copy,
  Star,
  X,
  Check
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: 'main' | 'text';
  category: string;
  content: string;
  preview: string;
  createdAt: string;
  isFavorite: boolean;
}

const defaultTemplates: Template[] = [
  {
    id: '1',
    name: '简约白底主图模板',
    type: 'main',
    category: '主图',
    content: '白色背景 + 商品居中 + 底部文字',
    preview: '',
    createdAt: '2024-01-15',
    isFavorite: true,
  },
  {
    id: '2',
    name: '场景图模板',
    type: 'main',
    category: '主图',
    content: '生活场景 + 商品展示 + 顶部文字',
    preview: '',
    createdAt: '2024-01-14',
    isFavorite: false,
  },
  {
    id: '3',
    name: '品牌标题模板',
    type: 'text',
    category: '标题',
    content: '{品牌} {材质} {类目} {颜色} {人群}款',
    preview: '',
    createdAt: '2024-01-13',
    isFavorite: true,
  },
  {
    id: '4',
    name: '卖点文案模板-材质',
    type: 'text',
    category: '文案',
    content: '优质{material}，舒适耐用，触感细腻',
    preview: '',
    createdAt: '2024-01-12',
    isFavorite: false,
  },
  {
    id: '5',
    name: '卖点文案模板-品牌',
    type: 'text',
    category: '文案',
    content: '{brand}品质保证，正品保障，放心选购',
    preview: '',
    createdAt: '2024-01-11',
    isFavorite: false,
  },
];

export function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'main' | 'text'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'text' as 'main' | 'text',
    category: '文案',
    content: '',
  });

  const filteredTemplates = templates.filter((t) => {
    if (showFavoritesOnly && !t.isFavorite) return false;
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const toggleFavorite = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    );
  };

  const deleteTemplate = (id: string) => {
    if (confirm('确定要删除这个模板吗？')) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      alert('请填写模板名称和内容');
      return;
    }

    const template: Template = {
      id: Date.now().toString(),
      ...newTemplate,
      preview: '',
      createdAt: new Date().toISOString().split('T')[0],
      isFavorite: false,
    };

    setTemplates((prev) => [template, ...prev]);
    setNewTemplate({ name: '', type: 'text', category: '文案', content: '' });
    setShowAddModal(false);
  };

  const handleCopyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      alert('已复制到剪贴板');
    } catch {
      alert('复制失败');
    }
  };

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">模板库</h1>
          <p className="text-gray-500">管理您的图文模板，快速复用优质内容结构</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加模板
        </button>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">筛选：</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('main')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === 'main'
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-1" />
              主图模板
            </button>
            <button
              onClick={() => setFilter('text')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === 'text'
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1" />
              文案模板
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showFavoritesOnly
                ? 'bg-amber-100 text-amber-600 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Star className="w-4 h-4" />
            仅显示收藏
          </button>

          <span className="text-sm text-gray-500 ml-auto">
            共 {filteredTemplates.length} 个模板
          </span>
        </div>
      </div>

      {/* 模板列表 */}
      <div className="grid grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {template.type === 'main' ? (
                  <ImageIcon className="w-5 h-5 text-purple-500" />
                ) : (
                  <FileText className="w-5 h-5 text-blue-500" />
                )}
                <h3 className="font-medium text-gray-800">{template.name}</h3>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {template.category}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {template.content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                创建于 {template.createdAt}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyContent(template.content)}
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                  title="复制内容"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFavorite(template.id)}
                  className={`p-1.5 rounded transition-colors ${
                    template.isFavorite
                      ? 'text-amber-500 hover:bg-amber-50'
                      : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                  }`}
                  title={template.isFavorite ? '取消收藏' : '收藏'}
                >
                  <Star className={`w-4 h-4 ${template.isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-2 bg-gray-50 rounded-xl p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无模板</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 text-blue-500 hover:text-blue-600"
            >
              添加第一个模板
            </button>
          </div>
        )}
      </div>

      {/* 添加模板弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">添加新模板</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模板名称
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="例如：爆款标题模板"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    模板类型
                  </label>
                  <select
                    value={newTemplate.type}
                    onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as 'main' | 'text' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="text">文案模板</option>
                    <option value="main">主图模板</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    分类
                  </label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="标题">标题</option>
                    <option value="文案">文案</option>
                    <option value="主图">主图</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模板内容
                </label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  placeholder="输入模板内容，支持占位符如 {brand}、{material} 等"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddTemplate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
