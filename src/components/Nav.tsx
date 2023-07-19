import { Link } from "react-router-dom";
import styles from './Nav.module.css'

function Nav() {
    return (
        <div className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="recipes">Recipes</Link>
        </div>
    );
};

export default Nav;