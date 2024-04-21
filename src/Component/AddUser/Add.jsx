import React, { useState } from "react";
import "./Add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
export const Add = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    password: "",
  });

  const navigate=useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/create", user);
      toast.success(res.data.msg,{position:"top-center"})
      navigate("/")
    } catch (err) {
      console.error("Error:", err.message); 
    }
  };



  return (
    <div className="addUser">
      <Link to={"/"}>
        <i className="fa-solid fa-circle-left"></i>
      </Link>
      <h2>Add New User</h2>
      <form className="adduserform" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            onChange={inputHandler}
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            onChange={inputHandler}
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Email "
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Address"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={inputHandler}
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};
