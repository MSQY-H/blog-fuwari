<style>
  /* --- 个性签名部分 --- */
  .sign{
    background: var(--license-block-bg);
    padding: 1rem 1.25rem;
    border-radius: var(--radius-large);
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    transition-duration: .15s;
  }
  .sign-value{
    font-weight: bold;
    font-size: 1.5rem;
  }
  .signer{
    text-align: right;
    font-size: 1.25rem;
  }
  /* --- 技术部分 --- */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  .tech-card {
    background: var(--license-block-bg);
    padding: 1rem 1.25rem;
    border-radius: var(--radius-large);
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    transition-duration: .15s;
  }
  .tech-label {
    font-size: 0.88rem;
    opacity: 0.6;
    letter-spacing: 0.025em;
  }
  .tech-value {
    font-weight: 500;
    color: var(--tw-prose-headings);
  }
  /* --- 图片比例裁剪 --- */
  img[alt*="火车"],
  img[alt*="周杰伦"] {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  /* --- 博客技术栈 --- */
  .act-card:hover {
    background-color: var(--btn-regular-bg-hover);
    cursor: pointer;
  }
  .act-card:active{
    scale: .98;
    background-color: var(--btn-regular-bg-active);
  }
</style>
# 关于

![MC 风景](./about/mc.webp)

大家好，我是 **MSQY**，一个**学生**、**独立开发者**，这里是 **MSQY 的博客**！

欢迎大家(∠・ω< )⌒☆

---

<div class="sign">
  <span class="sign-value">NVIDIA GeForce RTX 5060 Ti!</span>
  <span class="signer">——MSQY</span>
</div>

---

![DeepSeek](./about/deepseek.webp)

下面是我玩过的东西。既然是“玩过”，那就不一定精通了。

<div class="tech-grid">
  <div class="tech-card">
    <span class="tech-label">编程语言</span>
    <span class="tech-value">Python、C++、Java</span>
  </div>
  <div class="tech-card">
    <span class="tech-label">软件框架</span>
    <span class="tech-value">Vue.js、Astro、Android Framework</span>
  </div>
  <div class="tech-card">
    <span class="tech-label">操作系统</span>
    <span class="tech-value">Windows、Arch Linux、Android</span>
  </div>
  <div class="tech-card">
    <span class="tech-label">人工智能</span>
    <span class="tech-value">DeepSeek</span>
  </div>
  <div class="tech-card">
    <span class="tech-label">Shell</span>
    <span class="tech-value">Zsh</span>
  </div>
  <div class="tech-card">
    <span class="tech-label">代码编辑器</span>
    <span class="tech-value">Visual Studio Code</span>
  </div>
</div>

话说我好久都没有直接写过代码了，现在都是找 DeepSeek 帮我写的。~~CV 工程师变 Vibe Coding 工程师了~~。DeepSeek 真是太棒了😋。:spoiler[梁圣万岁！\（T口T）/]

---

![火车](./about/railway.webp)

我平时喜欢拍拍**火车**。

也喜欢玩玩**游戏**，最近在玩 **Minecraft** 和 **Forza Horizon** 4。:spoiler[感谢地平线，让我学会了 「broaden our horizons」这个短语，为我的英语作文加了 1 分！]

至于音乐，我比较喜欢听[周杰伦](https://music.apple.com/cn/artist/%E5%91%A8%E6%9D%B0%E4%BC%A6/300117743)的。下面是几首我喜欢听的歌。

<div class="tech-grid">
  <div class="tech-card act-card" onclick="window.open('https://music.apple.com/cn/song/%E5%A4%9C%E6%9B%B2/536009642', '_blank');">
    <span class="tech-value">夜曲</span>
    <span class="tech-label">周杰伦</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://music.apple.com/cn/song/花海/1624001317', '_blank');">
    <span class="tech-value">花海</span>
    <span class="tech-label">周杰伦</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://music.apple.com/cn/song/haltija/1686229873', '_blank');">
    <span class="tech-value">Haltija</span>
    <span class="tech-label">Etherwood</span>
  </div>
</div>

---

![地平线风景](./about/horizon2.webp)

下面是博客的技术栈

<div class="tech-grid">
  <div class="tech-card act-card" onclick="window.open('https://github.com/withastro/astro', '_blank');">
    <span class="tech-label">框架</span>
    <span class="tech-value">Astro</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://github.com/saicaca/fuwari', '_blank');">
    <span class="tech-label">主题</span>
    <span class="tech-value">Fuwari</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://github.com/denoland/deno', '_blank');">
    <span class="tech-label">包管理器</span>
    <span class="tech-value">Deno</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://github.com/', '_blank');">
    <span class="tech-label">主站部署平台</span>
    <span class="tech-value">Github Pages</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://cloudflare.com', '_blank');">
    <span class="tech-label">镜像站部署平台</span>
    <span class="tech-value">Cloudflare Pages</span>
  </div>
</div>

这里是博客源码：

::github{repo="MSQY-H/blog-fuwari"}

由于受不了 Hexo Solitude 部署在 GitHub Pages 上的超慢加载速度，我还是换到了 Astro Fuwari。~~别问为什么不用功能更多的 Astro Firefly，问就是依赖太多，有些没有办法在 Termux 上安装~~

Astro 真是太快了！

---

![Minecraft](./about/mc2.webp)

可以这样联系我：

<div class="tech-grid">
  <div class="tech-card act-card" onclick="window.open('mailto:Hydroxid_Hualin@outlook.com', '_blank');">
    <span class="tech-label">邮箱</span>
    <span class="tech-value">Hydroxid_Hualin@outlook.com</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('https://github.com/MSQY-H', '_blank');">
    <span class="tech-label">GitHub</span>
    <span class="tech-value">MSQY-H</span>
  </div>
</div>

---

> - 本页面参考了 [Pinpe](https://github.com/Pinpe) 大佬的排版和样式
> - 如无特别标注，本页面图片均为本人拍摄或制作