import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  FileText,
  Settings,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ImageIcon,
  Type,
  Download
} from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: '商品任务',
      description: '批量生成商品图文内容，包括标题、卖点文案和主图草稿',
      color: 'bg-blue-500',
      path: '/products',
    },
    {
      icon: FileText,
      title: '模板库',
      description: '管理收藏的图文模板，快速复用优质内容结构',
      color: 'bg-purple-500',
      path: '/templates',
    },
    {
      icon: Settings,
      title: '设置',
      description: '配置默认生成规则、图文风格偏好等参数',
      color: 'bg-green-500',
      path: '/settings',
    },
  ];

  const progressItems = [
    {
      title: '商品内容生成',
      description: '支持在线录入和图片上传，生成标题+卖点+主图',
      status: 'completed',
      icon: CheckCircle2,
    },
    {
      title: 'Excel批量导入',
      description: '支持通过Excel模板批量导入商品数据',
      status: 'pending',
      icon: Clock,
    },
    {
      title: '模板库管理',
      description: '收藏和管理优质图文模板',
      status: 'completed',
      icon: CheckCircle2,
    },
    {
      title: '素材库',
      description: '保存商品素材方便下次使用',
      status: 'pending',
      icon: Clock,
    },
    {
      title: 'AI智能生成',
      description: '接入真实AI API提升生成质量',
      status: 'pending',
      icon: Clock,
    },
  ];

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">欢迎使用电商内容智能生成工具</h1>
        <p className="text-gray-500">帮助运营团队高效生成商品图文内容，从"白手起稿"变为"筛选+微调"</p>
      </div>

      {/* 功能入口卡片 */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {features.map(({ icon: Icon, title, description, color, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
              {title}
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
            </h3>
            <p className="text-sm text-gray-500">{description}</p>
          </button>
        ))}
      </div>

      {/* 开发进度 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          功能开发进度
        </h2>

        <div className="space-y-4">
          {progressItems.map((item, index) => {
            const Icon = item.icon;
            const isCompleted = item.status === 'completed';

            return (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                      {item.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isCompleted ? '已完成' : '开发中'}
                    </span>
                  </div>
                  <p className={`text-sm mt-0.5 ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 进度条 */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">总体进度</span>
            <span className="text-sm font-medium text-blue-600">40%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
      </div>

      {/* 快速开始 */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">快速开始</h3>
            <p className="text-blue-100 text-sm">点击下方按钮，立即体验商品内容生成功能</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            开始生成
          </button>
        </div>
      </div>

      {/* 功能说明 */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <ImageIcon className="w-8 h-8 text-indigo-500 mb-3" />
          <h4 className="font-medium text-gray-800 mb-1">智能主图</h4>
          <p className="text-sm text-gray-500">自动在商品图上叠加文案，支持多种布局风格</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <Type className="w-8 h-8 text-purple-500 mb-3" />
          <h4 className="font-medium text-gray-800 mb-1">结构化文案</h4>
          <p className="text-sm text-gray-500">生成包含核心关键词的标题和卖点文案</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <Download className="w-8 h-8 text-green-500 mb-3" />
          <h4 className="font-medium text-gray-800 mb-1">一键导出</h4>
          <p className="text-sm text-gray-500">复制文案、下载主图，适配多平台上架</p>
        </div>
      </div>
    </div>
  );
}
