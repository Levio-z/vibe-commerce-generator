# 当前开发任务 - 电商内容智能生成工具

## 📌 任务概览

| 项目 | 内容 |
|------|------|
| **任务名称** | 实现电商商品图文内容智能生成单页应用 |
| **目标** | 验证核心玩法，将运营工作模式从"白手起稿"变为"筛选+微调" |
| **当前阶段** | 第一阶段：核心功能验证 |

## ✅ 已完成

- [x] PRD文档编写 - `PRD.md`
- [x] 给Coding Agent的提示词 - `CODING_PROMPT.md`
- [x] 整体开发计划 - `plan.md`

## 🚀 待执行任务

### 任务1：项目初始化
- [ ] 使用Vite创建React+TypeScript项目
- [ ] 配置Tailwind CSS v3
- [ ] 安装lucide-react图标库
- [ ] 验证项目能正常运行

### 任务2：基础架构搭建
- [ ] 编写类型定义文件 `src/types/index.ts`
- [ ] 实现标题生成规则引擎
- [ ] 实现卖点生成规则引擎
- [ ] 实现Canvas图片处理工具


### 任务3：组件开发
- [ ] 商品信息表单组件 - `ProductForm.tsx`
- [ ] 图片上传组件 - `ImageUploader.tsx`
- [ ] 结果预览与操作面板 - `ResultPreview.tsx`

### 任务4：逻辑封装与组装
- [ ] 自定义Hook `useContentGenerator.ts`
- [ ] 主应用App.tsx组装
- [ ] 整体样式调整
- [ ] 响应式适配

### 任务5：功能测试
- [ ] 表单提交测试
- [ ] 图片上传测试
- [ ] 内容生成测试
- [ ] 文案复制测试
- [ ] 图片下载测试
- [ ] 布局切换测试

## 📁 产出文件清单

| 文件路径 | 状态 |
|----------|------|
| `package.json` | ⏳ 待创建 |
| `vite.config.ts` | ⏳ 待创建 |
| `tailwind.config.js` | ⏳ 待创建 |
| `src/types/index.ts` | ⏳ 待创建 |
| `src/utils/titleGenerator.ts` | ⏳ 待创建 |
| `src/utils/sellingPointGenerator.ts` | ⏳ 待创建 |
| `src/utils/canvasUtils.ts` | ⏳ 待创建 |
| `src/components/ProductForm.tsx` | ⏳ 待创建 |
| `src/components/ImageUploader.tsx` | ⏳ 待创建 |
| `src/components/ResultPreview.tsx` | ⏳ 待创建 |
| `src/hooks/useContentGenerator.ts` | ⏳ 待创建 |
| `src/App.tsx` | ⏳ 待创建 |

## ⏱️ 时间预估

| 任务 | 预估时间 |
|------|----------|
| 项目初始化 | 5分钟 |
| 基础架构 | 30分钟 |
| 组件开发 | 45分钟 |
| 逻辑封装与组装 | 30分钟 |
| 功能测试 | 10分钟 |
| **总计** | **约2小时** |

## 🎯 验收标准
1. `npm run dev` 能正常启动
2. 所有表单字段可正常输入
3. 图片可上传并预览
4. 点击生成后显示标题、卖点、主图
5. 可复制文案、下载图片
6. 切换布局实时更新
