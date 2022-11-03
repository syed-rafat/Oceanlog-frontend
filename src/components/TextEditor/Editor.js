/**
 * CKEditor 5
 * TODO: Implement CKEditor 5 with simple upload adapter
 */

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editorbuild from 'ckeditor5-custom-build/build/ckeditor';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

let config = {
        simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: 'http://127.0.0.1:8000/content/image/',

            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
                'X-CSRF-TOKEN': 'CSRF-Token',
                //Authorization: 'Bearer <JSON Web Token>'
            }
        }}


export default function Editor(props) {

    // const editorConfiguration = {
    //     // toolbar: [ 'bold', 'italic' ]
    //     plugins: [ 'SimpleUploadAdapter' ]
    // };     
    // config = {editorConfiguration}

        return (
            <div className="h-40 w-2/3 mx-auto">
                {(props.loaded)? <CKEditor
                    editor={ Editorbuild }
                    config={config}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        let data = editor.getData()
                        console.log( 'Focus.', editor, data );
                    } }
                /> : (<h1>Refresh page!</h1>)}
            </div>
        );
}