import "./Home.css";
import { Link } from "react-router-dom";
import logo from "../../assets/stb.svg";
import { useState ,useEffect} from "react";
import right from "../../assets/right-content.png";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
  let path = `/Upload` 
  navigate(path);
}
  //console.log(props.userAuth)
  const [UserName, setUserName] = useState("");
  const [authUser,setauthUser]=useState(false);
  const handleChange = (event) => {
    const { value } = event.target;
    setUserName((data) => {
      return value;
    });
    console.log(UserName);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit", UserName);
    props.setusername(UserName);
    props.setUserAuth(true);
  };
  useEffect(() => {
    
  for(let i=0;i<props.userlist.length;i++)
  {
    if(props.userlist[i].owner===props.account)
    setauthUser(true)
  }
    
  }, [props.userlist])
  
  return (
    <div className="home">
      <div className="blob-left"></div>
      <div className="grey-bg"></div>
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

      <div className="container-mid">
        <div className="left-content-home">
          <div className="taglines-content-home">
            <h3>
              Manage <span>all your files</span> in <span>one place</span>
            </h3>
            <h4>A comfortable and secure way to access all your files</h4>
          </div>
          <div className="input-btn">
            {!authUser ? (
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Enter your username"
                  value={UserName}
                  onChange={handleChange}
                ></input>
                <button type="Submit">Get Started</button>
              </form>
            ) : (
              <button onClick={()=>{
                routeChange()
              }} className="upload-btn">Upload</button>
            )}
          </div>
        </div>
        <div className="right-content-home">
          <img src={right}></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
