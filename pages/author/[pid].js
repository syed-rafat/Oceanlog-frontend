import React, { useEffect, useState } from "react";
// import styles from "../../styyles/author/author_profile.module.css"
import { useRouter } from 'next/router'
import styles from "../../styles/author/[pid].module.css"
import { axiosInstance } from "../../src/lib/axiosInstance";
import axios from "axios";


export default function AuthorProfile() {

  const [data, setData] = useState(0);
  const [loading, setLoader] = useState(true);
  
  const router = useRouter()
  const { pid } = router.query
  const profileRoute = "http://127.0.0.1:8000/content/authors/" + pid;

  // const base = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NTY4Mjc1LCJpYXQiOjE2Njc1Njc5NzUsImp0aSI6IjA4ZWViNjdjYWQxMzQ2NThiOGU3NGI1ZmVjNjgyYTVkIiwidXNlcl9pZCI6MX0.HCxcpQbTbXlJh-VjmYTyaSDXczfXYahNO-pttx3qnEM"
  // const obj = atob(base.split('.')[1])
  // console.log(obj)

  //components did mount

  useEffect(_ => {
    if (pid){
    axiosInstance.get(profileRoute).then(res=> setData(res.data)).then(_ => setLoader(false)).catch(err=> console.log('error', err))
    console.log(data)
  }}, [pid]
    )

  if (!data) {
    return <h1>Loading</h1>
  }

  return (
    <div className="author-profile">
      <h1 className="hl">{data.name}</h1>
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
