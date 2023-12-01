import {Area} from 'react-easy-crop/types'

export const createImage = (url: string) =>
  new Promise((resolve: (image: HTMLImageElement) => void, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export async function resizeImg(
  canvas: HTMLCanvasElement,
  target: {width: number; height: number}
): Promise<HTMLCanvasElement> {
  const resCanvas = document.createElement('canvas')
  const resCtx = resCanvas.getContext('2d')

  const scaleFactor = Math.max(target.width, target.height) / Math.max(canvas.width, canvas.height)

  if (scaleFactor >= 1) return canvas
  resCanvas.width = Math.floor(canvas.width * scaleFactor)
  resCanvas.height = Math.floor(canvas.height * scaleFactor)

  resCtx?.drawImage(canvas, 0, 0, resCanvas.width, resCanvas.height)

  return resCanvas
}

export async function getCroppedCanvas(
  imageSrc: string,
  pixelCrop?: Area,
  target: {width: number; height: number} | undefined = undefined,
  rotation = 0,
  flip = {horizontal: false, vertical: false}
): Promise<HTMLCanvasElement | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const {width: bBoxWidth, height: bBoxHeight} = rotateSize(image.width, image.height, rotation)

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  if (!pixelCrop) pixelCrop = {x: 0, y: 0, width: bBoxWidth, height: bBoxHeight}
  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0)

  return target ? resizeImg(canvas, target) : canvas
}

export async function getCroppedPixels(
  imageSrc: string,
  pixelCrop?: Area,
  target: {width: number; height: number} | undefined = undefined,
  rotation = 0,
  flip = {horizontal: false, vertical: false}
): Promise<{data: number[]; shape: [number, number, number]} | null> {
  const resCanvas = await getCroppedCanvas(imageSrc, pixelCrop, target, rotation, flip)
  if (!resCanvas) return null

  const data = (resCanvas.getContext('2d')?.getImageData(0, 0, resCanvas.width, resCanvas.height)
    ?.data ?? []) as number[]

  return {data, shape: [resCanvas.width, resCanvas.height, 4]}
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  target: {width: number; height: number; isPng?: boolean} | undefined = undefined,
  rotation = 0,
  flip = {horizontal: false, vertical: false}
): Promise<Blob | null> {
  const resCanvas = await getCroppedCanvas(imageSrc, pixelCrop, target, rotation, flip)
  if (!resCanvas) return null

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    resCanvas.toBlob(
      (file) => {
        resolve(file)
      },
      target?.isPng ? 'image/png' : 'image/jpeg'
    )
  })
}
