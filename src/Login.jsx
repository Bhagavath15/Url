import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export function Login() {
    const navigate = useNavigate();
    const [formstate, setformstate] = useState("success");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            console.log("submit");
            const data = await fetch("https://url-backend-two.vercel.app/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (data.status === 400) {
                console.log("error");
                setformstate("error");
            } else {
                setformstate("success");
                const result = await data.json();
                console.log("success", result);
                localStorage.setItem("token", result.token);
                navigate("/url-Shortening");
            }

        }
    });
    return (
        <div className="login-card">

            <Card sx={{ mx: 2, height: 300 }} className="card">
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className='loginform'>
                        <h2>LOGIN</h2>
                        <div className='loginfield'>
                            <TextField
                                name='username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                label="Username"
                                variant="outlined" />
                            <TextField
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined" />

                            <CardActions className="btn">
                                <Button color={formstate} type='submit' variant="contained">{formstate === "success" ? "submit" : "retry"}</Button>
                                <label className="alreadyuser" onClick={() => navigate("/")}>Sign in</label>
                                <label className="alreadyuser" onClick={() => navigate("/forget-password")}>
                                    Forget Password?
                                </label>
                            </CardActions>

                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
export function Signin() {
    const navigate = useNavigate();
    const [formstate, setformstate] = useState("success");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            firstname: '',
            lastname: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: (newdata) => {
            // console.log(values)
            adddata(newdata);
        }
    });

    const adddata = (newdata) => {
        console.log(newdata);

        fetch("https://url-backend-two.vercel.app/signup", {
            method: "POST",
            body: JSON.stringify(newdata),
            headers: {
                "content-type": "application/json"
            }
        });
        navigate("/login");
    };
    return (
        <div className="login-card">
            <Card sx={{ mx: 2, height: 350 }} className="card">
                <form onSubmit={formik.handleSubmit} className='loginform'>
                    <h2>SIGNUP</h2>
                    <div className='loginfield'>
                        <TextField
                            placeholder="username"
                            name='username'
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Username"
                            variant="outlined" required />
                        <TextField
                            placeholder="firstname"
                            value={formik.values.firstname}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Firstname"
                            name="firstname"
                            type="text"
                            variant="outlined" required />
                        <TextField
                            placeholder="lastname"
                            value={formik.values.lastname}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Lastname"
                            name="lastname"
                            type="text"
                            variant="outlined" required />
                        <TextField
                            placeholder="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined" required />
                        <Button color="success" type='submit' variant="contained">submit</Button>
                        <p className="alreadyuser" onClick={() => navigate("/login")} sx={{ fontSize: 7 }}>
                            Already registered user
                        </p>
                    </div>

                </form>
            </Card>
        </div>

    );
}
