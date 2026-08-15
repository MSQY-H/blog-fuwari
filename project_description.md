# Fuwari Blog 项目结构描述

## 项目概述

Fuwari 是一个基于 **Astro** 框架的静态博客模板，使用 **Tailwind CSS** 进行样式设计，集成了 **Svelte** 组件。项目专注于极简、现代化的博客体验，支持深色模式、平滑页面切换、搜索功能以及扩展的 Markdown 语法。

### 技术栈

- **框架**: Astro 5.13.10
- **样式**: Tailwind CSS 3.4.19 + @tailwindcss/typography
- **组件**: Svelte 5.39.8
- **包管理器**: pnpm 9.14.4
- **搜索**: Pagefind 1.4.0
- **图标**: Iconify + Iconify Svelte
- **代码高亮**: Expressive Code
- **数学公式**: KaTeX
- **Markdown 增强**: remark-directive, remark-math, remark-github-admonitions-to-directives
- **页面切换**: @swup/astro

---

## 项目结构（完整目录树）

```
blog-fuwari/
├── .astro/                          # Astro 构建缓存目录
│   ├── collections/                 # Astro 集合定义
│   │   ├── posts.schema.json       # Posts 集合 Schema
│   │   └── spec.schema.json        # Spec 集合 Schema
│   ├── content-assets.mjs           # 内容资源模块
│   ├── content-modules.mjs          # 内容模块
│   ├── content.d.ts                 # 内容类型定义
│   ├── data-store.json              # 数据存储
│   ├── settings.json                # Astro 设置
│   └── types.d.ts                   # 类型定义
├── .vscode/                         # VSCode 配置
│   ├── extensions.json              # 推荐扩展
│   └── settings.json                # 工作区设置
├── docs/                            # 多语言文档
│   ├── README.es.md                 # 西班牙语
│   ├── README.id.md                 # 印尼语
│   ├── README.ja.md                 # 日语
│   ├── README.ko.md                 # 韩语
│   ├── README.th.md                 # 泰语
│   ├── README.tr.md                 # 土耳其语
│   ├── README.vi.md                 # 越南语
│   └── README.zh-CN.md              # 简体中文
├── public/                          # 静态资源目录（复制到 dist/）
│   └── favicon/                     # 网站图标
│       ├── favicon-dark-128.png     # 暗色模式 128x128
│       ├── favicon-dark-180.png     # 暗色模式 180x180
│       ├── favicon-dark-192.png     # 暗色模式 192x192
│       ├── favicon-dark-32.png      # 暗色模式 32x32
│       ├── favicon-light-128.png    # 亮色模式 128x128
│       ├── favicon-light-180.png    # 亮色模式 180x180
│       ├── favicon-light-192.png    # 亮色模式 192x192
│       └── favicon-light-32.png     # 亮色模式 32x32
├── scripts/                         # 构建和脚本目录
│   └── new-post.js                  # 创建新文章的脚本
├── src/                             # 源代码目录（Astro 要求）
│   ├── assets/                      # 静态资源
│   │   └── images/                  # 图片资源
│   │       ├── demo-avatar.png      # 演示头像
│   │       └── demo-banner.png      # 演示横幅
│   ├── components/                  # React/Svelte/Astro 组件
│   │   ├── ArchivePanel.svelte      # 归档面板组件
│   │   ├── ConfigCarrier.astro      # 配置传递器
│   │   ├── Footer.astro             # 页脚组件
│   │   ├── GlobalStyles.astro       # 全局样式
│   │   ├── LightDarkSwitch.svelte   # 深色/浅色切换
│   │   ├── Navbar.astro             # 导航栏组件
│   │   ├── PostCard.astro           # 文章卡片
│   │   ├── PostMeta.astro           # 文章元数据
│   │   ├── PostPage.astro           # 文章页面
│   │   ├── control/                 # 控制组件
│   │   │   ├── BackToTop.astro      # 返回顶部
│   │   │   ├── ButtonLink.astro     # 按钮链接
│   │   │   ├── ButtonTag.astro      # 标签按钮
│   │   │   └── Pagination.astro     # 分页
│   │   ├── misc/                    # 杂项组件
│   │   │   ├── ImageWrapper.astro   # 图片包装器
│   │   │   ├── License.astro        # 许可协议显示
│   │   │   └── Markdown.astro       # Markdown 渲染
│   │   └── widget/                  # 小部件组件
│   │       ├── Categories.astro     # 分类小部件
│   │       ├── DisplaySettings.svelte # 显示设置
│   │       ├── NavMenuPanel.astro   # 导航菜单面板
│   │       ├── Profile.astro        # 个人资料卡片
│   │       ├── SideBar.astro        # 侧边栏
│   │       ├── TOC.astro            # 目录（TOC）
│   │       └── Tags.astro           # 标签小部件
│   ├── constants/                   # 常量定义
│   │   ├── constants.ts             # 常量集合
│   │   ├── icon.ts                  # 图标常量
│   │   └── link-presets.ts          # 链接预设
│   ├── content/                     # Markdown 内容集合
│   │   ├── config.ts                # 内容集合配置
│   │   ├── posts/                   # 博客文章
│   │   │   ├── draft.md             # 草稿文章
│   │   │   ├── expressive-code.md   # 代码高亮示例
│   │   │   ├── guide/               # 指南目录
│   │   │   │   ├── cover.jpeg       # 封面图
│   │   │   │   └── index.md         # 指南文章
│   │   │   ├── markdown-extended.md # Markdown 扩展语法
│   │   │   ├── markdown.md          # Markdown 基础语法
│   │   │   └── video.md             # 视频示例
│   │   └── spec/                    # 规格文档
│   │       └── about.md             # 关于页面
│   ├── env.d.ts                     # Astro 环境类型定义
│   ├── global.d.ts                  # 全局类型定义
│   ├── i18n/                        # 国际化
│   │   ├── i18nKey.ts               # 国际化键值
│   │   ├── languages/               # 语言文件
│   │   │   ├── en.ts                # 英语
│   │   │   ├── es.ts                # 西班牙语
│   │   │   ├── id.ts                # 印尼语
│   │   │   ├── ja.ts                # 日语
│   │   │   ├── ko.ts                # 韩语
│   │   │   ├── th.ts                # 泰语
│   │   │   ├── tr.ts                # 土耳其语
│   │   │   ├── vi.ts                # 越南语
│   │   │   ├── zh_CN.ts             # 简体中文
│   │   │   └── zh_TW.ts             # 繁体中文
│   │   └── translation.ts           # 翻译工具
│   ├── layouts/                     # 页面布局
│   │   ├── Layout.astro             # 基础布局
│   │   └── MainGridLayout.astro     # 主网格布局
│   ├── pages/                       # 页面路由
│   │   ├── [...page].astro          # 动态页面路由
│   │   ├── about.astro              # 关于页面
│   │   ├── archive.astro            # 归档页面
│   │   ├── posts/                   # 文章列表路由
│   │   │   └── [...slug].astro      # 文章详情页
│   │   ├── robots.txt.ts            # robots.txt 生成
│   │   └── rss.xml.ts               # RSS 订阅源
│   ├── plugins/                     # Markdown 处理插件
│   │   ├── expressive-code/         # Expressive Code 插件
│   │   │   ├── custom-copy-button.ts # 自定义复制按钮
│   │   │   └── language-badge.ts     # 语言标识徽章
│   │   ├── rehype-component-admonition.mjs # 警告提示组件
│   │   ├── remark-directive-rehype.js # remark 指令处理
│   │   ├── remark-excerpt.js        # 提取摘要
│   │   └── remark-reading-time.mjs  # 阅读时间计算
│   ├── styles/                      # 全局样式
│   │   ├── expressive-code.css      # 代码高亮样式
│   │   ├── main.css                 # 主样式文件
│   │   ├── markdown-extend.styl     # Markdown 扩展样式
│   │   ├── markdown.css             # Markdown 基础样式
│   │   ├── photoswipe.css           # 图片画廊样式
│   │   ├── scrollbar.css            # 滚动条样式
│   │   ├── transition.css           # 页面过渡动画
│   │   └── variables.styl           # CSS 变量定义
│   ├── types/                       # TypeScript 类型
│   │   └── config.ts                # 配置类型定义
│   ├── utils/                       # 工具函数
│   │   ├── content-utils.ts         # 内容处理工具
│   │   ├── date-utils.ts            # 日期处理工具
│   │   ├── setting-utils.ts         # 设置工具
│   │   └── url-utils.ts             # URL 处理工具
│   ├── config.ts                    # 站点配置（主要配置）
│   └── styles/                      # 样式文件
├── svelte.config.js                 # Svelte 配置
├── tailwind.config.cjs              # Tailwind CSS 配置
├── tsconfig.json                    # TypeScript 配置
├── vercel.json                      # Vercel 部署配置
├── .biome.json                      # Biome 配置
├── .npmrc                           # npm 配置
├── deno.json                        # Deno 配置
├── deno.lock                        # Deno 锁文件
├── frontmatter.json                 # 前置元数据配置
├── postcss.config.mjs               # PostCSS 配置
├── package.json                     # 项目依赖和脚本
├── pnpm-lock.yaml                   # pnpm 锁文件
├── pagefind.yml                     # Pagefind 配置
├── project_description.md           # 项目结构描述（本文件）
├── README.md                        # 项目说明文档
├── CONTRIBUTING.md                  # 贡献指南
├── LICENSE                          # MIT 许可证
└── astro.config.mjs                 # Astro 框架主配置文件
```

---

## 核心目录说明

### 1. `src/` - 源代码目录

Astro 的源代码必须位于 `src` 目录中。

#### `src/assets/` - 资源文件
- 存放图片、字体等静态资源
- 图片路径：`assets/images/`（相对于 `/src` 目录）
- 支持主题化资源（亮色/暗色模式）

#### `src/components/` - 组件目录
包含页面和文章的各个组件：

- **Header.astro** - 导航栏组件
  - 包含站点标题、导航链接、搜索功能
  - 支持响应式设计

- **Footer.astro** - 页脚组件
  - 版权信息
  - 社交链接
  - 许可协议显示

- **MainLayout.astro** - 主布局
  - 页面头部
  - 主内容区域
  - 页面底部

- **PostLayout.astro** - 文章布局
  - 文章标题
  - 发布日期、作者信息
  - 标签、分类
  - 文章元数据

#### `src/content/posts/` - 博客文章
存放 Markdown 格式的博客文章，每篇文章需要包含以下 frontmatter：

```yaml
---
title: 文章标题
published: 2023-09-09
description: 文章描述
image: ./cover.jpg
tags: [标签1, 标签2]
category: 分类名
draft: false
lang: en  # 如果文章语言与站点不同需设置
---
```

#### `src/layouts/` - 布局模板
- **BaseLayout.astro** - 基础布局
  - 头部元数据
  - 全局样式和脚本
  - 组件引入

- **PostLayout.astro** - 文章布局
  - 继承 BaseLayout
  - 文章特定内容
  - 目录（TOC）生成

#### `src/plugins/` - Markdown 处理插件
处理 Markdown 内容的各种增强功能：

- **expressive-code/** - 代码高亮配置
  - 支持折叠代码块
  - 行号显示
  - 语言标识徽章
  - 自定义复制按钮

- **remark-excerpt.js** - 提取文章摘要

- **remark-reading-time.mjs** - 计算阅读时间

- **rehype-component-*.mjs** - HTML 组件渲染
  - GitHub 仓库卡片
  - 警告提示框
  - 数学公式

#### `src/types/` - TypeScript 类型
定义所有配置的类型：

- `SiteConfig` - 站点配置
- `NavBarConfig` - 导航栏配置
- `ProfileConfig` - 个人资料配置
- `LicenseConfig` - 许可配置
- `ExpressiveCodeConfig` - 代码高亮配置

#### `src/config.ts` - 站点配置
核心配置文件，包含：

```typescript
export const siteConfig: SiteConfig = {
  title: "Fuwari",
  subtitle: "Demo Site",
  lang: "en",
  themeColor: { hue: 250, fixed: false },
  banner: { enable: false, ... },
  toc: { enable: true, depth: 2 },
  favicon: [...],
};

export const navBarConfig: NavBarConfig = { ... };

export const profileConfig: ProfileConfig = { ... };

export const licenseConfig: LicenseConfig = { ... };
```

---

### 2. `public/` - 静态资源
直接复制到构建输出目录的文件：
- `favicon/` - 网站图标（32x32）
- 其他不经过处理的静态文件

---

## 配置文件说明

### `astro.config.mjs`
Astro 框架的主配置文件，定义：
- 集成插件
  - Tailwind CSS
  - Svelte
  - Swup（页面切换）
  - Iconify
  - Expressive Code（代码高亮）
  - Sitemap
- Markdown 配置
  - Remark 插件（数学公式、摘要、阅读时间等）
  - Rehype 插件（KaTeX、标题锚点、自定义组件）
- 图片服务
- Vite 构建选项

### `package.json`
定义项目依赖和可执行命令：

**脚本命令：**
- `pnpm dev` - 启动开发服务器（localhost:4321）
- `pnpm build` - 构建生产版本 + 生成 Pagefind 索引
- `pnpm preview` - 预览构建结果
- `pnpm check` - 运行 Astro 类型检查
- `pnpm new-post <filename>` - 创建新文章
- `pnpm format` - 使用 Biome 格式化代码
- `pnpm lint` - 使用 Biome 检查代码

**依赖包：**
- Astro 核心
- Svelte 集成
- Tailwind CSS
- Pagefind（搜索）
- Expressive Code（代码高亮）
- KaTeX（数学公式）
- Markdown 处理库
- 图标库

### `tsconfig.json`
TypeScript 配置：
- 继承 Astro 严格类型配置
- 路径别名：
  - `@components/*` → `src/components/*`
  - `@assets/*` → `src/assets/*`
  - `@constants/*` → `src/constants/*`
  - `@utils/*` → `src/utils/*`
  - `@i18n/*` → `src/i18n/*`
  - `@layouts/*` → `src/layouts/*`
  - `@/*` → `src/*`

### `.biome.json`
Biome 代码格式化和 lint 工具配置。

---

## 功能特性

### 1. Markdown 扩展语法
支持比标准 GitHub Flavored Markdown 更丰富的功能：

- **警告提示框** - 类似 GitHub 的 note, tip, important, caution, warning
- **GitHub 仓库卡片** - 直接嵌入 GitHub 仓库
- **代码高亮** - 基于 Expressive Code，支持折叠、行号、语言标识、复制按钮
- **数学公式** - 支持 LaTeX 格式的数学公式
- **文章摘要** - 自动提取文章前 N 行作为摘要

### 2. 站点配置
- 主题色自定义（HSL 色相值 0-360）
- 深色/浅色模式切换
- 顶部横幅图片
- 目录自动生成
- RSS 订阅支持
- 站点地图生成

### 3. 用户配置
- 头像
- 姓名、简介
- 社交链接（Twitter、GitHub 等）
- 许可协议显示

### 4. 文章元数据
- 标题、描述、封面图
- 发布日期
- 标签、分类
- 草稿模式（`draft: true`）
- 语言设置

### 5. 搜索功能
- 集成 Pagefind，提供全文搜索
- 构建时自动生成索引
- 实时搜索结果展示

### 6. 页面切换
- 使用 Swup 提供平滑的页面过渡动画
- 支持缓存和预加载

### 7. 响应式设计
- 移动端适配
- 触摸友好的交互

---

## 构建和部署

### 本地开发
```bash
pnpm install
pnpm dev
```
访问 http://localhost:4321

### 构建
```bash
pnpm build
```
构建输出到 `dist/` 目录

### 预览
```bash
pnpm preview
```

### 代码检查和格式化
```bash
pnpm check          # 类型检查
pnpm format         # 格式化
pnpm lint           # Lint 检查
```

### 创建新文章
```bash
pnpm new-post <filename>
```
新文章会创建在 `src/content/posts/` 目录

---

## 扩展开发

### 添加自定义组件
1. 在 `src/components/` 创建组件
2. 在 `src/layouts/` 或 `src/content/posts/` 中引入

### 自定义 Markdown 插件
1. 在 `src/plugins/` 创建插件文件
2. 在 `astro.config.mjs` 的 `remarkPlugins` 或 `rehypePlugins` 中注册

### 修改主题色
编辑 `src/config.ts` 中的 `themeColor.hue` 值

### 添加导航链接
编辑 `src/config.ts` 中的 `navBarConfig.links`

---

## 许可证
MIT License

---

## 参考资源
- [Astro 官方文档](https://astro.build)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Expressive Code 文档](https://expressive-code.com)
- [Pagefind 文档](https://pagefind.app)
- [Markdown 扩展语法示例](https://fuwari.vercel.app/posts/markdown-extended/)
