import { Context } from '@nuxt/types'
import MarkdownIt from 'markdown-it'

export default (
  _: Context,
  inject: (key: string, value: unknown) => void
): Promise<void> | void => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })

  const defualtRenderer =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, _env, self): string => {
      return self.renderToken(tokens, idx, options)
    })

  md.renderer.rules.link_open = (tokens, idx, options, env, self): string => {
    const aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank'])
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tokens[idx].attrs![aIndex][1] = '_blank'
    }

    return defualtRenderer(tokens, idx, options, env, self)
  }

  inject('md', md)
}
