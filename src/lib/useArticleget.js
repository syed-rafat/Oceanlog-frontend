import useSWR from "swr";

// takes id of author and fetches data


const fetcher = (...args) => fetch(...args).then(res => res.json())

/**
 * @name useArticleget
 * @description It takes user ID as parameter and return the author object. Fetches data using useSWR hook.
 * @param {boolean} id
 *
 * @returns {object} User-object(user, isLoading, isError)
 */
export default function useArticleget(id) {
    console.log(id)
    const link = `${process.env.BACKEND_URL}articles/oceanlog/`
    const {data, error} = useSWR(link, fetcher)
    console.log(data)
    return {
        article: data,
        isLoading: !error && !data,
        isError: error
    }
}
