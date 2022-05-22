import React from "react";
import Web3 from 'web3';
import { useCallback, useState, useEffect } from "react";
import DStorage from './abis/DStorage.json'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Upload from "./Components/Upload/Upload";
import View from "./Components/View_Files/View"
import { ShareFile } from "./Components/ShareFiles/ShareFile";
import { Loader } from "./Loader";

const ipfsClient = require('ipfs-http-client') //Declare IPFS
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


const App = () => {

  const [Account, setAccount] = useState('0x0256785835A772D2383a3855BE33d955181E9870')
  const [Loading, setLoading] = useState(false)
  const [dstorage,setdstorage] =useState()
  const [UserCount, setUserCount] = useState(0)
  const [IsUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [UserList, setUserList] = useState([])
  const [UserName, setUserName] = useState('')
  const [FilesCount, setFilesCount] = useState(0)
  const [SharedFilesCount, setSharedFilesCount] = useState(0)
  const [Files, setFiles] = useState([])
  const [SharedFiles, setSharedFiles] = useState([])
  const [buffer, setbuffer] = useState([])

  const loadWeb3 = async () => {   //Setting up Web3
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
  const loadBlockChainData = useCallback(async () => {
    const web3 = window.web3//Declare Web3

    const accounts = await web3.eth.getAccounts() //Load account
    const account = accounts[0]
    setAccount(account)

    const networkId = await web3.eth.net.getId() //Network ID
    const networkData = DStorage.networks[networkId]

    if (networkData) {
      //IF got connection, get data from contracts
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)  //Assign contract
      setdstorage(dstorage)
      //Get number of users
      const UserCount = await dstorage.methods.userCount().call()
      setUserCount({ UserCount })

      //const SharedFiles= await dstorage.methods.sharedFiles(Account).call()
      //console.log(SharedFiles)

      //Get Users addresses
      //Get User Details
      for (let i = 1; i <= UserCount; i++) {
        const user = await dstorage.methods.UserList(i).call()
        setUserList({
          UserList: [...UserList, user]
        })
      }
      UserList.map((users, key) => {
        if (users.owner === Account) {
          setIsUserAuthenticated(true)
          setUserName(users.userName)
        }
      })

      //Get files amount
      const filesCount = await dstorage.methods.fileCount().call()
      setFilesCount(filesCount);
      //Load files&sort by the newest
      for (let i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        setFiles({
          Files: [...Files, file]
        })
      }
      const sharedFilesCount = await dstorage.methods.sharedFilesCount(Account).call()
      setSharedFilesCount(sharedFilesCount)

      for (let i = 0; i < SharedFilesCount; i++) {
        // console.log("Shared File no.",i)
        const SharedFile = await dstorage.methods.getSharedFile(Account, i).call()
        setSharedFiles({
          SharedFiles: [...SharedFiles, SharedFile]
        })
        // console.log(this.state.SharedFiles)
      }
    } else { //Else
      window.alert('DStorage contract not deployed to detected network')//alert Error
    }

    setLoading(false)
  }, [Account, Files, SharedFiles, SharedFilesCount, UserList]);
  useEffect(() => {
    setLoading(true)
    loadWeb3()
    loadBlockChainData()
    setLoading(false)
  }, [loadBlockChainData])

  const setUser =(_username)=>{
    setLoading(true)
   // console.log("Hello in username",_username)
     dstorage.methods.addUser(_username).send({ from: Account }).on('transactionHash',(hash)=>{
     setIsUserAuthenticated(true)
     setLoading(false)
      //console.log("Username set successfully")
     // window.location.reload()
    }).on('error', (e) => {
      window.alert('Error',e)
      setLoading(false)
    })
  }
  // Get file from user
  const captureFile = (File) => {

    const file = File
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {

      console.log(Buffer(reader.result))
      //console.log('buffer', this.state.buffer)
    }
  }
  const uploadFile = (file) => {
    console.log("Submitting file to IPFS...")
    const buffer=captureFile(file)
    ipfs.add(buffer, (error, result) => { //Add file to the IPFS
      console.log('IPFS result', result.size)
      if (error) { //Check If error
        console.log(error)
        return  //Return error
      }
      setLoading(true)  //Set state to loading

      if (this.state.type === '') {  //Assign value for the file without extension
        this.setState({ type: 'none' })
      }
      //Call smart contract uploadFile function 
      dstorage.methods.uploadFile(result[0].hash, result[0].size, file.type, file.name).send({ from: Account }).on('transactionHash', (hash) => {
        setLoading(false)
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error')
        setLoading(false)
      })
    })
  }

  return (
    <div className="App">
      <Router>
        <Routes>


          {<Route path="/" element={

            Loading
              ?
              <div className="Loading"><h1>Loading</h1></div>
              :
              <Home
                account={Account}
                userAuth={IsUserAuthenticated}
                setUserAuth={setIsUserAuthenticated}
                setusername={setUserName} />} />}
          <Route path="/About" element={<About />} />
          <Route path="/Share" element={<ShareFile />} />
          <Route path="/Upload" element={<Upload
          capture={captureFile}
          upload={uploadFile}
          />} />
          <Route path="/View" element={
          <View 
          filescount={FilesCount}
          files={Files}
          />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
