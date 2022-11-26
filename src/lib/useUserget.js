import useSWR from "swr";

// takes id of author and fetches data


const fetcher = (...args) => fetch(...args).then(res => res.json())

/**
 * @name useUserget
 * @description It takes user ID as parameter and return the author object. Fetches data using useSWR hook.
 * @param {boolean} id
 *
 * @returns {object} User-object(user, isLoading, isError)
 */
export default function useUserget(id) {
    console.log(id)
    const link = process.env.BACKEND_URL + "authors/" + id
    const {data, error} = useSWR(link, fetcher)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}

// const {user, isLoading, isError} = useUser(props.id)