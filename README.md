# My Personal Blog

基于 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 改造的全栈个人博客系统，深度集成 **Supabase**。

## 🎯 项目现状

本项目已实现从静态博客向 **全栈动态架构** 的演进：

- **前端**: Next.js (App Router), Tailwind CSS
- **后端**: Supabase Auth, Database (Postgres)
- **渲染**: 支持本地 MDX 与 Supabase 动态数据混合展示

---

## 📖 文档中心

为了方便学习与维护，我为你准备了以下详细指南：

1.  📘 [**技术架构指南 (GUIDE.md)**](./GUIDE.md)：深入了解 Next.js + Supabase 的实现细节与代码结构。
2.  🎨 [**个性化定制指南 (CUSTOMIZATION.md)**](./CUSTOMIZATION.md)：学习如何修改标题、作者信息、Logo 以及配色方案。
3.  🚀 [**部署与运维指南 (DEPLOYMENT.md)**](./DEPLOYMENT.md)：详细说明本地运行、生产编译以及 Vercel 自动化部署流程。

---

## ✨ 核心特性

1.  **全栈内容管理**
    - **混合取值逻辑**：同时支持本地 Markdown 文件与云端数据库内容。
    - **Apple 风格编辑器**：支持在线撰写、实时预览并保存到 Supabase。
2.  **优雅认证体系**
    - 基于 Supabase Auth 的极简登录/登出。
    - 服务端 Middleware 路由保护，确保编辑器安全性。
3.  **高性能渲染**
    - 针对动态内容优化，使用 `markdown-it` 实现精美的排版样式。
    - 默认响应式设计，完美适配移动端。

## 🚀 快速启动

1.  **配置环境变量**: 将 `.env.local` 配置文件准备就绪（参考 `DEPLOYMENT.md`）。
2.  **安装 & 运行**:
    ```bash
    pnpm install
    pnpm dev
    ```

---

**Build with 🤍 by Hana**
