import { createContext, Provider, useState } from "react";

export const ItemsContext = createContext({
  items: [],
  addItems: () => {},
  removeItems: () => {},
 
});

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

const addItems=(newItem)=>{
    setItems(prev=>[newItem,...prev])
}
const removeItems=(id)=>{
    setItems(prev=>prev.filter(item=>item._id !==id))
}
  const value = {items,addItems,removeItems };
  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export default ItemsProvider;
