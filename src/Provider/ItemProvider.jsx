import React, { createContext, useEffect, useState } from 'react';
export const ItemContext = createContext(null);
const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/allItems`)
            .then(res => res.json())
            .then(data => setItems(data))
        
    }, [items])
    const orderItem = items.filter(item => item.quantity < 5);
    const itemInfo = {
        items,
        orderItem
    }
    return (
        <ItemContext.Provider value={itemInfo}>
            {children}
        </ItemContext.Provider>
    );
};

export default ItemProvider;