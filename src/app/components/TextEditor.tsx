import React from 'react'
import {Editor} from '@tinymce/tinymce-react'

interface TextEditorProps {
  value: string
  onChange: (value: string, editor: any) => void
}

const TextEditor = ({onChange, value}: TextEditorProps) => {
  return (
    <Editor
      value={value}
      onEditorChange={(value, editor) => onChange(value, editor)}
      init={{
        height: 500,
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
  )
}

export default TextEditor
