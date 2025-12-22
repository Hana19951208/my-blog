# My Personal Blog

基于 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 改造的全栈个人博客系统。

## 🎯 项目现状 (初始化阶段)

当前项目已完成初步架构设计与环境搭建，集成了 **Supabase** 作为后端服务：
- **前端**: Next.js (App Router), Tailwind CSS
- **后端**: Supabase Auth, Database (Postgres), Row Level Security (RLS)
- **渲染**: MDX 支持，正在从静态 Contentlayer 迁移至 Supabase 动态数据驱动

- **渲染**: MDX 支持，正在从静态 Contentlayer 迁移至 Supabase 动态数据驱动

> 📖 **学习指南**：
> 1. [**技术架构指南 (GUIDE.md)**](./GUIDE.md)：了解代码结构与核心实现原理。
> 2. [**个性化定制指南 (CUSTOMIZATION.md)**](./CUSTOMIZATION.md)：修改标题、作者、导航栏与配色。

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

- [x] 实现 `/editor` 文章编辑器页面 (Apple Style)
- [x] 动态首页与列表：合并 Supabase 与本地 Markdown 文章
- [x] 文章详情页：支持 MDX 动态渲染 (Supabase 数据驱动)
- [ ] 部署至 Vercel

---
**Build with 🤍 by Hana**
