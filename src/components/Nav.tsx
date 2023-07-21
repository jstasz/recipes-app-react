import { NavLink} from "react-router-dom";
import styles from './Nav.module.css'

const Nav: React.FC = () => {

    const navLinkClasses = `material-symbols-outlined ${styles['nav-link']}`

    return (
        <div className={styles.nav}>
            <div className={styles['nav-links']}>
                <NavLink 
                    to="/" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` : navLinkClasses} end>home
                </NavLink>
                <NavLink 
                    to="recipes/details/0" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` : navLinkClasses}>ramen_dining
                </NavLink>
                <NavLink 
                    to="/auth?authMode=login" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` :    navLinkClasses}>account_circle
                </NavLink>
            </div>
        </div>
    );
};

export default Nav;