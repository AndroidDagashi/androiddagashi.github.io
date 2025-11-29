import type { Meta, DataKeys, SchemaAugmentations } from 'unhead/types'

interface OGPProperties {
  title?: string
  description?: string
  url?: string
  image?: string
}


type MetaTag = Meta & DataKeys & SchemaAugmentations['meta']

export function renderOGPMeta(properties: OGPProperties): MetaTag[] {
  const results: MetaTag[] = []

  if (properties.title) {
    results.push({
      property: 'og:title',
      content: properties.title,
    })
  }

  if (properties.description) {
    results.push({
      name: 'description',
      content: properties.description,
    })
    results.push({
      property: 'og:description',
      content: properties.description,
    })
  }

  if (properties.url) {
    results.push({
      property: 'og:url',
      content: properties.url,
    })
  }

  if (properties.image) {
    results.push({
      property: 'og:image',
      content: properties.image,
    })
  }
  return results
}
