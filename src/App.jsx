import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

export default function App() {

  return (
    <div className="App">
      <ShortUrl />
    </div>
  )
}

function ShortUrl() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4006/api/shorten', {
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
    </Card>
  )
}



