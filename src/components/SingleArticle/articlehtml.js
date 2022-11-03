import React from "react";
import { useState } from "react";
import useArticleget from "../../lib/useArticleget";

export default function Articlehtml(props) {
    /**
     *@description takes user id as arg and returns user data
     */

    const {article, isLoading, isError} = useArticleget(props.id)
    console.log(article)
    return <h4>by {article.title}</h4>
    if (isLoading) return <h6>Loading..</h6>
    // console.log(user)
    return <h4>by {article.title}</h4>
}