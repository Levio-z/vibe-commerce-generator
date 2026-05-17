import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'fs/promises'

// env 注入插件 - 处理 public 目录的 HTML 文件
function htmlEnvPlugin() {
  return {
    name: 'html-env-inject',
    apply: 'build' as const,
    config() {
      // 加载 .env 文件到 process.env
      const env = loadEnv('production', process.cwd(), '')
      Object.assign(process.env, env)
    },
    async closeBundle() {
      const apiTestPath = 'dist/api-test.html'
      try {
        let content = await readFile(apiTestPath, 'utf-8')
        content = content
          .replace(/\{\{VITE_DOUBAN_API_KEY\}\}/g, process.env.VITE_DOUBAN_API_KEY || '')
          .replace(/\{\{VITE_DOUBAN_API_ENDPOINT\}\}/g, process.env.VITE_DOUBAN_API_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3/images/generations')
        await writeFile(apiTestPath, content)
      } catch (e) {
        // 文件不存在，忽略
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), htmlEnvPlugin()],
  base: process.env.NODE_ENV === 'production' ? '/vibe-commerce-generator/' : '/',
})
