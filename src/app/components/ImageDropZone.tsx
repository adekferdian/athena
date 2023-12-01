import React, {useMemo} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import InlineSVG from 'react-inlinesvg/esm'

interface Props {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void
  onClear: () => void
  preview: string | undefined
  title: string
  message: string
  disabled?: boolean
  required?: boolean
}

const ImageDropZone: React.FC<Props> = ({
  onDrop,
  onClear,
  preview,
  title,
  message,
  disabled,
  required,
}) => {
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
  )
}

export default ImageDropZone
