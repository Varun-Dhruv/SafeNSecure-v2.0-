import "./View.css";
import CardFiles from "../Card/CardFiles";
import { convertBytes } from "../../helpers";
import spidy from "../../assets/stb.svg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

const View = (props) => {
  const [FilesCount, setFilesCount] = useState(0);
  const [Files, setFiles] = useState([]);
  const [SharedFilesCount, setSharedFilesCount] = useState(0);
  const [SharedFiles, setSharedFiles] = useState([]);
  let Account = props.Account;
  useEffect(async () => {
    const filesCount = await props.dstorage.methods.fileCount().call();
    setFilesCount(filesCount);
    console.log("Filecount", filesCount);

    //Load files&sort by the newest
    for (let i = filesCount; i >= 1; i--) {
      const file = await props.dstorage.methods.files(i).call();
      // console.log(i,file)
      setFiles((Files) => [...Files, file]);
      //console.log(Files)
      const sharedFilesCount = await props.dstorage.methods
        .sharedFilesCount(Account)
        .call();
      setSharedFilesCount(sharedFilesCount);

      for (let i = 0; i < SharedFilesCount; i++) {
        // console.log("Shared File no.",i)
        const SharedFile = await props.dstorage.methods
          .getSharedFile(Account, i)
          .call();
        console.log(SharedFile);
        setSharedFiles((SharedFiles) => [...SharedFiles, SharedFile]);
        // console.log(this.state.SharedFiles)
      }
      let Account = props.Account;
      Files.filter((file) => {
        if (file.uploader === Account) return true;
        return false;
      });
      console.log("View", Files);
      console.log("Shared Files", SharedFiles);
    }
  }, [props.dstorage]);

  return (
    <div className="Profile-Files">
      <Sidebar />
      <h1>Files</h1>
      <Tabs>
        <TabList>
          <Tab>My Files</Tab>
          <Tab>Shared With Me</Tab>
        </TabList>
        <TabPanel>
          {Files.map((file, key) => {
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
                    <a href={"https://ipfs.infura.io/ipfs/" + file[1]}>
                      View File
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel>
          {SharedFiles.map((file, key) => {
            console.log("Shared Files View", file);
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
                    <a href={"https://ipfs.infura.io/ipfs/" + file[1]}>
                      View File
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default View;
