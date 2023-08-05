import { useEffect, useState } from "react";
import Item from "../Item/Item";


const AllItems = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`https://pr-store-server.vercel.app/allItems`)
            .then(res => res.json())
            .then(data => setItems(data))

    }, [items])
    return (
        <div className="mt-3 grid gap-6 grid-cols-2  md:grid-cols-6">
            {
                items?.map(item => <Item
                    key={item._id}
                    item={item}
                ></Item>)
            }
        </div>

    );
};

export default AllItems;