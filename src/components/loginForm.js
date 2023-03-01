import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import Button from "./button";
import styles from "./loginForm.module.css";
export default function LoginForm() {
  const navigate=useNavigate()
  const {login}=useContext(AuthContext)
  const [loggin, setLoggin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const reverse = () => {
    setLoggin(!loggin);
    setError('')
  };

  const submitHandler = async () => {
    if (email === "" || password === "") {
      setError("Please check to fill all fields with correct value");
      return
    }
    if (name === "" && !loggin) {
      setError("Please check to fill all fields with correct value");
      return
    }

    const obj = { ...(!loggin && { name: name }), email, password };
    const url = loggin ? "http://localhost:3000/users/login":"http://localhost:3000/users"
    const response= await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)

    })

    if(!response.ok){
      const error = await response.json()
     setError(error.error)
     return
    }


    const data = await response.json()
    
  login(data)
  navigate('/items')
    setError("");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h3>{loggin ? "Loggin" : "Sign Up"}</h3>
        {!loggin && (
          <div className={styles.inputContainer}>
            <label for="name"> Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
        )}
        <div className={styles.inputContainer}>
          <label for="price">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label for="description">The Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
      </form>
      <div className={styles.buttonContainer}>
        <Button type="primary" onClick={submitHandler}>
          {loggin ? "Loggin" : "Signup"}
        </Button>
        <Button type="cancel" onClick={reverse}>
          {loggin ? "go to Signup" : "go to Loggin"}
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
