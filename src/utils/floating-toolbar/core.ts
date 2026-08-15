import { type TocInput } from "./toc-shared";

export function getContentBlockRect(headingEl: HTMLElement): DOMRect | null {
  const container = headingEl.closest(".prose");
  if (!container) return null;

  let parent = headingEl.parentElement;
  while (parent && parent.tagName !== "SECTION") {
    parent = parent.parentElement;
  }
  if (parent && parent.tagName === "SECTION") {
    return parent.getBoundingClientRect();
  }

  const allHeadings = Array.from(container.querySelectorAll("h1,h2,h3,h4,h5,h6"));
  const idx = allHeadings.indexOf(headingEl);
  if (idx === -1) return null;

  let nextHeading: Element | null = allHeadings[idx + 1] || null;
  const range = document.createRange();
  range.setStartAfter(headingEl);
  if (nextHeading) {
    range.setEndBefore(nextHeading);
  } else {
    range.setEndAfter(container.lastChild as Node);
  }

  const rects = range.getClientRects();
  if (rects.length === 0) return null;
  let merged = rects[0];
  for (let i = 1; i < rects.length; i++) {
    const r = rects[i];
    merged = new DOMRect(
      Math.min(merged.left, r.left),
      Math.min(merged.top, r.top),
      Math.max(merged.right, r.right) - Math.min(merged.left, r.left),
      Math.max(merged.bottom, r.bottom) - Math.min(merged.top, r.top)
    );
  }
  return merged;
}

export function isRectInViewport(rect: DOMRect): boolean {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  return rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
}

export function extractTocInputs(article: Element): TocInput[] {
  const headingEls = article.querySelectorAll("h1,h2,h3,h4,h5,h6");
  return Array.from(headingEls).map((el) => ({
    slug: el.id || el.textContent?.toLowerCase().replace(/\s/g, "-") || "",
    text: el.textContent || "",
    depth: parseInt(el.tagName[1]),
  }));
}

export function getVisibleSlugs(article: Element): string[] {
  const headings = article.querySelectorAll("h1,h2,h3,h4,h5,h6");
  const visible: string[] = [];
  for (const el of headings) {
    const slug = el.id || el.textContent?.toLowerCase().replace(/\s/g, "-") || "";
    if (!slug) continue;
    const rect = getContentBlockRect(el as HTMLElement);
    if (rect && isRectInViewport(rect)) {
      visible.push(slug);
    }
  }
  return visible;
}

export function updateTocItems(
  container: HTMLElement,
  visibleSlugs: string[]
): { first: HTMLElement | null; last: HTMLElement | null } {
  const items = container.querySelectorAll(".toc-popup-item");
  let first: HTMLElement | null = null;
  let last: HTMLElement | null = null;

  items.forEach((item) => {
    const slug = item.getAttribute("data-heading-id");
    if (slug && visibleSlugs.includes(slug)) {
      item.classList.add("visible");
      if (!first) first = item as HTMLElement;
      last = item as HTMLElement;
    } else {
      item.classList.remove("visible");
    }
  });
  return { first, last };
}

export function updateIndicator(
  container: HTMLElement,
  first: HTMLElement | null,
  last: HTMLElement | null
): void {
  const indicator = document.getElementById("floating-toc-indicator");
  if (!indicator || !first || !last) {
    if (indicator) indicator.style.opacity = "0";
    return;
  }

  const nav = container.querySelector(".toc-popup-nav") || container;
  const navRect = nav.getBoundingClientRect();

  const firstRect = first.getBoundingClientRect();
  const lastRect = last.getBoundingClientRect();

  const top = firstRect.top - navRect.top;
  const height = lastRect.bottom - firstRect.top;

  indicator.style.top = `${top}px`;
  indicator.style.height = `${height}px`;
  indicator.style.opacity = "1";
}