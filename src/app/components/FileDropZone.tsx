import React, {useMemo} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import InlineSVG from 'react-inlinesvg/esm'

interface Props {
  accept?: string[]
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void
  onClear: () => void
  file: File | undefined
  title: string
  message: string
  disabled?: boolean
  bulkRegist?: boolean
}

const FileDropZone: React.FC<Props> = ({
  accept = ['image/jpg', 'image/jpeg', 'image/png'],
  onDrop,
  onClear,
  file,
  title,
  message,
  disabled,
  bulkRegist
}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone(
    useMemo(
      () => ({
        onDrop,
        multiple: false,
        accept,
      }),
      [onDrop]
    )
  )

  return (
    <div {...(disabled || bulkRegist ? {} : getRootProps())}>
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
        {file ? (
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
            <div className='custom-file-preview-dropzone'>
              <span>{file.name}</span>
            </div>
            {disabled ? null : (
              <button
                className='btn position-absolute p-0'
                style={{bottom: -20, right: -20, pointerEvents: 'fill', zIndex: 100}}
                onClick={(event) => {
                  event.stopPropagation() // ini utk cancel event sebelumnya
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

export default FileDropZone
