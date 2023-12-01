import React, {useCallback, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {FileRejection, useDropzone} from 'react-dropzone'
import Cropper from 'react-easy-crop'
import {Area} from 'react-easy-crop/types'
import InlineSVG from 'react-inlinesvg/esm'
import {KTSVG} from 'src/_metronic/helpers'
import getCroppedImg from '../utils/crop-image-utils'
import {createBase64} from '../utils/input-utils'

interface Props {
  onClear: () => void
  preview: string | undefined
  title: string
  message: string
  disabled?: boolean
  width: number
  height: number
  onResult: (blob: Blob | null, error?: any) => void
  required?: boolean
}

const ImageDropZoneCrop: React.FC<Props> = ({
  onClear,
  preview,
  title,
  message,
  disabled,
  width,
  height,
  onResult,
  required,
}) => {
  const [cropData, setCropData] = useState<string | undefined>()
  const [processing, setProcessing] = useState(false)
  const [isPng, setIsPng] = useState(false)

  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const ratio = useMemo(() => width / height, [width, height])

  const onCropComplete = useCallback((croppedArea, pixel: Area) => {
    setCroppedAreaPixels(pixel)
  }, [])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!acceptedFiles || (rejectedFiles && rejectedFiles.length > 0)) {
        onResult(null, `File type not supported`)
        return
      }
      setCropData(createBase64(acceptedFiles[0]))
      setIsPng(acceptedFiles[0].type === 'image/png')
      setZoom(1)
    },
    [onResult]
  )

  const handleCrop = useCallback(async () => {
    setProcessing(true)
    try {
      onResult(await getCroppedImg(cropData!, croppedAreaPixels!, {width, height, isPng}))
    } catch (e) {
      onResult(null, e)
    }
    setProcessing(false)
    setCropData(undefined)
  }, [cropData, croppedAreaPixels, width, height, isPng, onResult])

  const {getRootProps, getInputProps, isDragActive} = useDropzone(
    useMemo(
      () => ({
        onDrop,
        multiple: false,
        accept: ['.jpg', '.jpeg', '.png'],
      }),
      [onDrop]
    )
  )

  return (
    <>
      <div {...(disabled ? {} : getRootProps())}>
        {disabled ? null : <input {...getInputProps()} />}
        <div
          className='rounded p-6 d-flex align-items-center'
          style={{
            borderWidth: 1,
            borderColor: '#E3E6EF',
            backgroundColor: '#F5F8FA',
            borderStyle: 'dashed',
          }}
        >
          {preview ? (
            <div className='position-relative mx-auto'>
              {disabled ? null : (
                <button
                  className='btn position-absolute p-0'
                  type='button'
                  style={{top: -15, right: -20}}
                >
                  <InlineSVG src='/media/icons/efood/IconPhotoEdit.svg' />
                </button>
              )}
              <img
                alt={title}
                src={preview}
                style={{maxHeight: 120, maxWidth: '100%', borderRadius: 10, objectFit: 'cover'}}
              />
              {required || disabled ? null : (
                <button
                  className='btn position-absolute p-0'
                  type='button'
                  style={{bottom: -20, right: -20, pointerEvents: 'fill'}}
                  onClick={(event) => {
                    event.stopPropagation()
                    onClear()
                  }}
                >
                  <InlineSVG src='/media/icons/efood/IconPhotoRemove.svg' />
                </button>
              )}
            </div>
          ) : (
            <>
              <InlineSVG src={'/media/icons/efood/IconUpload.svg'} className='me-4' />
              <div>
                <div className='fw-bolder'>{title}</div>
                <div className='fw-8 text-gray-500'>
                  {isDragActive ? `Drop the files here ...` : message}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        aria-hidden='true'
        tabIndex='-1'
        show={Boolean(cropData)}
        onHide={() => (processing ? null : setCropData(undefined))}
        centered
      >
        <div className='modal-header d-flex align-items-center justify-content-between'>
          <h3 className='d-flex align-items-center'>Image Editor</h3>

          {/* begin::Close */}
          <div
            className='btn btn-icon btn-sm btn-active-light-primary ms-2'
            onClick={() => (processing ? null : setCropData(undefined))}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
          </div>
          {/* end::Close */}
        </div>
        <div className='modal-body' style={{height: 'calc(100vh - 300px)'}}>
          {Boolean(cropData) && (
            <Cropper
              image={cropData}
              crop={crop}
              zoom={zoom}
              aspect={ratio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoomSpeed={0.2}
              maxZoom={3}
              rotation={0}
            />
          )}
        </div>
        <div className='modal-body d-flex'>
          <div className='fw-bold w-100px'>Zoom: {Math.floor(100 * zoom)}%</div>
          <input
            type='range'
            className='form-range'
            step={0.1}
            value={zoom}
            min={1}
            max={3}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className={`btn btn-lg btn-light fw-bolder me-4`}
            onClick={() => (processing ? null : setCropData(undefined))}
            disabled={processing}
          >
            Kembali
          </button>{' '}
          <button
            onClick={handleCrop}
            disabled={processing}
            className={`btn btn-lg btn-info fw-bolder`}
          >
            <span className='indicator-label'>Simpan</span>
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ImageDropZoneCrop
