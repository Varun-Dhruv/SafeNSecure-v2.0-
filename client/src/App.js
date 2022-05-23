import React from "react";
import Web3 from "web3";
import { useCallback, useState, useEffect } from "react";
import DStorage from "./abis/DStorage.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Upload from "./Components/Upload/Upload";
import View from "./Components/View_Files/View";
import Share from "./Components/ShareFiles/ShareFile";
import Profiles from "./Components/Profiles/Profiles";
import CardFiles from "./Components/Card/CardFiles";
import { Loader } from "./Loader";
import { create } from "ipfs-http-client";
import Card from "./Components/Card/Card";
import Dropdown from "./Components/Dropdown/Dropdown";
import Sidebar from "./Components/Sidebar/Sidebar";

const App = () => {
  // connect to the default API address http://localhost:5001
  const IPFS = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  }); // connect using a URL

  const [Account, setAccount] = useState(
    "0x0256785835A772D2383a3855BE33d955181E9870"
  );
  const [Loading, setLoading] = useState(false);
  const [dstorage, setdstorage] = useState();
  const [UserCount, setUserCount] = useState(0);
  const [IsUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [UserName, setUserName] = useState("");
  const [FilesCount, setFilesCount] = useState(0);
  const [SharedFilesCount, setSharedFilesCount] = useState(0);
  const [Files, setFiles] = useState([]);
  const [SharedFiles, setSharedFiles] = useState([]);
  //const [buffer, setbuffer] = useState()

  const loadWeb3 = async () => {
    //Setting up Web3

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockChainData = useCallback(async () => {
    const web3 = window.web3; //Declare Web3

    const accounts = await web3.eth.getAccounts(); //Load account
    const account = accounts[0];
    setAccount(account);

    const networkId = await web3.eth.net.getId(); //Network ID
    const networkData = DStorage.networks[networkId];

    if (networkData) {
      //IF got connection, get data from contracts
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address); //Assign contract
      setdstorage(dstorage);
      //Get number of users
      const UserCount = await dstorage.methods.userCount().call();
      setUserCount(UserCount);
      console.log(UserCount);

      //const SharedFiles= await dstoraxge.methods.sharedFiles(Account).call()
      //console.log(SharedFiles)

      //Get Users addresses
      //Get User Details
      
        for (let i = 1; i <= UserCount; i++) {
          const user = await dstorage.methods.UserList(i).call()
          console.log(i,user)
          setUserList((UserList) => [...UserList, user])
        }
      //console.log(UserList)
      // UserList.map((users, key) => {
      //   console.log("User", users)
      //   if (users.owner === Account) {
      //     setIsUserAuthenticated(true)
      //     setUserName(users.userName)
      //   }
      // })

      //Get files amount
      const filesCount = await dstorage.methods.fileCount().call();
      setFilesCount(filesCount);
      console.log("Filecount", filesCount);

      //Load files&sort by the newest
      for (let i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call();

        // console.log(i,file)
        setFiles((Files) => [...Files, file]);
        //console.log(Files)
      }
      const sharedFilesCount = await dstorage.methods
        .sharedFilesCount(Account)
        .call();
      setSharedFilesCount(sharedFilesCount);

      for (let i = 0; i < SharedFilesCount; i++) {
        // console.log("Shared File no.",i)
        const SharedFile = await dstorage.methods
          .getSharedFile(Account, i)
          .call();
        console.log(SharedFile);
        setSharedFiles((SharedFiles) => [...SharedFiles, SharedFile]);
        // console.log(this.state.SharedFiles)
      }
    } else {
      //Else
      window.alert("DStorage contract not deployed to detected network"); //alert Error
    }

    setLoading(false);
  }, [Account]);

  const ShareFile = (address, fileHash, fileSize, fileType, fileName) => {
    //console.log(address,fileHash,fileSize,fileType,fileName,fileDescription);
    setLoading(true);
    console.log(
      "inSHaerefile",
      address,
      fileHash,
      fileSize,
      fileType,
      fileName
    );
    dstorage.methods
      .shareFile(address, fileHash, fileSize, fileType, fileName)
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        setLoading(false);
        alert("File Shared  successfully");
        // window.location.reload()
      })
      .on("error", (e) => {
        window.alert("Error", e);
        setLoading(false);
      });
  };
  const setUser = (_username) => {
    setLoading(true);
    // console.log("Hello in username",_username)
    dstorage.methods
      .addUser(_username)
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        setIsUserAuthenticated(true);
        setLoading(false);
        //console.log("Username set successfully")
        // window.location.reload()
      })
      .on("error", (e) => {
        window.alert("Error", e);
        setLoading(false);
      });
  };
  // Get file from user
  const captureFile = (File) => {
    const file = File;
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log(Buffer(reader.result));
      //console.log('buffer', this.state.buffer)
    };
  };
  const uploadFile = (file) => {
    console.log("Submitting file to IPFS...");

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const buff = Buffer(reader.result);
      const result = await IPFS.add(buff);
      //console.log(result)

      setLoading(true); //Set state to loading

      if (file.type === "") {
        //Assign value for the file without extension
        file.type = "none";
      }
      //Call smart contract uploadFile function
      console.log(result.path, result.size);
      dstorage.methods
        .uploadFile(result.path, result.size, file.type, file.name)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          setLoading(false);
          window.location.reload();
        })
        .on("error", (e) => {
          window.alert("Error");
          setLoading(false);
        });
    };
  };

  useEffect(() => {
    setLoading(true);
    loadWeb3();
    loadBlockChainData();
    setLoading(false);
    console.log(Account);
    console.log(IsUserAuthenticated);
  }, [loadBlockChainData]);

  //console.log("SharedFile ",SharedFiles[0])

  if (Loading) {
    console.log(Loading);
    return <div>Loader</div>;
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
                userlist={UserList}
                account={Account}
                userAuth={IsUserAuthenticated}
                setUserAuth={setIsUserAuthenticated}
                setusername={setUser} />} />}
          <Route path="/Profiles" element={<Profiles
            dstorage={dstorage}
            userlist={UserList}
            files={Files} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Share" element={<Share
           dstorage={dstorage}
          Account={Account}
          files={Files}
          Share={ShareFile}
          users={UserList} />} />
          <Route path="/Upload" element={<Upload
            capture={captureFile}
            upload={uploadFile}
          />} />
          <Route path="/View" element={
            <View
            dstorage={dstorage}
              Account={Account}
              SharedFiles={SharedFiles}
              filescount={FilesCount}
              files={Files}
            />} />
            <Route path="/Profile/:Account" element={<CardFiles userlist={UserList}
                                                           files={Files} />}/>
            
                
            
        </Routes>
      </Router>
    </div>
  );
};

export default App;
