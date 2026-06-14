import MarkdownIt from 'markdown-it'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })

  const defualtLinkRenderer =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, _env, self): string => {
      return self.renderToken(tokens, idx, options)
    })

  const defaultStyleRenderer =
    md.renderer.rules.image ||
    ((tokens, idx, options, _env, self): string => {
      return self.renderToken(tokens, idx, options)
    })

  md.renderer.rules.link_open = (tokens, idx, options, env, self): string => {
    const token = tokens[idx]
    if (!token) return defualtLinkRenderer(tokens, idx, options, env, self)

    const aIndex = token.attrIndex('target')

    if (aIndex < 0) {
      token.attrPush(['target', '_blank'])
    } else if (token.attrs) {
      token.attrs[aIndex]![1] = '_blank'
    }

    return defualtLinkRenderer(tokens, idx, options, env, self)
  }

  md.renderer.rules.image = (tokens, idx, options, env, self): string => {
    const token = tokens[idx]
    if (!token) return defaultStyleRenderer(tokens, idx, options, env, self)

    const styleIndex = token.attrIndex('style')

    if (styleIndex < 0) {
      token.attrPush(['style', 'max-width: 100%;'])
    }

    return defaultStyleRenderer(tokens, idx, options, env, self)
  }

  return {
    provide: {
      md,
    },
  }
})
