# My Personal Blog

基于 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 改造的全栈个人博客系统。

## 🎯 项目现状 (初始化阶段)

当前项目已完成初步架构设计与环境搭建，集成了 **Supabase** 作为后端服务：
- **前端**: Next.js (App Router), Tailwind CSS
- **后端**: Supabase Auth, Database (Postgres), Row Level Security (RLS)
- **渲染**: MDX 支持，正在从静态 Contentlayer 迁移至 Supabase 动态数据驱动

## ✨ 已实现功能

1. **用户认证 (Supabase Auth)**
   - 登录 / 注册 / 退出逻辑
   - Apple 风格极简登录 UI
   - Server Component & Middleware 鉴权保护
2. **数据库基础 (Supabase DB)**
   - `profiles` 表: 用户信息
   - `posts` 表: 文章内容存储
   - RLS 策略: 所有人可读已发布文章，仅作者可编辑自己的文章
3. **环境搭建**
   - 使用 `pnpm` 管理依赖
   - 配置了 Supabase 客户端和服务端连接工具

## 🚀 快速启动

1. **配置环境变量**
   在根目录创建 `.env.local`：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   ```

## 🛠️ 后续规划

- [ ] 实现 `/editor` 文章编辑器页面
- [ ] 动态首页：从 Supabase 读取文章列表
- [ ] 文章详情页：MDX 动态渲染
- [ ] 部署至 Vercel

---
**Build with 🤍 by Hana**
