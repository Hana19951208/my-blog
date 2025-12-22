# 个人博客项目技术架构园地 (Learning Guide)

本项目基于 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 模板，并深度集成了 **Supabase** 作为后端，实现了从“静态博客”到“全栈动态博客”的演进。

## 🏗️ 核心架构体系

采用的是典型的 **Next.js App Router (v15)** 架构，结合了 **Server Components (RSC)** 与 **Client Components** 的混合模式。

### 1. 目录结构概览
- `app/`: 路由核心。Next.js 的约定优于配置。
  - `(root)/page.tsx`: 首页，负责聚合数据。
  - `blog/`: 博客列表页。
  - `blog/[...slug]/`: 文章详情页，支持动态路由。
  - `editor/`: 写作控制台（受保护路由）。
  - `login/`: 认证中心。
- `components/`: UI 组件库。
  - `UserMenu.tsx`: 处理登录状态切换的 Client Component。
  - `MDXComponents.tsx`: 定义如何渲染 MDX/Markdown 元素（如 Image, Link）。
- `lib/supabase/`: Supabase 基础设施。
  - `client.ts`: 浏览器端使用的客户端（用于登录等交互）。
  - `server.ts`: 服务端使用的客户端（用于获取数据、权限校验）。
  - `middleware.ts`: 负责 Session 刷新和页面路由重定向。
- `layouts/`: 页面布局模板。定义了文章长什么样（PostLayout, ListLayout）。
- `data/`: 静态资源与配置。包含本地 Markdown 文章。

---

## 🔑 核心技术点解析

### 1. 混合数据流 (Hybrid Content Pipeline)
这是本项目最核心的改动。我们在服务端同时从两个地方取数据：
1. **Contentlayer**: 扫描本地 `data/blog/*.mdx` 文件，生成类型化的 JSON。
2. **Supabase**: 通过 SQL 查询获取存储在云端数据库中的文章。

**实现位置**: `app/page.tsx` 和 `app/blog/page.tsx`
**逻辑流程**: 
- `createClient()` (Server) -> Fetch DB Posts -> Merge with Contentlayer Posts -> Sort by Date -> Render.

### 2. Apple 风格 UI (Design System)
我们使用了 **Tailwind CSS v4**。
- **透明玻璃感 (`glassmorphism`)**: 在 `app/login/page.tsx` 中使用了 `backdrop-blur-xl` 和 `bg-white/70`。
- **系统对比色**: 背景使用 `#F5F5F7` (Apple Gray)，文字使用 `zinc-900`。
- **微交互**: 按钮通过 `active:scale-95` 实现物理按压感。

### 3. 动态 Markdown 渲染
详情页 `app/blog/[...slug]/page.tsx` 承担了繁重的工作：
- 它首先检查本地文件，如果没有，则查询 Supabase。
- 因为 Supabase 返回的是纯文本字符串，我们使用 **`markdown-it`** 进行服务端解析成 HTML。
- 使用 `dangerouslySetInnerHTML` 注入到 `prose` (Tailwind Typography) 类容器中，实现精美排版。

---

## 👨‍💻 开发者学习建议 (致 Hana)

如果你是从 Java 后端转过来的，可以这样理解：

- **Next.js Page** ≈ Spring Controller + Thymeleaf/JSP (负责接收请求并组装 HTML)。
- **Server Action / Middleware** ≈ Filter / Interceptor。
- **Supabase** ≈ PostgreSQL + Auth 服务 + RESTful API 加强版。

### 重点关注文件：
1. **`middleware.ts`**: 查看它是如何拦截未登录用户访问 `/editor` 的。
2. **`lib/supabase/server.ts`**: 了解 Next.js 15 是如何通过 `cookies()` 处理跨域认证的。
3. **`app/editor/page.tsx`**: 查看如何通过 `supabase.from('posts').insert()` 进行数据库写入。

---
**Happy Coding!** 一步步来，这套架构非常先进。
