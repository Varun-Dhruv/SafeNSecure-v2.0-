import './Home.css'
import { Link } from 'react-router-dom';
const Home = (props) => {
    return ( 
    <div className="home">
        <div className="blob-left"></div>
        <div className="grey-bg"></div>
        <div className="white-bg">
            <h1>Hello world</h1>
            <Link to="/Upload">Upload</Link>
            <br/>
            <Link to="/About">About</Link>
            <br/>
            <Link to="/Share">Share</Link>
            <br/>
            <Link to="/View">View</Link>
            <br/>
       
        </div>
    </div>
    );
}
 
export default Home;