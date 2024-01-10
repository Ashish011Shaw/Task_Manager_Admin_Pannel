import { React, useEffect, useState } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"


const UserList = () => {
    const navigate = useNavigate();
    const [user, setUsers] = useState([]);
    let token = localStorage.getItem("token");


    const getUsers = async () => {
        try {

            const resp = await axios.get("/get-my-users", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            if (resp.data && Array.isArray(resp.data.data)) {
                setUsers(resp.data.data);
            } else {
                console.error("API response does not contain an array:", resp.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    // User status api
    const handleChange = async (id, isActive) => {
        const response = await axios.put(`/user/update-active-status/${id}`, { isActive }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        console.log(response)
        if (response.status === 200) {
            getUsers();
            toast.success(response.data.message);
        } else {
            toast.error("error ")
        }
    }

    // Project status api 
    const handleProjectStatus = async (id, status) => {
        const response = await axios.put(`/update-project-status/${id}`, { status }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        console.log(response);
        if (response.status === 200) {
            getUsers();
            toast.success(response.data.msg);
        } else {
            toast.error("error ")
        }
    }

    // delete a user api
    const deleteUser = async (id) => {
        const resp = await axios.delete(`/delete-user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        console.log(resp.data);
        if (resp.data.status === 200) {
            toast.success(resp.data.msg);
            getUsers();
        } else {
            toast.error(resp.data.message);
        }
    }

    // task delete api

    const deleteProject = async (id) => {
        const resp = await axios.delete(`/delete-task/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        console.log(resp);
        if (resp.status === 200) {
            toast.success(resp.data.message)
        }
        getUsers();
        // alert(id);

    }

    const checkAuth = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("*")
        }
    }




    useEffect(() => {
        getUsers();
        checkAuth();
    }, [])


    useEffect(() => {
        // console.log("User State:", user);
    }, [user]);
    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <h3 className='text-center' style={{ color: "#7e7575" }}>Employee List</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">User_Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">User_Type</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Status</th>
                                <th scope="col">Assigned_Project</th>
                                <th scope="col">Project_status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.user_type}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        {/* {user.isActive === true ? "Active" : "InActive"} */}
                                        <Dropdown className='text-center'>
                                            <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                                <Badge bg={user.isActive === true ? "primary" : "danger"}>
                                                    {user.isActive === true ? "Active" : "InActive"} <i class="fa-solid fa-angle-down"></i>
                                                </Badge>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleChange(user.id, true)}>Active</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleChange(user.id, false)}>InActive</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </td>
                                    {/* ------------------------------------------Project with delete button ----------- */}
                                    {/* <td>
                                        {user.Task.length > 0 ? (
                                            user.Task.map((task, index) => (
                                                <div key={task.id}>{index + 1}. {task.task_name}</div>
                                            ))
                                        ) : (
                                            "No Task"
                                        )}
                                    </td> */}

                                    <td>
                                        {user.Task.length > 0 ? (
                                            user.Task.map((task, index) => (
                                                <div key={task.id}>
                                                    {index + 1}. {task.task_name}{" "}
                                                    <Badge
                                                        bg='danger'
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => deleteProject(task.id)}
                                                    >
                                                        Delete
                                                    </Badge>
                                                </div>
                                            ))
                                        ) : (
                                            "No Task"
                                        )}
                                    </td>
                                    {/* ------------------------------------------Project with delete button ----------- */}


                                    {/* project-status */}
                                    <td>
                                        {user.Task.length > 0 ? (
                                            user.Task.map((task) => (
                                                <div key={task.id}>
                                                    {task.task_name} -{" "}
                                                    <Badge
                                                        bg={task.status === "Complete" ? "success" : "warning"}
                                                        onClick={() => handleProjectStatus(task.id, task.status === "Complete" ? "Pending" : "Complete")}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {task.status}
                                                    </Badge>
                                                </div>
                                            ))
                                        ) : (
                                            "No Task"
                                        )}
                                    </td>


                                    {/* dropdown Menue */}
                                    <td className='text-center'>
                                        <Dropdown>
                                            <Dropdown.Toggle variant='light' className='action text-decoration-node' id="dropdown-basic">
                                                <i class="bi bi-three-dots-vertical"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item >
                                                    <NavLink to={`/userprofile/${user._id}`} className="text-decoration-none">
                                                        <i class="bi bi-eye-fill" style={{ color: "green" }}></i> <span>View User</span>
                                                    </NavLink>
                                                </Dropdown.Item>
                                                <Dropdown.Item >
                                                    <NavLink to={`/update-user/${user.id}`} className="text-decoration-none">
                                                        <i class="bi bi-pen-fill" style={{ color: "blue" }}></i> <span>Edit User</span>
                                                    </NavLink>
                                                </Dropdown.Item>
                                                <Dropdown.Item >
                                                    <NavLink className="text-decoration-none">
                                                        <div
                                                            onClick={() => deleteUser(user.id)}
                                                        >
                                                            <i class="bi bi-archive-fill" style={{ color: "red" }}></i> <span>Delete user</span>
                                                        </div>
                                                    </NavLink>

                                                </Dropdown.Item>
                                                <Dropdown.Item >
                                                    <NavLink to={`/assign-project-to-user/${user.id}`} className="text-decoration-none">
                                                        <div
                                                        >
                                                            <i class="bi bi-pass-fill" style={{ color: "orange" }}></i> <span>Assign Project</span>
                                                        </div>
                                                    </NavLink>
                                                </Dropdown.Item>


                                                {
                                                    user.Task.length > 0 ?
                                                        <>

                                                            {/* Delete a Task */}
                                                            {/* <Dropdown.Item >
                                                                <NavLink className="text-decoration-none" onClick={() => deleteProject(user.Task[0].id)}>
                                                                    <div>
                                                                        <i class="bi bi-archive" style={{ color: "red" }}></i> <span>Delete Project</span>
                                                                    </div>
                                                                </NavLink>
                                                            </Dropdown.Item> */}






                                                        </>
                                                        : ""
                                                }

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <ToastContainer position="top-center" />
            </div>


        </>
    )
}

export default UserList
