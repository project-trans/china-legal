import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { type State } from 'mdast-util-to-hast'
import { normalizeUri } from 'micromark-util-sanitize-uri'
import { type Properties, type Element } from 'hast'
import { type Link } from 'mdast'
import { isRelative } from 'ufo'
import type { MarkdownOptions, MarkdownPlugin, MarkdownParsedContent } from '@nuxt/content'
import { defineTransformer } from '@nuxt/content/transformers'
import { generatePath } from '@nuxt/content/transformers/path-meta'

export default defineTransformer({
  name: 'markdown',
  extensions: ['.md'],
  parse: async (_id, content, options = {}) => {
    const config = { ...options } as MarkdownOptions
    config.rehypePlugins = await importPlugins(config.rehypePlugins)
    config.remarkPlugins = await importPlugins(config.remarkPlugins)

    const highlightOptions = options.highlight
      ? {
          ...options.highlight,
          // Pass only when it's an function. String values are handled by `@nuxtjs/mdc`
          highlighter: typeof options.highlight?.highlighter === 'function'
            ? options.highlight.highlighter
            : undefined
        }
      : undefined

    const parsed = await parseMarkdown(content as string, {
      ...config,
      highlight: highlightOptions,
      remark: {
        plugins: config.remarkPlugins
      },
      rehype: {
        options: {
          handlers: {
            link: link as any
          },
          footnoteLabel:"注释",
          footnoteLabelProperties:{},
        },
        plugins: config.rehypePlugins
      },
      toc: config.toc
    })

    if (_id && !parsed.layout) {
      if (_id.startsWith('content:spec:')){
        parsed.data.layout = 'spec'
      }
    }

    return <MarkdownParsedContent>{
      ...parsed.data,
      excerpt: parsed.excerpt,
      body: {
        ...parsed.body,
        toc: parsed.toc
      },
      _type: 'markdown',
      _id
    }
  }
})

async function importPlugins (plugins: Record<string, false | MarkdownPlugin> = {}) {
  const resolvedPlugins: Record<string, false | MarkdownPlugin & { instance: any }> = {}
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: plugin.instance || await import(/* @vite-ignore */ name).then(m => m.default || m),
        options: plugin
      }
    } else {
      resolvedPlugins[name] = false
    }
  }
  return resolvedPlugins
}

function link (state: State, node: Link & { attributes?: Properties }) {
  const properties: Properties = {
    ...((node.attributes || {})),
    href: normalizeUri(normalizeLink(node.url))
  }

  if (node.title !== null && node.title !== undefined) {
    properties.title = node.title
  }

  const result: Element = {
    type: 'element',
    tagName: 'a',
    properties,
    children: state.all(node)
  }
  state.patch(node, result)
  return state.applyData(node, result)
}

function normalizeLink (link: string) {
  const match = link.match(/#.+$/)
  const hash = match ? match[0] : ''
  if (link.replace(/#.+$/, '').endsWith('.md') && (isRelative(link) || (!/^https?/.test(link) && !link.startsWith('/')))) {
    return (generatePath(link.replace('.md' + hash, ''), { forceLeadingSlash: false }) + hash)
  } else {
    return link
  }
}