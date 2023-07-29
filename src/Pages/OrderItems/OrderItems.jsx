import { useContext } from "react";
import { ItemContext } from "../../Provider/ItemProvider";
import Item from "../Item/Item";


const OrderItems = () => {
    const { orderItem, items } = useContext(ItemContext);
    console.log(items);
    return (
        <div className="mt-3 grid gap-6 grid-cols-2  md:grid-cols-6">
             {
                orderItem?.map(item => <Item
                    key={item._id}
                    item={item}
                ></Item>)
            }
        </div>
    );
};

export default OrderItems;