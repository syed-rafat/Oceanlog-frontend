// import React from "react";
// import Link from "next/link";

function authorFinder(id) {

    let a = fetch("http://127.0.0.1:8000/content/authors/" + "1").then(res => res.json()).then(res => res.name)
    const author = async () => {
        let profile = await a
        return profile
    }
    return author()

  }



authorFinder(1)