import "./View.css"


const View = (props) => {
    console.log('View',props.files)
    return ( 
    <div className="View">
         <h1>Uploaded Files</h1><br></br>
        {
         props.files.map((file,key)=>{
            return(
                <div className="Files div">
                <p>{file[4]}</p>
                <br></br>
                </div>
            )
        })
        }
    </div> );
}
 
export default View;