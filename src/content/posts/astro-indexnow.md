---
title: Astro 博客配置 IndexNow
published: 2026-08-28 18:00:00
description: 介绍了如何使用 astro-indexnow 插件为 Astro 博客设置自动向 Bing IndexNow 提交 url
tags: ['Bing', 'Astro']
category: 博客
draft: false
lang: zh-CN
---
## 前言

Bing 有个功能，叫 IndexNow，我们可以使用这个功能让 Bing 更快知道我们的网站更新，并更新索引。那么，如何在 Astro 博客配置 IndexNow？

本文参考

::link-card{url="https://www.arcwolf.top/posts/indexnow/" title="为Astro添加IndexNow - Arcwolf Blog" description="为 Astro 添加 IndexNow，提高搜索引擎收录速度"}

编写。原作者为 [Arcwolf](https://www.arcwolf.top/)，原文章采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议。

## 配置方法

### 1. 安装插件

非常简单，没什么好说的。

``` bash title="npm"
npm install astro-indexnow --save
```

``` bash title="pnpm"
pnpm add astro-indexnow
```

``` bash title="yarn"
yarn add astro-indexnow
```

### 2. 获取 IndexNow API 密钥

打开 [Bing IndexNow 页面](https://www.bing.com/indexnow)，滑到底部，点击 `Get Started`，继续滑到底部，找到 `Generate API Key`，下面的一串很长的字符就是 API 密钥。

![获取 API 密钥](/images/astro-indexnow/get-api.webp)

记住他，复制下来。

### 3. 托管 API 密钥

在项目的 `public` 目录下新建一个与你的密钥同名的 txt 文件，并写入你的密钥到文件中。如：

假设你的密钥为 `123456`

那么文件则为：

``` txt title="/public/123456.txt"
123456
```

如果项目需要上传至 GitHub 且使用 GitHub Pages 部署，可先暂时跳过此步骤，参考第 5 步，以实现不泄漏密钥。

### 4. 设置插件

在 `astro.config.mjs` 添加下列代码：

``` mjs title="astro.config.mjs"
import { defineConfig } from "astro/config";
import indexnow from "astro-indexnow";

export default defineConfig({
  site: "https://example.com",
  integrations: [
    indexnow({
      key: process.env.INDEXNOW_KEY,
    }),
  ],
});
```

如果想要根据是否存在环境变量判断是否启用插件，可以像我一样使用条件展开。

``` mjs title="astro.config.mjs"
import { defineConfig } from "astro/config";
import indexnow from "astro-indexnow";

export default defineConfig({
  site: "https://example.com",
  integrations: [
    ...(process.env.INDEXNOW_KEY ? [indexnow({ key: process.env.INDEXNOW_KEY })] : []),
  ],
});
```

该方法不一定稳定，但能用。

配置完成后，配置 `.env` 环境变量以进行本地调试。

```
INDEXNOW_KEY=你的API密钥
INDEXNOW_ENDPOINT=https://www.bing.com/indexnow
```

如果不想公开密钥，那么千万不要把这个 .env 文件上传。

> [!TIP]
> 如果你使用的是Git部署，记得提交 `.astro-indexnow-cache.json` 文件。

### 5. 配置环境变量

#### 一般云平台

直接在云平台的环境变量配置页面添加下面的变量即可。

```
INDEXNOW_KEY=你的API密钥
INDEXNOW_ENDPOINT=https://www.bing.com/indexnow
```

#### GitHub Pages

对于使用 GitHub Actions 部署的 GitHub Pages，需要在 Actions 的配置文件添加一些内容。

假设你的配置文件名为 `deploy.yml`，那么你需要在 `deploy.yml` 添加以下内容：

在 `pnpm build` 操作前添加：

``` yml title="deploy.yml"
- name: Create IndexNow key file
        run: echo "${{ secrets.INDEXNOW_KEY }}" > public/${{ secrets.INDEXNOW_KEY }}.txt
```

以生成第 3 步中的文件。

同时，你需要在 `pnpm build` 操作添加：

``` yml title="deploy.yml" ins={2-4}
- name: Build site
        env:
          INDEXNOW_KEY: ${{ secrets.INDEXNOW_KEY }}
          INDEXNOW_ENDPOINT: ${{ secrets.INDEXNOW_ENDPOINT }}
        run: pnpm build
```

并打开 GitHub 项目，选择 `Settings` > `Secrets and variables` > `Actions` > `Secrets`，添加上面的变量：

```
INDEXNOW_KEY=你的API密钥
INDEXNOW_ENDPOINT=https://www.bing.com/indexnow
```

最后执行部署操作。

### 检查

不出意外的话，你应该能在构建日志中看到类似这些：

```
07:55:43 [astro-indexnow] submitting 15 URL(s) in 1 batch(es) [mode=changed, batchSize=10000]
07:55:43 [astro-indexnow] summary: scanned=15, changed=15, batched=1, submitted=15
07:55:43 [astro-indexnow] IndexNow submission complete
```

接着再前往 Bing Webmaster Tools 检查有没有刚刚提交的 url。

恭喜你，成功了！

## 结尾

在这篇文章，我们成功使用 astro-indexnow 插件为 Astro 博客设置自动向 Bing IndexNow 提交 url。以后每次构建，插件会自动提交 url，不用手动提交了！