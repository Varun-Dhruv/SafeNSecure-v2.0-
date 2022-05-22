import React from "react";
import "./Profiles.css"
import {useState, useEffect } from "react";
 

const Profiles = (props) => {
    const [SearchName, setSearchName] = useState('')
    
    const handleChange=(event)=>{
    const {value}=event.target;
    setSearchName((data)=>{return value})
    }
    return ( 
      props.userlist.length &&  <div className="Profile">
            <h1>Profiles</h1>
            <div className="searchBar-Profiles">
            <input
            value={SearchName}
            placeholder="Enter UserName to Search"
            onChange={handleChange}
            />
          
            </div>
            <div className="Hello">
               { props.userlist.filter(user=>user.userName.includes(SearchName)).map((user,key)=>{
                  return(
                      <div>
                          <h3>UserName: {user.userName}</h3>
                          <h3>Account: {user.owner}</h3>
                      </div>
                  )
                })}
            
            </div>
        </div>
        
    );
}
 
export default Profiles;
