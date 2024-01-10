import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const UpdateUser = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token")

    const [inputdata, setInputData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        gender: "",
        user_type: "",
    });
    // console.log(inputdata)

    // status (isActive) optios
    const options = [
        { value: true, label: 'Active' },
        { value: false, label: 'InActive' },
    ];

    // setInput Value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }

    // status set
    const [isActive, setIsActive] = useState(true);

    const setStatusValue = (e) => {
        setIsActive(e.value)
        console.log(e.value)
    }

    const { id } = useParams();
    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();

        const { name, username, email, mobile, gender, user_type } = inputdata;

        if (name === "") {
            toast.error("name is Required !")
        } else if (username === "") {
            toast.error("username is Required !")
        } else if (email === "") {
            toast.error("Email is Required !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else if (mobile === "") {
            toast.error("Mobile is Required !")
        } else if (mobile.length > 10) {
            toast.error("Enter Valid Mobile!f")
        } else if (gender === "") {
            toast.error("Gender is Required !")
        } else if (isActive === "") {
            toast.error("Status is Required !")
        } else if (user_type === "") {
            toast.error("user_type is Required !")
        } else {
            // console.log(inputdata, status)

            const resp = await axios.put(`/update-user/${id}`, { ...inputdata, isActive }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            if (resp.status === 200) {
                console.log(resp.data);
                toast.success(resp.data.message)
                navigate("/my-users")
                // setInputData({ ...inputdata, name: "", username: "", email: "", password: "", mobile: "", gender: "", user_type: "", })
            } else {
                console.log(resp);
                toast.error(resp.data.message);
            }

        }

    }

    const checkAuth = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("*")
        }
    }

    // user details
    const userData = async () => {
        const resp = await axios.get(`/my-profile/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        // console.log(resp.data);
        if (resp.data.status === 200) {
            setInputData(resp.data.data)
        }


    }

    useEffect(() => {
        checkAuth();
        userData();
    }, [])

    return (
        <>
            <div className="container">
                <h2 className='text-center mt-3'>Update User Details</h2>
                <Card className='shadow mt-3 p-3'>

                    {/* {JSON.stringify(inputdata)} */}
                    <Form>
                        <Row>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' value={inputdata.name} onChange={setInputValue} placeholder='Enter Name' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>User_Name</Form.Label>
                                <Form.Control type="text" name='username' value={inputdata.username} onChange={setInputValue} placeholder='Enter User_name' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select Your Gender</Form.Label>
                                <Form.Check
                                    type={"radio"}
                                    label={`Male`}
                                    name="gender"
                                    value={"Male"}
                                    checked={inputdata.gender === "Male"}
                                    onChange={setInputValue}
                                />
                                <Form.Check
                                    type={"radio"}
                                    label={`Female`}
                                    name="gender"
                                    value={"Female"}
                                    checked={inputdata.gender === "Female"}
                                    onChange={setInputValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select Your Status</Form.Label>
                                <Select options={options} onChange={setStatusValue} />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Enter User_Type</Form.Label>
                                <Form.Control type="text" name='user_type' value={inputdata.user_type} onChange={setInputValue} placeholder='Enter User_Type' />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={submitUserData}>
                                Update
                            </Button>
                        </Row>

                    </Form>
                </Card>
                <ToastContainer position="top-center" />
            </div>
        </>
    )
}

export default UpdateUser