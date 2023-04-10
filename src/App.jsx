import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function App() {

  return (
    <div className="App">
      <ShortUrl />
    </div>
  )
}

function ShortUrl() {

  // const handleClick = () => {
  //   console.log("clicked")
  // }
  // const { handleSubmit, handleChange, values } = useFormik({
  //   initialValues: {
  //     url: ""

  //   },
  //   // validationSchema: formValidationSchema,
  //   onSubmit: (values) => {
  //     console.log("clicked", values)
  //   }
  // });
  // const addData = (newdata) => {
  //   fetch("http://localhost:4006/shorten",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(values),
  //       headers: {
  //         "content-type": "application/json"
  //       }
  //     });

  // };
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4006/shorten', {
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
  }
  const handleChange = (e) => {
    console.log(setUrl(e.target.value))
  }
  return (
    <div>
      <Button onClick={handleClear}>Clear</Button>
      <form onSubmit={handleSubmit}>
        <label>Original url</label>
        <TextField
          name="url"
          label="url"
          type="url"
          value={url}
          onChange={handleChange}

        />

        <Button type="submit">Submit</Button>
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
  )
}



