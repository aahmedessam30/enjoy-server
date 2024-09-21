const ImagesHandlers = (function () {
  function concatImage(url: string) {
    if (url && url !== "") {
      return "https://darkkom.fra1.digitaloceanspaces.com/uploads/" + url
    }
    return url
  }

  return {
    concatImage: concatImage,
  }
})()

export default ImagesHandlers
