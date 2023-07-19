import { Link } from "react-router-dom";
import HamburgerButton from "./Hamburger";
import { useState } from "react";
import styles from './Nav.module.css'

const Nav: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState(false);

    const toggleMenuHandler = () => {
        setActiveMenu((prevState) => !prevState);
    };

    return (
        <div className={`${styles.nav} ${activeMenu && styles['active']}`}>
            <div className={styles.hamburger}>
                <HamburgerButton activeMenu={activeMenu} onActiveHamburger={toggleMenuHandler}/>
            </div>
            <div className={styles['nav-links']}>
                <Link to="/" className={styles['nav-link']}>Home</Link>
                <Link to="recipes" className={styles['nav-link']}>Recipes</Link>
            </div>
        </div>
    );
};

export default Nav;