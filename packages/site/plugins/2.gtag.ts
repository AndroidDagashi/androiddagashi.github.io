import { defineNuxtPlugin, useRouter } from '#imports'

const GA_ID = 'UA-116221691-1'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const newTag = document.createElement('script')
  newTag.async = true
  newTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

  const existingTag = document.getElementsByTagName('script')[0]
  existingTag.parentNode!.insertBefore(newTag, existingTag)

  // @ts-ignore
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    // @ts-ignore
    window.dataLayer.push(args)
  }
  // @ts-ignore
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_ID)

  const router = useRouter()
  router.afterEach((to, _from) => {
    gtag('config', GA_ID, {
      page_path: to.fullPath,
    })
  })
})
