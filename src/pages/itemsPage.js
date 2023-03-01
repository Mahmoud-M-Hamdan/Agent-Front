import { useContext, useEffect, useState } from "react";
import Card from "../components/card";
import { ItemsContext } from "../store/itemsContext";
import styles from "./itemPage.module.css";
import Button from "../components/button";
import Form from "../components/form";
import { AuthContext } from "../store/AuthContext";

const ItemsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fillEdit, setFillEdit] = useState();
  const [itemList, setItemList] = useState([]);
  const { items } = useContext(ItemsContext);
  const { isLoggin } = useContext(AuthContext);

  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };

  const onClick = (item) => {
    setFillEdit(item);
    setIsVisible(true);
  };



  useEffect(() => {
    const getIems = async () => {
      const response = await fetch("http://localhost:3000/item");
      const data = await response.json();
      setItemList(data);
    };

    getIems();
  }, [items]);
  return (
    <>
       {isVisible && <Form closeHandler={closeModal} fillEdit={fillEdit} />}
      {  isLoggin &&  <div className={styles.buttonContainer}>
        <Button type="submit" onClick={openModal}>
            Add Item
          </Button>
        </div>}
      <section>
        <div className={styles.titleContainer}>
          <p className={styles.title}>The List Items</p>
        </div>
        <div className={styles.cardsContainer}>
          {itemList.map((item) => {
            return <Card item={item} key={item._id} onClick={onClick} />;
          })}
        </div>
     
      </section>
    </>
  );
};

export default ItemsPage;
