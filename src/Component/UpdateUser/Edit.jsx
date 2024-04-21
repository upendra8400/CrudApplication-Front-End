import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../AddUser/Add.css';

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    address: ""
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getUser/${id}`)
      .then((response) => {
        setUser(response.data.userDataExits);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/updateUser/${id}`, user);
      toast.success(res.data.msg, { position: "top-center" });
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>
        <i className="fa-solid fa-circle-left"></i>
      </Link>
      <h2>Update User</h2>
      <form className="adduserform" onSubmit={updateForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            value={user.fname}
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
            value={user.lname}
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
            value={user.email}
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={user.address}
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Address"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};
