import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import User from './Component/GetUser/User';
import { Add } from './Component/AddUser/Add';
import {Edit} from './Component/UpdateUser/Edit'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <User />
    },
    {
      path: "/add",
      element: <Add />
    },
    {
      path: "/edit/:id",
      element: <Edit />
    },
  ])
  return (
    <div className='App'>
      <h1>Crud Operation With Rest API</h1>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
