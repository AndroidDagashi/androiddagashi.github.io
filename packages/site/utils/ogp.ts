import type { MetaPropertyName, MetaPropertyProperty } from 'vue-meta'

interface OGPProperties {
  title?: string
  description?: string
  url?: string
  image?: string
}

export function renderOGPMeta(
  properties: OGPProperties
): (MetaPropertyProperty | MetaPropertyName)[] {
  const results: (MetaPropertyProperty | MetaPropertyName)[] = []

  if (properties.title) {
    results.push({
      property: 'og:title',
      hid: 'og:title',
      content: properties.title,
    })
  }

  if (properties.description) {
    results.push({
      name: 'description',
      hid: 'description',
      content: properties.description,
    })
    results.push({
      property: 'og:description',
      hid: 'og:description',
      content: properties.description,
    })
  }

  if (properties.url) {
    results.push({
      property: 'og:url',
      hid: 'og:url',
      content: properties.url,
    })
  }

  if (properties.image) {
    results.push({
      property: 'og:image',
      hid: 'og:image',
      content: properties.image,
    })
  }
  return results
}
