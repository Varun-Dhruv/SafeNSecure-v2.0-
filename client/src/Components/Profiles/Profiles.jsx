import React from "react";
import "./Profiles.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Identicon from 'react-identicons';
import Sidebar from "../Sidebar/Sidebar";
import Card from "../Card/Card";

const Profiles = (props) => {
    let navigate = useNavigate(); 
    const routeChange = (owner) =>{ 
    let path = `/Profile/`+owner; 
    navigate(path);
  }
    const [SearchName, setSearchName] = useState('')

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchName((data) => { return value })
    }
    return (
        props.userlist.length && 
        <div className="Profile">
            <Sidebar/>
            <h1>Profiles</h1>
            <div className="searchBar-Profiles">
                <input
                    value={SearchName}
                    placeholder="Enter UserName to Search"
                    onChange={handleChange}
                />

            </div>
            <div className="Profile-list">
                {props.userlist.filter(user => user.userName.includes(SearchName)).map((user, key) => {
                    return (
                       
                        <div className="Profile-content">
                             <Card Name={user.userName}
                             Account={user.owner}/>
                            {/* <div className="Profile-identicon">
                                <Identicon string={user.owner} size=' 40' />
                            </div>
                            <div className="Profile-details">
                                <h3>UserName: {user.userName}</h3>
                                <h3>Account: {user.owner}</h3>
                            </div>
                            <div>
                                <button onClick={()=>{routeChange(user.owner)}}>View Files</button>
                            </div> */}
                        </div>
                    )
                })}

            </div>
        </div>

    );
}

export default Profiles;
