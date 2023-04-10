import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Signin } from "./Login";
import { ForgetPassword } from "./forgetPassword";
import { VerifyOtp } from './verifyotp';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/url-Shortening" element={<ProtectedRoute><ShortUrl /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  // const token=false;
  return (
    token ? <section>{children}</section> : <Navigate replace to="/" />
    //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}
function ShortUrl() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://url-backend-two.vercel.app/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setUrl("")
    setShortUrl("")
    setMessage("")
  }
  const handleChange = (e) => {
    console.log(setUrl(e.target.value))
  }
  const handleClick = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/login")
    }, 1500);
    console.log("logout")
  }
  return (
    <Card sx={{ m: 10 }} className="card">
      <div >

        <form onSubmit={handleSubmit} className="form" >
          <h2>Enter the url</h2>
          <TextField
            name="url"
            label="url"
            type="url"
            id="outlined-basic"
            value={url}
            onChange={handleChange}

          />

          <div>
            <Button type="submit">Submit</Button>
            <Button onClick={handleClear}>Clear</Button>
          </div>
        </form>
        {message && <p>{message}</p>}
        {shortUrl && (
          <div>
            <p>Shortened URL:</p>
            <a href={shortUrl} >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
      <Button onClick={handleClick}>LOGOUT</Button>
    </Card>
  )
}



