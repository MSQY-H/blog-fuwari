import { visit } from 'unist-util-visit'
import type { Root, Element, ElementContent } from 'hast'

/**
 * Rehype 插件：为带有 title 属性的 <img> 包裹 <figure> 和 <figcaption>
 * 支持上标语法：在 title 中用 ^任意文本 表示上标（支持括号模式）
 *
 * 示例：
 *   "DeepSeek^®"          → DeepSeek<sup>®</sup>
 *   "DeepSeek^(v2.0) 是"  → DeepSeek<sup>v2.0</sup> 是
 */
export function rehypeFigcaption() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index: number | null | undefined, parent: Element | null | undefined) => {
      // 只处理 img 标签
      if (node.tagName !== 'img') return

      // 如果父节点已经是 figure，跳过
      if (parent && parent.tagName === 'figure') return

      const title = node.properties?.title
      if (!title || typeof title !== 'string' || title.trim().length === 0) return

      // 复制 img 属性并合并 className
      const imgProps = { ...node.properties }
      let existingClass = imgProps.className || ''
      if (Array.isArray(existingClass)) {
        existingClass = existingClass.join(' ')
      }
      const newClass = ['max-w-full', 'h-auto', 'rounded-lg', ...existingClass.split(' ').filter(Boolean)].join(' ')
      imgProps.className = newClass

      // 解析 title 中的上标标记
      const children = parseSupMarkers(title)

      // 构建 figure 节点
      const figureNode: Element = {
        type: 'element',
        tagName: 'figure',
        properties: { className: 'my-4 flex flex-col items-center' },
        children: [
          {
            type: 'element',
            tagName: 'img',
            properties: imgProps,
            children: [],
          },
          {
            type: 'element',
            tagName: 'figcaption',
            properties: { className: 'mt-2 text-sm text-gray-500 text-center' },
            children: children as ElementContent[],
          },
        ],
      }

      // 替换当前节点
      if (index !== undefined && index !== null && parent) {
        parent.children[index] = figureNode
        return 'skip'
      }
    })
  }
}

/**
 * 解析上标标记，支持两种语法：
 * 1. ^单词        → 上标内容为非空格字符（如 ^注）
 * 2. ^(任意文本)  → 括号内的所有内容作为上标（可含空格）
 */
function parseSupMarkers(text: string): ElementContent[] {
  const parts: ElementContent[] = []
  let i = 0

  while (i < text.length) {
    if (text[i] === '^') {
      // 检查括号模式
      if (i + 1 < text.length && text[i + 1] === '(') {
        let j = i + 2
        let depth = 1
        while (j < text.length && depth > 0) {
          if (text[j] === '(') depth++
          else if (text[j] === ')') depth--
          j++
        }
        if (depth === 0) {
          const content = text.slice(i + 2, j - 1)
          parts.push({
            type: 'element',
            tagName: 'sup',
            children: [{ type: 'text', value: content }],
          })
          i = j
          continue
        }
        // 无匹配括号，降级为普通文本
      } else {
        // 简写模式：匹配到空格或结尾
        let j = i + 1
        while (j < text.length && !/\s/.test(text[j])) {
          j++
        }
        const content = text.slice(i + 1, j)
        if (content.length > 0) {
          parts.push({
            type: 'element',
            tagName: 'sup',
            children: [{ type: 'text', value: content }],
          })
          i = j
          continue
        }
      }
    }
    // 普通文本：收集到下一个 '^' 之前
    let j = i
    while (j < text.length && text[j] !== '^') {
      j++
    }
    if (j > i) {
      parts.push({ type: 'text', value: text.slice(i, j) })
    }
    i = j
  }

  return parts
}