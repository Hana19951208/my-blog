# 🎨 个人博客个性化定制指南 (Customization Guide)

本指南将帮助你快速将这个博客模板通过修改配置变更为属于你自己的个人站点。

## 1. 核心站点信息 (必备)

**文件路径**: `data/siteMetadata.js`

这是最重要的配置文件。你需要修改这里的大部分信息以匹配你的个人资料。

```javascript
const siteMetadata = {
  title: 'My Personal Blog', // 修改为你的博客标题
  author: 'Hana', // 你的名字
  headerTitle: 'TailwindBlog', // 网站顶部显示的标题
  description: 'A blog created with Next.js and Tailwind.css', // SEO 描述
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app', // 部署后的网址
  siteRepo: 'https://github.com/timlrx/tailwind-nextjs-starter-blog', // 你的 GitHub 仓库地址
  email: 'address@yoursite.com', // 你的联系邮箱
  github: 'https://github.com', // 你的 GitHub 主页
  twitter: 'https://twitter.com/Twitter', 
  // ... 其他社交媒体链接
  locale: 'en-US',
  // ...
  // 评论配置 (Giscus)
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', 
      reactions: '1', 
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
}
```

## 2. 导航栏菜单

**文件路径**: `data/headerNavLinks.ts`

在这里修改顶部导航栏的链接。

```typescript
const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]
```

## 3. "关于我" 页面与头像

**文件路径**: `data/authors/default.mdx`
**头像路径**: `public/static/images/avatar.png` (请替换为你自己的头像图片)

修改 MDX 文件中的 Frontmatter (顶部元数据) 和正文内容：

```markdown
---
name: Hana
avatar: /static/images/avatar.png
occupation: Professor of Atmospheric Science
company: Stanford University
email: address@yoursite.com
twitter: https://twitter.com/Twitter
linkedin: https://www.linkedin.com
github: https://github.com
---

这里写你的自我介绍...
```

## 4. 网站 Logo

**文件路径**: `data/logo.svg`

你可以替换这个 SVG 文件，或者在 `components/Header.tsx` 中修改 Logo 组件的引用。

## 5. 主题颜色与样式

**文件路径**: `tailwind.config.js`

如果你想修改主色调（Primary Color），可以在 `theme.extend.colors.primary` 中修改颜色代码：

```javascript
      colors: {
        primary: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          // ... 修改为你喜欢的色系
          500: '#319795', // 核心主色
          600: '#2C7A7B',
          // ...
        },
```

## 6. 项目展示页

**文件路径**: `data/projectsData.ts`

在这里添加你的个人项目列表，它们将显示在 `/projects` 页面。

---

🎉 **完成以上修改后，你的博客就已经焕然一新了！**
