import React from "react";
import Web3 from 'web3';  
import { useState,useEffect } from "react";
import DStorage from './abis/DStorage.json'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Upload from "./Components/Upload/Upload";
import View from "./Components/View_Files/View"

const App = () => {

  const [Account, setAccount] = useState('')
  const [Loading, setLoading] = useState(false)
  const [Dstorage, setDstorage] = useState()  
  const [UserCount, setUserCount] = useState(0)
  const [IsUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [UserList, setUserList] = useState([])
  const [UserName, setUserName] = useState('')
  const [FilesCount, setFilesCount] = useState(0)
  const [SharedFilesCount, setSharedFilesCount] = useState(0)
  const [Files, setFiles] = useState([])
  const [SharedFiles, setSharedFiles] = useState([])
  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])
  

  const loadWeb3=async()=> {   //Setting up Web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  const loadBlockchainData=async()=> {
    const web3 = window.web3//Declare Web3

    const accounts = await web3.eth.getAccounts() //Load account
    const account=accounts[0]
     setAccount({account})

    const networkId = await web3.eth.net.getId() //Network ID
    const networkData = DStorage.networks[networkId]

    if (networkData) { //IF got connection, get data from contracts
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)  //Assign contract
      setDstorage({dstorage})
      
      //Get number of users
      const UserCount=await dstorage.methods.userCount().call()
      setUserCount({UserCount})
     
      //const SharedFiles= await dstorage.methods.sharedFiles(this.state.account).call()
      //console.log(SharedFiles)

      //Get Users addresses
      //Get User Details
      for(let i=1;i<=UserCount;i++){
        const user=await dstorage.methods.UserList(i).call()
        setUserList({
          UserList:[...UserList,user]
        })
      }
    UserList.map((users,key)=>{
      if(users.owner===this.state.account)
      {
        setIsUserAuthenticated(true)
        setUserName(users.userName)
      }
    })   
    
      //Get files amount
      const filesCount = await dstorage.methods.fileCount().call()
      setFilesCount(filesCount);
      //Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        setFiles({
          Files:[...Files,file]
        })
      }
      const sharedFilesCount=await dstorage.methods.sharedFilesCount(this.state.account).call()
      setSharedFilesCount(sharedFilesCount)

      for(var i=0;i<SharedFilesCount;i++)
      {
       // console.log("Shared File no.",i)
        const SharedFile=await dstorage.methods.getSharedFile(this.state.account,i).call()
        setSharedFiles({
          SharedFiles:[...SharedFiles,SharedFile]
        })
       // console.log(this.state.SharedFiles)
      }
    } else { //Else
      window.alert('DStorage contract not deployed to detected network')//alert Error
    }

     this.setState({loading:false})
  }
  return ( 
  <div className="App">
    <Router>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/About" element={<About/>}/>
       <Route path="/Share" element ={<Share/>}/>
       <Route path="/Upload" element ={<div>Upload</div>}/>
       <Route path="/View" element ={<View/>}/>
      </Routes>
    </Router>

  </div> 
  );
}
 
export default App;
