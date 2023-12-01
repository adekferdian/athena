export const imageURL2File = async (imageURL: string) => {
  const response = await fetch(imageURL)
  // here image is url/location of image
  const blob = await response.blob()
  const split = imageURL.split('/')
  const name = split[split.length - 1]
  return new File([blob], name, {type: blob.type})
}
