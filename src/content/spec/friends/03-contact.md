---
title: 联系方式
order: 3
---
<style>
.act-card:hover {
    background-color: var(--btn-regular-bg-hover);
    cursor: pointer;
  }
  .act-card:active{
    scale: .98;
    background-color: var(--btn-regular-bg-active);
  }
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
</style>
你可以这样找到我！

<div class="tech-grid">
  <div class="tech-card act-card" onclick="window.open('mailto:Hydroxid_Hualin@outlook.com', '_blank');">
    <span class="tech-label">邮箱</span>
    <span class="tech-value">Hydroxid_Hualin@outlook.com</span>
  </div>
  <div class="tech-card act-card" onclick="window.open('/message/', '_blank');">
    <span class="tech-label">留言页</span>
    <span class="tech-value">在这里留言</span>
  </div>
</div>

欢迎各位交换友链喵！