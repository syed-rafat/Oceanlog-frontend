import Document, { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../src/components/Navbar'
import { userStore } from '../src/store/userContext'


// using class

export default class MyDocument extends Document {

    render() {
      return (
          <Html lang="en">
              <Head>
                <title>OceanLog</title>
                  <link
                    rel="preload"
                    href="/fonts/PPPangramSans-NarrowSemibold.otf"
                    as="font"
                    type="font/otf"
                    crossorigin
                  />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Merriweather:wght@700&display=swap" rel="stylesheet" />
              </Head>
              <body>
              <Navbar />
        <Main />
        <NextScript />
              </body>
          </Html>
      );
  }
  }

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
// MyDocument.getInitialProps = async (ctx) => {
  
//     const initialProps = await Document.getInitialProps(ctx);

//     // Add your app specific logic here

//     return {
//       ...initialProps,
//       styles: [
//         initialProps.styles,
//         <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
//       ],
//     };
//   }