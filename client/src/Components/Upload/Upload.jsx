import "./Upload.css"
import {useState} from 'react'

const Upload = (props) => {
   const [files, setfiles] = useState([])

    const handleChange=(event)=>{
       
       setfiles(props.capture(event.target.files[0]))
       console.log(files)
      //console.log('buffer', this.state.buffer)
    }

    const handleSubmit=()=>{
     
    }
    return (
    <div className="Upload">
            <h2>Upload</h2>
            <form onSubmit={(event)=>{
                event.preventDefault()
                handleSubmit()
            }}>
                <input
                  type="file"
                  className="Input File"
                  onChange={handleChange}
                  />
                <button type="submit">Submit</button>
            </form>
       
      
    </div> );
}
 
export default Upload;