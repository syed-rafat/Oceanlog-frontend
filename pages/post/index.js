import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
//import the component


// export default function Category() {
//     const [data, setData] = useState(null)
//
//     fetch("http://127.0.0.1:8000/content/list/")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//       });
//
//     return (
//         <body>
//             <main>
//         <article>
//         <h1>Article Index</h1>
//         <h1>Category</h1>
//         <Button className="my-button" sx={{ backgroundColor: '#746AB0' }} mx={20} pt="xl">
//       My button
//     </Button>
//         <h1>Category</h1>
//         <p> {data}</p>
//         </article>
//         </main>
//         </body>
//
//     );
//
// }