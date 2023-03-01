import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { ItemsContext } from "../store/itemsContext";
import Button from "./button";
import styles from "./card.module.css";




export default function Card({ item,onClick }) {
  const {userId,token}=useContext(AuthContext)
  const navigate=useNavigate()
  const { removeItems } = useContext(ItemsContext);
  const deleteHandler = async (id) => {
   
    await fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    removeItems(id);
  };
const navigateHandler=(id)=>{
  navigate(`/items/${id}`)
}
  const updateHandler=(item)=>{
    onClick(item)
  }


  return (
    <div className={styles.cardContainer} key={item._id} >
      <p>Item Name :{item.name}</p>
      <p>The Price :{item.price}$</p>
      <p>More Details :{item.description}</p>
      <div className={styles.buttonContainer}>
     { userId===item.owner ? <> <Button type={"submit"} onClick={updateHandler.bind(null,item)}>Edit</Button>
        <Button type={"cancel"} onClick={deleteHandler.bind(null, item._id)}>
          Delete
        </Button></>:""}
        <Button type={"primary"} onClick={navigateHandler.bind(null,item._id)}>
          Details
        </Button>
      </div>
    </div>
  );
}
