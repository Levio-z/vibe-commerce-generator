import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Settings,
  Sparkles
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: '首页' },
  { path: '/products', icon: ShoppingCart, label: '商品任务' },
  { path: '/templates', icon: FileText, label: '模板库' },
  { path: '/settings', icon: Settings, label: '设置' },
];

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边导航 */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-800">内容生成工具</span>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 底部信息 */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-400 text-center">
            v1.0.0 演示版本
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
