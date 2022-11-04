/**
 * CKEditor 5
 * TODO: Implement CKEditor 5 with simple upload adapter
 */

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editorbuild from "ckeditor5-custom-build/build/ckeditor";
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

// let config = {
//   simpleUpload: {
//     // The URL that the images are uploaded to.
//     uploadUrl: "http://127.0.0.1:8000/content/image/",

//     // Enable the XMLHttpRequest.withCredentials property.
//     // withCredentials: true,

//     // Headers sent along with the XMLHttpRequest to the upload server.
//     headers: {
//       "Content-type": "application/x-www-form-urlencoded",
//       // 'X-CSRF-TOKEN': 'CSRF-Token',
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NDgxOTE4LCJpYXQiOjE2Njc0ODE2MTgsImp0aSI6ImM5NzZhMGMwZWQ2OTQ0NjA5NzE4YjFkYWUwMGUzNDQyIiwidXNlcl9pZCI6MX0.w6gy1dLPxBP7pSPKMqehMuUm232lO1TlI-8lnRWrBi4",
//     },
//   },
// };


class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.url = 'http://127.0.0.1:8000/content/image/';
      }
  
      request(file) {
        console.log(file)
        console.log('fileee log is shown,  request is working')
        return fetch(this.url, { // Your POST endpoint
          method: 'POST',
          headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          },
          body: file // This is your file object
        });
      }
      upload() {
        const formData = new FormData();

        this.loader.file.then((filenew) => {
          console.log(filenew);
          formData.append('url', filenew, filenew.name);
  
          return new Promise((resolve, reject) => {
            this.request(formData).then(
             response => {console.log('got response back')
             return response.json()} // if the response is a JSON object
           ).then(
             res => resolve({default: res.url}) // Handle the success response object
           ).catch(
             error => {console.log(error)
              return reject({reason: 'errrorr'})} // Handle the error response object
           );
        })
      });
    }
}


function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}




export default function Editor(props) {
  // const editorConfiguration = {
  //     // toolbar: [ 'bold', 'italic' ]
  //     plugins: [ 'SimpleUploadAdapter' ]
  // };
  // config = {editorConfiguration}

  return (
    <div className="h-40 w-2/3 mx-auto">
      {props.loaded ? (
        <CKEditor
          editor={Editorbuild}
          config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            let data = editor.getData();
            console.log("Focus.", editor, data);
          }}
        />
      ) : (
        <h1>Refresh page!</h1>
      )}
    </div>
  );
}
