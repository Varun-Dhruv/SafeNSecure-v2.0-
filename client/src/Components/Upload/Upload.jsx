import "./Upload.css"
import {useState} from 'react'
import { renderMatches } from "react-router-dom"
import { FileDrop } from 'react-file-drop'

import { Link } from "react-router-dom"
const Upload = (props) => {
   const [files, setFiles] = useState([])

    const handleFile =(e)=>{
      e.preventDefault()
      for(let i=0; i<e.target.files.length; i++){
        setFiles((prevFiles)=>[...prevFiles,e.target.files[i]])
    }
    console.log(files)
    }
    const onTargetClick=()=>{

    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      for(let k=0;k<files.length;k++)
      {
        props.upload(files[k])
      }
    }
    const showSettings=(event)=>{
        event.preventDefault()
    }
    return (
    <div className="Upload">
            <h2>Upload</h2>
            <form onSubmit={(event)=>{
                event.preventDefault()
                handleSubmit(event)
            }}>
                <input
                  type="file" multiple
                  className="Input File"
                  onChange={handleFile}
                  />

                
                <button type="submit">Submit</button>
            </form>
            <br>
            </br>
            <h1>Files</h1>
            {files.map((file,key)=>{
              return(
                <div className="Parent">
                 <h6>{file.name}</h6>
                </div>
              )
            })}
          
      
    </div> );
}
 
export default Upload;