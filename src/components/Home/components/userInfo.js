import React from "react";
import { useState } from "react";
import useSWR from 'swr';
import useUserget from "../../../lib/useUserget";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function UserInfo(props) {
    /**
     *@description takes user id as arg and returns user data
     */

    const backend_url = process.env.BACKEND_URL
    const link = backend_url + "authors/" + props.id

    const {data, error} = useSWR(link, fetcher)


    const {user, isLoading, isError} = useUserget(props.id)

    if (isLoading) return <h6>Loading..</h6>
    console.log(user, "User info component")
    return <h4>by {user.name}</h4>
}