const scriptsToLoad = [
  { id: 'twitterScript', src: '//platform.twitter.com/widgets.js' },
  { id: 'hatenaScript', src: 'https://b.st-hatena.com/js/bookmark_button.js' },
]

const loadScript = (document: Document, id: string, src: string) => {
  const previous = document.getElementById(id)
  if (previous) {
    previous.parentNode?.removeChild(previous)
  }

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.defer = true
  script.src = `${src}?adt=${Date.now()}`
  script.id = id

  const s = document.getElementsByTagName('script')[0]
  s.parentNode?.insertBefore(script, s)
}

export const loadScripts = (document: Document): void => {
  scriptsToLoad.forEach(({ id, src }) => loadScript(document, id, src))
}
