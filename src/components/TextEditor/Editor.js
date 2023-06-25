/**
 * CKEditor 5
 * TODO: Implement CKEditor 5 with simple upload adapter
 */

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const imageurl = process.env.BACKEND_URL + "image/";
class MyUploadAdapter {
  constructor( loader ) {
      // The file loader instance to use during the upload.
      this.loader = loader;
  }

  // Starts the upload process.
  upload() {
      return this.loader.file
          .then( file => new Promise( ( resolve, reject ) => {
              this._initRequest();
              this._initListeners( resolve, reject, file );
              this._sendRequest( file );
          } ) );
  }

  // Aborts the upload process.
  abort() {
      if ( this.xhr ) {
          this.xhr.abort();
      }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
      const xhr = this.xhr = new XMLHttpRequest();

      // Note that your request may look different. It is up to you and your editor
      // integration to choose the right communication channel. This example uses
      // a POST request with JSON as a data structure but your configuration
      // could be different.
      xhr.open( 'POST', imageurl, true );
      xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners( resolve, reject, file ) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `Couldn't upload file: ${ file.name }.`;

      xhr.addEventListener( 'error', () => reject( genericErrorText ) );
      xhr.addEventListener( 'abort', () => reject() );
      xhr.addEventListener( 'load', () => {
          const response = xhr.response;

          // This example assumes the XHR server's "response" object will come with
          // an "error" which has its own "message" that can be passed to reject()
          // in the upload promise.
          //
          // Your integration may handle upload errors in a different way so make sure
          // it is done properly. The reject() function must be called when the upload fails.
          if ( !response || response.error ) {
              return reject( response && response.error ? response.error.message : genericErrorText );
          }

          // If the upload is successful, resolve the upload promise with an object containing
          // at least the "default" URL, pointing to the image on the server.
          // This URL will be used to display the image in the content. Learn more in the
          // UploadAdapter#upload documentation.
          resolve( {
              default: response.url
          } );
      } );

      // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
      // properties which are used e.g. to display the upload progress bar in the editor
      // user interface.
      if ( xhr.upload ) {
          xhr.upload.addEventListener( 'progress', evt => {
              if ( evt.lengthComputable ) {
                  loader.uploadTotal = evt.total;
                  loader.uploaded = evt.loaded;
              }
          } );
      }
  }

  // Prepares the data and sends the request.
  _sendRequest( file ) {
      // Prepare the form data.
      const data = new FormData();

      data.append( 'url', file );

      // Important note: This is the right place to implement security mechanisms
      // like authentication and CSRF protection. For instance, you can use
      // XMLHttpRequest.setRequestHeader() to set the request headers containing
      // the CSRF token generated earlier by your application.

      // Send the request.
      this.xhr.send( data );
  }
}

// ...



function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}




export default function Editor(props) {
  const editorConfiguration = {
      // toolbar: [ 'bold', 'italic' ]
      plugins: [ 'SimpleUploadAdapter' ]
  };
  // config = {editorConfiguration}



  return (
    <div className="ck-content">
      {props.loaded ? (
        <CKEditor
          editor={ClassicEditor}
          config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
          data=""
          className=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            props.setValue("content", data)
            console.log('onchange event')
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
