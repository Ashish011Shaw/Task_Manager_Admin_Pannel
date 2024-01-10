import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom"
import Register from './Components/Register';
import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/Dashboard';
import { useContext, useEffect } from 'react';
import { LoginContext } from './Components/ContextProvider/Context';
import Header from './Components/Navbar/Header';
import AddUsers from './Components/Admin/AddUsers';
import Home from './Components/Admin/Home';
import UserList from './Components/Admin/UserList';
import Error from './Error';
import UpdateUser from './Components/User/UpdateUser';
import AssignProject from './Components/User/AssignProject';

function App() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/")
    }
  }, [])


  return (
    <>
      {
        token ? <Header /> : <></>
      }
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin-profile" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUsers />} />
        <Route path="/all-users" element={<Home />} />
        <Route path="/my-users" element={<UserList />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/assign-project-to-user/:id" element={<AssignProject />} />
        <Route path="*" element={<Error />} />


      </Routes>
    </>
  );
}

export default App;
