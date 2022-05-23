import { useEffect, useState } from "react";
import "./ShareFile.css";
import Card from "../Card/CardShare";
import spidy from "../../assets/stb.svg";
import Identicon from "react-identicons";
import { Link } from "react-router-dom";
import logo from "../../assets/stb.svg";
import { convertBytes } from "../../helpers";
import Sidebar from "../Sidebar/Sidebar";
const Share = (props) => {
  const [SearchName, setSearchName] = useState("");
  const [SelectedFile, setSelectedFile] = useState([]);
  const [ShareUsers, setShareUsers] = useState([]);
  const [SelectUsers, setSelectUsers] = useState(false);
  const handleShare = () => {
    console.log("in Share");
    for (let i = 0; i < SelectedFile.length; i++) {
      console.log(
        ShareUsers[0],
        SelectedFile[i].fileHash,
        SelectedFile[i].fileSize,
        SelectedFile[i].fileType,
        SelectedFile[i].fileName
      );
      props.Share(
        ShareUsers[0],
        SelectedFile[i].fileHash,
        SelectedFile[i].fileSize,
        SelectedFile[i].fileType,
        SelectedFile[i].fileName
      );
    }
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchName((data) => {
      return value;
    });
  };
  useEffect(() => {
    props.files.filter((file) => {
      if (file.uploader === props.Account) return true;

      return false;
    });
  }, [props.files]);

  useEffect(() => {
    console.log(props.files);
    console.log(SearchName);

    props.files.filter((file) => file[4].includes(SearchName));
    console.log("Filtered", props.files);
  }, [SearchName]);

  return (
    <div className="share-container">
      <div className="home-nav">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="links">
          <Link to="/Profiles">
            <a>Profiles</a>
          </Link>

          <Link to="/About">
            <a>About</a>
          </Link>

          <Link to="/Share">
            <a>Share</a>
          </Link>

          <Link to="/View">
            <a>View</a>
          </Link>
        </div>
      </div>
      <div className="share-files">
        <h1>Files to be Shared</h1>
        <div className="searchBar-profiles">
          <input
            value={SearchName}
            placeholder="Enter FileName to Search"
            onChange={handleChange}
          />
        </div>
        {!SelectUsers ? (
          props.files.map((file, key) => {
            return (
              <div className="card">
                <div className="box">
                  <div className="content">
                    <img src={spidy} alt="" />
                    <div className="File-Info">
                      <ul>
                        <li>Name: {file[4]}</li>
                        <li>Size: {convertBytes(file[2])}</li>
                        <li></li>
                      </ul>
                    </div>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedFile((prevFile) => [...prevFile, file]);
                        console.log(SelectedFile);
                      }}
                    >
                      Select File
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="Users">
            {props.users
              .filter((user) => user.userName.includes(SearchName))
              .map((user, key) => {
                return (
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <Identicon string={user.owner} size=" 40" />
                        {/* <img src={spidy} alt="" /> */}
                        <div className="Info">
                          <p>Name: {user.userName}</p>
                          <p> Account: {user.owner}</p>
                        </div>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            setShareUsers((prevUser) => [
                              ...prevUser,
                              user.owner,
                            ]);
                          }}
                        >
                          Select User
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            )
          </div>
        )}
        {!SelectUsers && (
          <button
            onClick={() => {
              setSelectUsers(true);
            }}
          >
            Select User
          </button>
        )}
        {SelectUsers && (
          <button
            onClick={() => {
              handleShare();
            }}
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
};

export default Share;
