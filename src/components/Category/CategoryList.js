import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CategoryList() {
    const [data, setData] = useState(0);
    const [loading, setLoader] = useState(true);

    const router = useRouter();
    const { category_id } = router.query;
    const categoryRoute = process.env.BACKEND_URL + "list/" + category_id;
    console.log(categoryRoute, "categoryRoute");

    useEffect(
        (_) => {
          if (category_id) {
            axios
              .get(categoryRoute)
              .then((res) => setData(res.data))
              .then((_) => setLoader(false))
              .catch((err) => console.log("error", err));
          }
        },
        [categoryRoute]
      );

    if (!data) {
        return <h1>Loading</h1>;
    }
    
    return (
        <div>
        <h1>Category List</h1>
        <p>Category ID: {category_id}</p>
        </div>
    );
}