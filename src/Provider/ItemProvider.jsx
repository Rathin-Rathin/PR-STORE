import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export const ItemContext = createContext(null);
const ItemProvider = ({ children }) => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/allItems`)
            .then(res => res.json())
            .then(data => setItems(data))
        
    }, [items])
    //Handle Delete
    const handleDelete = (key) => {
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
                fetch(`http://localhost:5000/${key}`, {
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
    }
    const orderItem = items.filter(item => item.quantity < 5);
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