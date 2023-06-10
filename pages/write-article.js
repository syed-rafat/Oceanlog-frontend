import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head';
import styles from '../styles/Editor.module.css';

export default function WriteArticle() {

  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
      }
    setEditorLoaded(true)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Ckeditor 5</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Ckeditor5 Nextjs</h1>
      {
        editorLoaded ?
        <CKEditor className="editor" editor={ClassicEditor} />
        :
        "loading..."
      }
      

    </div>
  )
}
