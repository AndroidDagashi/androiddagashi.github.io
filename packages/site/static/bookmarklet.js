export default (w) => {
  const title = encodeURIComponent(w.document.title)
  const url = encodeURIComponent(w.location.href)
  w.location = `https://github.com/AndroidDagashi/AndroidDagashi/issues/new?title=${title}&body=${url}`
}
