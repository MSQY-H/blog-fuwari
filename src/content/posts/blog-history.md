---
title: 用了两个月的 Hexo，还是换回 Astro：简述我的个人博客历程
published: 2026-08-26 16:00:00
description: '介绍了我的个人博客历程：从单 HTML 到 Astro 再到 Hexo，最后回到 Astro'
tags: ['Hexo', 'Fuwari', 'Astro']
category: '博客'
draft: false
lang: "zh-CN"
---
## 前言

最近，我还是把我的博客从 Hexo 换回了 Astro。为什么是换回？这还得从我最初的博客说起。

## 单 HTML 时期

我以前一直都觉得，拥有自己的网站是很不错的事情。去年年初，DeepSeek 火了。去年年底，我开始用 DeepSeek 写代码。当时还不懂 Vue React 这类前端框架，只知道网页可以用 HTML 写，DeepSeek 网页版也可以直接预览，于是我便采用单 HTML 来开始制作我自己的博客。

很快我就把博客写好了，但不知道怎么发布。我发现了 Cloudflare Pages，免费的静态部署平台，又搞到了个免费域名。很快，我就把博客正式发布了。可以[点击这里](https://ljxh-blog.cc.cd/)看一下。

其实，在严格意义上，这并不算真正的博客。里面的文章压根就不是我写的，全都是由 DeepSeek 写的，直接内嵌进 HTML 文件，根本无法方便的发布文章。如果文章过多，这个 HTML 文件就会特别大。

但是，这个博客让我学会了简单的 HTML、CSS 和 JavaScript，也增强了我 Vibe Coding 的能力，更让我知道，我也是能做网站的。这不在于我是否做出了真的博客，而在于它让我迈出了第一步。

于是便有了后面的故事。

## Astro 框架 Firefly 主题时期

后来，我发现了 Astro 框架。Astro 是一个很不错的框架，Firefly 主题也是很不错的主题，当时我一眼就相中了它。

很快，我的[第二版博客](https://life.ljxh-h.cc.cd/)就部署好了。这次，我有了真正的文章系统。不过，写了几篇文章后，我发现了 Hexo 的 Solitude 主题。恰到好处的毛玻璃、极具设计感的排版，让我十分喜欢。犹豫了几天后，我又将博客搬迁到 Hexo。

## Hexo 框架 Solitude 主题时期

但是，Bing 死活不收录我的域名。[这篇文章](/posts/domain-name-solutions/)详细介绍了这个情况。我决定采用 GitHub Pages 作为主域名。但是，因为一些原因，中国大陆访问 GitHub Pages 是非常慢的，特别是访问我的博客这种资源特别多的网站。

受不了的我，把博客换回到 Astro 的 Fuwari 主题。

## Astro 框架 Fuwari 主题时期

为什么不用 Firefly？其实是因为 Firefly 的 `workerd` 依赖需要下载二进制包，而 `wokerd` 没有专门为我调试使用的 Termux 环境编译二进制包。所以我只好回退到上游版本 Fuwari 主题，也顺便让我重新熟悉一下 Astro 框架。

我给 Fuwari 主题添加了一些魔改，这里放一些参考的链接，记录一下。

- [集成 Twikoo 评论系统](https://blog.canmoe.com/posts/fuwari-twikoo-guide/)
- [添加友链页面](https://aulypc1.github.io/posts/website/add_friendspage_in_fuwari/)
- [添加链接大卡片](https://blog.fis.ink/posts/30/)
- [添加随机按钮](https://pinpe.top/posts/random-post/)

Astro 真是太棒了！岛屿架构、零 JS 让访问速度大幅提升，也流畅了很多。

## 结尾

要说的就那么多，祝愿这个博客越来越好吧。