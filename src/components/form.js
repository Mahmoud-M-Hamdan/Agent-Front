import React, { useContext, useState } from "react";
import Modal from "./modal";
import styles from "./form.module.css";
import Button from "./button";
import {ItemsContext} from '../store/itemsContext'
import { AuthContext } from "../store/AuthContext";

// eslint-disable-next-line import/no-anonymous-default-export
export default function Form({ closeHandler,fillEdit }) {
  const [name, setName] = useState(fillEdit?fillEdit.name:"");
  const [price, setPrice] = useState(fillEdit?fillEdit.price:"");
  const [description, setDescription] = useState(fillEdit?fillEdit.description:"");
  const [error, setError] = useState("");

  const {addItems} =useContext(ItemsContext)
  const {token} =useContext(AuthContext)
  const sendItemtoDB = async (item) => {
    const url = fillEdit?"http://localhost:3000/items/"+fillEdit._id :"http://localhost:3000/items"
    const response = await fetch(url, {
      method: fillEdit?"PATCH":"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify(item),
    });

    const data = await response.json();
    addItems(data)

    return data;
  };
  const submitHandler = (e) => {

    e.preventDefault();
    if(name==="" || price==="" || description===""){
      setError('please make sure to fill all fields')
      return
    }
    const obj = {
      name,
      price,
      description,
    };
    sendItemtoDB(obj)
setError("")
    closeHandler();
    setDescription("");
    setName("");
    setPrice("");
    
  };
  return (
    <Modal onClick={closeHandler}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h3>the form</h3>
          <div className={styles.inputContainer}>
            <label for="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Item name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label for="price">Item Price</label>
            <input
              type="number"
              id="price"
              name="price"
             
              placeholder="price - numbers only"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className={styles.input}
            />
          </div>
          <div className={`${styles.inputContainerDesc} ${styles.desc}`}>
            <label for="description">Item Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={`${styles.input} ${styles.desc}`}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <Button type="submit" onClick={submitHandler}>
            {fillEdit?'Update':'Submit'}
          </Button>
          <Button type="cancel" onClick={closeHandler}>
            Cancel
          </Button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Modal>
  );
}
