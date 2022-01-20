import { useState } from 'react'
import axios from 'axios'

import './App.css'
import FileViewer from 'react-file-viewer';
import MyPdfViewer from "./components/pdfViewer"
async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const sample = "./sample.pdf"
  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    console.log("RESULTS")
    console.log(result)
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}
    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*,.pdf"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>
      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

      {/*<img src="/images/8d9ece10e53d5eec6a23a099d11a51aa"></img>*/}

      <MyPdfViewer/>
    </div>
  );
}

export default App;
