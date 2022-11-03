import React from "react";
import { useState } from "react";
import useSWR from 'swr';
import useUserget from "../../../lib/useUserget";

export default function UserInfo(props) {
    /**
     *@description takes user id as arg and returns user data
     */

    const {user, isLoading, isError} = useUserget(props.id)

    if (isLoading) return <h6>Loading..</h6>
    // console.log(user)
    return <h4>by {user.name}</h4>
}