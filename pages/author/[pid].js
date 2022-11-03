import React, { useEffect, useState } from "react";
// import styles from "../../styyles/author/author_profile.module.css"
import { useRouter } from 'next/router'
import styles from "../../styles/author/[pid].module.css"


export default function AuthorProfile() {

  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(true);
  
  const router = useRouter()
  const { pid } = router.query
  const profileRoute = "http://127.0.0.1:8000/content/authors/" + pid;

  //components did mount

  useEffect(_ => {fetch(profileRoute)
    .then(res => res.json())
    .then(res => setData(res))
    .then(_ => setLoader(false)), []}
    )

  return (
    <div className="author-profile">
      <h1 className="hl">author</h1>
        <div className="grid-contianer">
          <div className="header">Header background banner</div>
          <div className="leftbar">left empyty column</div>
          <div className="main-panel">COntent column</div>
          <div className="author-info">author info</div>
          <div className="footer">footer</div>
        </div>
    </div>
  )
}
