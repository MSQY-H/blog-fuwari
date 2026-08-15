<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import {
    computeTocItems,
    getVisibleSlugs,
    updateTocItems,
    updateIndicator,
    extractTocInputs,
  } from "@/utils/floating-toolbar";
  import { setTheme, getStoredTheme } from "@/utils/setting-utils";
  import { LIGHT_MODE, DARK_MODE, AUTO_MODE } from "@constants/constants.ts";
  import type { LIGHT_DARK_MODE } from "@/types/config";
  import "@/styles/floating-toolbar.css";

  let isHome = false;
  let isPost = false;
  let showToc = false;
  let hasHeadings = false;
  let themeMode: LIGHT_DARK_MODE = AUTO_MODE;
  let scrollProgress = 0;
  let showButtonGroup = true;
  let fadeTimer: number | null = null;
  let items: {
    slug: string;
    text: string;
    depth: number;
    depthLevel: 0 | 1 | 2;
    badgeKind: "index" | "dot" | "dot-sm";
    badgeIndex?: number;
    labelPrimary: boolean;
  }[] = [];
  let popupElement: HTMLElement | null = null;
  let ticking = false;
  let updateTimer: number | null = null;
  let mutationObserver: MutationObserver | null = null;

  const themeSeq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, AUTO_MODE];

  function clearAllTimers() {
    if (fadeTimer) clearTimeout(fadeTimer);
    if (updateTimer) clearTimeout(updateTimer);
    ticking = false;
  }

  function refreshButtonGroupImmediate() {
    clearAllTimers();
    showToc = false;
    items = [];
    hasHeadings = false;
    if (isPost) {
      setTimeout(extractHeadings, 50);
    }
  }

  function syncThemeMode() {
    themeMode = getStoredTheme();
  }

  function toggleTheme() {
    let i = 0;
    for (; i < themeSeq.length; i++) {
      if (themeSeq[i] === themeMode) break;
    }
    const next = themeSeq[(i + 1) % themeSeq.length];
    setTheme(next);
    themeMode = next;
  }

  function scrollToComment() {
    let commentEl = document.getElementById("comment-section");
    if (!commentEl) {
      commentEl = document.querySelector(".twikoo, #twikoo, .tk-comment");
    }
    if (commentEl) {
      commentEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updateVisibility() {
    if (!popupElement || !isPost || !showToc) return;
    const article = document.querySelector(".prose");
    if (!article) return;

    const visibleSlugs = getVisibleSlugs(article);
    const { first, last } = updateTocItems(popupElement, visibleSlugs);
    updateIndicator(popupElement, first, last);

    if (first) scrollToActiveIfNeeded(first);
  }

  function scrollToActiveIfNeeded(activeItem: HTMLElement) {
    if (!popupElement) return;
    const container = popupElement;
    const rect = activeItem.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    const isVisible = rect.top >= cRect.top && rect.bottom <= cRect.bottom;
    if (!isVisible) {
      const top =
        (activeItem as HTMLElement).offsetTop -
        container.clientHeight / 2 +
        (activeItem as HTMLElement).offsetHeight / 2;
      container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = window.setTimeout(() => {
        updateVisibility();
        updateTimer = null;
      }, 300);
    }
  }

  function extractHeadings() {
    if (!isPost) {
      items = [];
      hasHeadings = false;
      return;
    }
    try {
      const article = document.querySelector(".prose");
      if (!article) {
        items = [];
        hasHeadings = false;
        return;
      }
      const inputs = extractTocInputs(article);
      const tocItems = computeTocItems(inputs, { maxLevel: 3 });
      items = tocItems.map((item) => ({
        slug: item.headingId,
        text: item.text,
        depth: item.depthLevel + 1,
        depthLevel: item.depthLevel,
        badgeKind: item.badgeKind,
        badgeIndex: item.badgeIndex,
        labelPrimary: item.labelPrimary,
      }));
      hasHeadings = items.length > 0;
      if (showToc && hasHeadings) setTimeout(updateVisibility, 100);
    } catch (e) {
      console.error("extractHeadings error:", e);
      items = [];
      hasHeadings = false;
    }
  }

  function updatePathState(): boolean {
    const path = window.location.pathname;
    const newHome = path === "/" || path === "/index.html";
    const newPost = path.startsWith("/posts/");
    if (newHome !== isHome || newPost !== isPost) {
      isHome = newHome;
      isPost = newPost;
      return true;
    }
    return false;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToHeading(slug: string) {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      showToc = false;
    }
  }

  function toggleToc() {
    if (!hasHeadings) return;
    showToc = !showToc;
    if (showToc) setTimeout(updateVisibility, 100);
  }

  function handleWindowScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    if (isPost && showToc && popupElement && !ticking) {
      window.requestAnimationFrame(() => {
        updateVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }

  onMount(() => {
    syncThemeMode();

    mutationObserver = new MutationObserver(() => {
      syncThemeMode();
    });
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        syncThemeMode();
      }
    };
    window.addEventListener("storage", handleStorage);

    updatePathState();
    if (isPost) setTimeout(extractHeadings, 100);

    const onPageChange = () => {
      const changed = updatePathState();
      if (changed) {
        refreshButtonGroupImmediate();
      } else if (isPost) {
        setTimeout(extractHeadings, 100);
      }
    };

    document.addEventListener("swup:page:view", onPageChange);
    document.addEventListener("astro:page-load", onPageChange);
    window.addEventListener("popstate", () => {
      setTimeout(() => {
        const changed = updatePathState();
        if (changed) refreshButtonGroupImmediate();
        if (isPost) setTimeout(extractHeadings, 100);
      }, 50);
    });
    window.addEventListener("hashchange", () => { showToc = false; });
    document.addEventListener("password:decrypted", () => {
      if (isPost) setTimeout(extractHeadings, 200);
    });
    window.addEventListener("scroll", handleWindowScroll);
    handleWindowScroll();

    return () => {
      document.removeEventListener("swup:page:view", onPageChange);
      document.removeEventListener("astro:page-load", onPageChange);
      window.removeEventListener("popstate", onPageChange);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("storage", handleStorage);
      if (mutationObserver) mutationObserver.disconnect();
      clearAllTimers();
    };
  });
</script>

<div class="floating-toolbar">
  {#if showToc && hasHeadings}
    <div
      bind:this={popupElement}
      class="toc-popup"
      transition:scale={{
        start: 0.85,
        duration: 150,
        easing: (t) => t * (2 - t),
      }}
    >
      <nav id="floating-toc-content" class="toc-popup-nav">
        {#each items as item}
          <a
            href="#{item.slug}"
            class="toc-popup-item toc-level-{item.depthLevel}"
            data-heading-id={item.slug}
            on:click|preventDefault={() => scrollToHeading(item.slug)}
          >
            <span class="toc-popup-badge">
              {#if item.badgeKind === "index"}
                <span class="toc-badge-index">{item.badgeIndex}</span>
              {:else if item.badgeKind === "dot"}
                <span class="toc-badge-dot"></span>
              {:else}
                <span class="toc-badge-dot toc-badge-dot-sm"></span>
              {/if}
            </span>
            <span class="toc-popup-label {item.labelPrimary ? 'label-primary' : 'label-secondary'}">
              {item.text}
            </span>
          </a>
        {/each}
        <div id="floating-toc-indicator" class="toc-active-indicator" style="opacity: 0;"></div>
      </nav>
    </div>
  {/if}

  {#if showButtonGroup}
    <div class="button-group">
      <button class="toolbar-btn theme-btn" on:click={toggleTheme} aria-label="切换主题">
        {#if themeMode === LIGHT_MODE}
          <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem]" />
        {:else if themeMode === DARK_MODE}
          <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem]" />
        {:else}
          <Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.25rem]" />
        {/if}
      </button>

      {#if !isHome && isPost}
        <button class="toolbar-btn" on:click={toggleToc} aria-label="目录">
          <Icon icon="material-symbols:list-rounded" class="text-[1.25rem]" />
        </button>
      {/if}

      {#if !isHome && isPost}
        <button class="toolbar-btn" on:click={scrollToComment} aria-label="评论">
          <Icon icon="material-symbols:comment-rounded" class="text-[1.25rem]" />
        </button>
      {/if}

      <button class="toolbar-btn back-to-top" on:click={scrollToTop} aria-label="回到顶部">
        <svg class="progress-ring" width="100%" height="100%" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="20" fill="none" stroke="var(--line-divider)" stroke-width="1.5" opacity="0.25" />
          <circle
            class="progress-ring-fill"
            cx="22" cy="22" r="20"
            fill="none" stroke="var(--primary)" stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="125.664"
            stroke-dashoffset={125.664 * (1 - scrollProgress)}
            transform="rotate(-90 22 22)"
          />
        </svg>
        <Icon icon="material-symbols:arrow-upward-rounded" class="text-[1.25rem] back-to-top-icon" />
      </button>
    </div>
  {/if}
</div>