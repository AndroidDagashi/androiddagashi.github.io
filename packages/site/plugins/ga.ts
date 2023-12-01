declare global {
  interface Window {
    dataLayer: object[]
  }
}

export default defineNuxtPlugin((_nuxtApp) => {
  const router = useRouter()

  if (process.env.NODE_ENV === 'development') {
    return
  }

  if (document.getElementById('androiddagashi-ga')) {
    // ga tag already exists
    return
  }

  const newTag = document.createElement('script')
  newTag.id = 'androiddagashi-ga'
  newTag.async = true
  newTag.src = 'https://www.googletagmanager.com/gtag/js?id=UA-116221691-1'

  const s = document.getElementsByTagName('script')[0]
  s.parentNode?.insertBefore(newTag, s)

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'UA-116221691-1')

  router.afterEach((to, _from) => {
    gtag('config', 'UA-116221691-1', {
      // 'page_title': '',
      page_location: to.fullPath,
      // 'page_path': '/home'
    })
  })
})
