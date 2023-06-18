import React from 'react'
import {Editor} from '@tinymce/tinymce-react'

interface TextEditorProps {
  label?: string
  editorHeight?: number
  value: string
  onChange: (value: string, editor: any) => void
}

const TextEditor = ({onChange, value, label, editorHeight}: TextEditorProps) => {
  return (
    <div>
      {label && (
        <label className='form-label fs-7'>{label}</label>
      )}
      <Editor
        value={value}
        onEditorChange={(value, editor) => onChange(value, editor)}
        init={{
          height: editorHeight || 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar: `formatselect | bold italic link bullist numlist | indent outdent | image blockquote table media undo redo`,
        }}
        tinymceScriptSrc='/tinymce/tinymce.min.js'
      />
    </div>
  )
}

export default TextEditor
