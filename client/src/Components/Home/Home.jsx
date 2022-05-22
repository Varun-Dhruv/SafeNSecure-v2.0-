import './Home.css'
import { Link } from 'react-router-dom';
import logo from "../../assets/stb.svg"
import { useState } from 'react';
import right from "../../assets/right-content.png"


const Home = (props) => {
    //console.log(props.userAuth)
    const [UserName, setUserName] = useState('')
    const handleChange = (event) => {
        const {value}=event.target;
        setUserName((data)=>{return value})
        console.log(UserName)
        
      }
      const handleSubmit = (event) => {
      event.preventDefault()
      console.log("Handle submit",UserName)
      props.setusername(UserName)
      props.setUserAuth(true)
      }
    return (
        <div className="home">
            <div className="blob-left"></div>
            <div className="grey-bg"></div>
            <div className="home-nav">
                <div className='logo'>
                    <Link to="/" ><img src={logo} alt="logo"></img></Link>
                </div>
                <div className="links">
                    <Link to="/Profiles"><a>Profiles</a></Link>

                    <Link to="/About"><a>About</a></Link>

                    <Link to="/Share"><a>Share</a></Link>

                    <Link to="/View"><a>View</a></Link>

                </div>
            </div>

            <div className='container-mid'>
                <div className="left-content-home">
                    <div className='taglines-content-home'>
                        <h3>Manage All your files in one place</h3>
                    </div>
                     <div className="input-btn">
                     {!props.userAuth?<form onSubmit={handleSubmit}>
                            <input
                                placeholder='Enter your username'
                                value={UserName}
                                onChange={handleChange}
                            ></input>
                            <button type='Submit'>Get Started</button>
                        </form>
                        : <button className='upload-btn'>Upload</button>
                        }
                    </div>
                </div>
                <div className="right-content-home">
                      <img src={right}></img>
                </div>

            </div>
        </div>
    );
}

export default Home;