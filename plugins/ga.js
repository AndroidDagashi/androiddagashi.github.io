/* eslint-disable */

export default ({ app }) => {

  if (process.env.NODE_ENV === 'development') {
    return;
  }

  var newTag = document.createElement('script');
  newTag.async = true;
  newTag.src = 'https://www.googletagmanager.com/gtag/js?id=UA-116221691-1';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(newTag, s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', 'UA-116221691-1');

  app.router.afterEach((to, from) => {
    gtag('config', 'UA-116221691-1', {
      // 'page_title': '',
      'page_location': to.fullPath,
      // 'page_path': '/home'
    });
  })
};

