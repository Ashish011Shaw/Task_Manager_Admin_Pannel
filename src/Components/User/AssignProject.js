import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"


const AssignProject = () => {
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getUsers = async () => {
        try {

            const resp = await axios.get("/get-my-users", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const [taskData, setTaskData] = useState({
        task_name: '',
        task_description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post(`/create-task/${id}`, { ...taskData }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        setTaskData({
            task_name: '',
            task_description: '',
        });
        if (resp.data.status === 201) {
            toast.success(resp.data.message);
            getUsers();
            navigate("/my-users")
            // console.log("Task created successfully")
        } else {
            console.log("Task not created")
            console.log(resp);
        }
    };



    return (
        <>
            <div className='container'>
                <h3 className='text-center mt-3 mb-3'>Assign Project</h3>
                <div className='row'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="taskName">
                            <Form.Label style={{ fontWeight: 'bold' }}>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Task Name"
                                name="task_name"
                                value={taskData.task_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="taskDescription">
                            <Form.Label style={{ fontWeight: 'bold' }}>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Task Description"
                                name="task_description"
                                value={taskData.task_description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <ToastContainer position="top-center" />
                </div>
            </div>

        </>
    );
};

export default AssignProject;
