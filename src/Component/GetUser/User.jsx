import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import axios from "axios";
import toast  from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8000/api/getAll");
      setUsers(response.data.usersData);
    };
    fetchdata();
  }, []);

  const DeleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/deleteUser/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.msg,{position:"top-center"})
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="userTable">
      <Link to={"/add"} className="addbtn">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname}
                  {user.lname}
                </td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionbtn">
                  <button onClick={() => DeleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
