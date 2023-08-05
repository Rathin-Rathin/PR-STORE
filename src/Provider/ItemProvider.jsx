import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export const ItemContext = createContext(null);
const ItemProvider = ({ children }) => {
    const notify = () => toast("You don't have access to delete")
    const currentDate = new Date();
    const accessKey = import.meta.env.VITE_accessKey;
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`https://pr-store-server.vercel.app/allItems`)
            .then(res => res.json())
            .then(data => setItems(data))

    }, [items])
    //Handle Delete
    const handleDelete = (key) => {
        const userKey = prompt('Please provide access key');
        if (userKey == accessKey) {
            Swal.fire({

                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://pr-store-server.vercel.app/${key}`, {
                        method: 'DELETE',
                        headers: { 'Content-type': 'application/json' },
                    })
                        .then(res => res.json())
                        .then(data => {


                        })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }

            })
        } else {
            notify();
        }

    }
    const orderItem = items.filter(item => item.quantity < 4);
    const itemInfo = {
        items,
        orderItem,
        handleDelete,
        formattedDate
    }

    return (
        <ItemContext.Provider value={itemInfo}>
            {children}
        </ItemContext.Provider>
    );
};

export default ItemProvider;