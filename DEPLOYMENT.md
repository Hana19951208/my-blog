# 🚀 部署与运维指南 (Deployment & Ops Guide)

本项目已转型为基于 **Next.js (App Router) + Supabase** 的全栈博客系统。为了支持服务端功能（如认证、动态路由、Middleware），推荐使用 **Vercel** 进行部署。

---

## 💻 本地开发环境

要在本地启动并调试项目，请遵循以下步骤：

### 1. 环境准备

确保已安装 `pnpm` 及其依赖：

```bash
pnpm install
```

### 2. 配置环境变量

在根目录下创建 `.env.local` 文件（已在 `.gitignore` 中忽略，需手动创建）：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名API密匙
```

### 3. 启动开发服务器

```bash
pnpm dev
# 默认访问地址: http://localhost:3000 或 3005
```

### 4. 生产编译校验

在提交代码前，建议运行 build 命令以确保没有类型错误或构建冲突：

```bash
pnpm build
```

---

## 🌐 Vercel 生产部署 (推荐)

Vercel 与 GitHub 的集成是本项目的最佳实践。

### 1. 持续部署 (CD)

- **原理**: 只要你将代码提交并推送 (`git push`) 到 GitHub 的 `main` 分支，Vercel 会自动触发构建。
- **配置**:
  - 在 Vercel 后台管理界面中，进入 **Settings > Environment Variables**。
  - 添加 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。
  - 无需配置特定的 Build Commands，Vercel 会自动识别并应用项目配置。

### 2. 手动部署工具 (备用)

如果需要手动强制触发部署：

```bash
npx vercel --prod
```

---

## ⚠️ 关于 GitHub Pages 的说明

**GitHub Pages 目前不支持本项目**。原因如下：

- GitHub Pages 仅支持纯静态导出 (`output: export`)。
- 本项目使用了 **Supabase Auth**、**Middleware 鉴权**、以及 **动态文章详情页**，这些功能必须依赖 Node.js 服务端运行环境，而静态导出无法兼容这些特性。
- 因此，我们已移除 `.github/workflows/pages.yml` 配置文件，全面使用 Vercel。

---

**Build with 🤍 by Hana**
