import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Type,
  ImageIcon,
  Save,
  Check
} from 'lucide-react';

interface Settings {
  defaultLayout: 'center' | 'bottom' | 'top';
  titleStyle: 'brand' | 'feature' | 'concise';
  textColor: string;
  strokeColor: string;
  fontSize: number;
  autoSaveToLibrary: boolean;
  showReferenceImages: boolean;
  titleMinLength: number;
  titleMaxLength: number;
}

const defaultSettings: Settings = {
  defaultLayout: 'center',
  titleStyle: 'brand',
  textColor: '#FFFFFF',
  strokeColor: '#000000',
  fontSize: 48,
  autoSaveToLibrary: false,
  showReferenceImages: true,
  titleMinLength: 15,
  titleMaxLength: 30,
};

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('appSettings');
  };

  return (
    <div className="p-8 max-w-3xl">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">设置</h1>
        <p className="text-gray-500">配置默认生成规则和图文风格偏好</p>
      </div>

      <div className="space-y-6">
        {/* 主图布局设置 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-purple-500" />
            <h2 className="font-semibold text-gray-800">主图布局设置</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                默认文字布局
              </label>
              <div className="flex gap-3">
                {(['center', 'bottom', 'top'] as const).map((layout) => (
                  <button
                    key={layout}
                    onClick={() => setSettings({ ...settings, defaultLayout: layout })}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      settings.defaultLayout === layout
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {layout === 'center' ? '居中' : layout === 'bottom' ? '底部' : '顶部'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文字颜色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.textColor}
                    onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                    className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">{settings.textColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  描边颜色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.strokeColor}
                    onChange={(e) => setSettings({ ...settings, strokeColor: e.target.value })}
                    className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">{settings.strokeColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                字体大小: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="24"
                max="72"
                value={settings.fontSize}
                onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 标题生成设置 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-gray-800">标题生成规则</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                默认标题风格
              </label>
              <div className="space-y-2">
                {[
                  { value: 'brand', label: '品牌导向', desc: '{品牌} {材质} {类目} {颜色} {人群}款' },
                  { value: 'feature', label: '特性导向', desc: '{品牌} {核心特性} {类目} - {尺寸}' },
                  { value: 'concise', label: '简洁风格', desc: '{人群} {类目} | {材质} {颜色}' },
                ].map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setSettings({ ...settings, titleStyle: style.value as Settings['titleStyle'] })}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      settings.titleStyle === style.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`font-medium ${settings.titleStyle === style.value ? 'text-blue-600' : 'text-gray-700'}`}>
                      {style.label}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题最短字数
                </label>
                <input
                  type="number"
                  value={settings.titleMinLength}
                  onChange={(e) => setSettings({ ...settings, titleMinLength: Number(e.target.value) })}
                  min="10"
                  max="30"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题最长字数
                </label>
                <input
                  type="number"
                  value={settings.titleMaxLength}
                  onChange={(e) => setSettings({ ...settings, titleMaxLength: Number(e.target.value) })}
                  min="20"
                  max="50"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 功能设置 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="w-5 h-5 text-green-500" />
            <h2 className="font-semibold text-gray-800">功能设置</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-700">自动保存到素材库</div>
                <div className="text-sm text-gray-500">生成内容后自动保存商品素材，方便下次使用</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, autoSaveToLibrary: !settings.autoSaveToLibrary })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.autoSaveToLibrary ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.autoSaveToLibrary ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-700">显示参考图片区域</div>
                <div className="text-sm text-gray-500">在商品任务页面显示参考图片上传区域</div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, showReferenceImages: !settings.showReferenceImages })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.showReferenceImages ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.showReferenceImages ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                已保存
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                保存设置
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            重置为默认
          </button>
        </div>
      </div>
    </div>
  );
}
