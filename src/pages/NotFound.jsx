import { Link } from "react-router";
import styles from './NotFound.module.css';

function NotFound(){
    return(
        <div className={styles["not-found"]}>
            <h2>404 - Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    )
}

export default NotFound