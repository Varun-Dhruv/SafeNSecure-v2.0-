import "./Upload.css";
import { useState, useRef } from "react";
import { renderMatches } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import FolderImg from "../../assets/folderImg.png";
import { AiOutlineFile } from "react-icons/ai";
import { Link } from "react-router-dom";
const Upload = (props) => {
  const [files, setFiles] = useState([]);
  const uploadRef = useRef(null);

  const handleBrowseClick = () => {
    uploadRef.current.click();
  };

  const handleFile = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      setFiles((prevFiles) => [...prevFiles, e.target.files[i]]);
    }
    console.log(files);
  };

  const handleFiles = (e, files) => {
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      setFiles((prevFiles) => [...prevFiles, files[i]]);
    }
    console.log(files);
  };

  const onTargetClick = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let k = 0; k < files.length; k++) {
      props.upload(files[k]);
    }
  };

  const showSettings = (event) => {
    event.preventDefault();
  };
  
  return (
    <div className="upload-file-container">
      <div className="upload-left-section">
        <h2>Upload</h2>
        <div className="drag-area">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
          >
            <input
              type="file"
              multiple
              hidden
              className="Input File"
              onChange={handleFile}
              ref={uploadRef}
            />
            <FileDrop
              onFrameDragEnter={(event) =>
                console.log("onFrameDragEnter", event)
              }
              onFrameDragLeave={(event) =>
                console.log("onFrameDragLeave", event)
              }
              onFrameDrop={(event) => console.log("onFrameDrop", event)}
              onDragOver={(event) => console.log("onDragOver", event)}
              onDragLeave={(event) => console.log("onDragLeave", event)}
              onDrop={(files, event) => handleFiles(event, files)}
            >
              <img src={FolderImg} alt="" />
              <h3>
                Drag your documents, photos or videos here to start uploading
              </h3>
              <span>OR</span>
              <div onClick={handleBrowseClick} className="upload-btn">
                Browse File
              </div>
            </FileDrop>
          </form>
        </div>
        <button type="submit">Submit</button>
      </div>
      <div className="upload-right-section">
        <h2>Files</h2>
        <div className="file-view-section">
          <div className="file-container">
            {files.map((file, index) => {
              return (
                <div key={index} className="file">
                  <AiOutlineFile />
                  <h6>{file.name}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
