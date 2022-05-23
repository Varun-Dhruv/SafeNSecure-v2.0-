import "./View.css";
import CardFiles from "../Card/CardFiles";
import { convertBytes } from "../../helpers";
import spidy from "../../assets/stb.svg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";

const View = (props) => {
  let Account = props.Account;
  useEffect(() => {
    let Account = props.Account;
    props.files.filter((file) => {
      if (file.uploader === Account) return true;
      return false;
    });
    console.log("View", props.files);
    let SharedFiles = props.SharedFiles;
    console.log("Shared FIles", SharedFiles);
  }, [props.files, props.Account]);

  return (
    <div className="profile-files">
      <Sidebar />
      <h1>Files</h1>
      <Tabs>
        <TabList>
          <Tab>My Files</Tab>
          <Tab>Shared With Me</Tab>
        </TabList>
        <TabPanel>
          {props.files.map((file, key) => {
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
          {props.SharedFiles.map((file, key) => {
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
