import { NavLink} from "react-router-dom";
import styles from './Nav.module.css'
import { useSelector } from 'react-redux';


const Nav: React.FC = () => {

    const navLinkClasses = `material-symbols-outlined ${styles['nav-link']}`
    const loggedUser = useSelector((state: any) => state.logginUser);

    return (
        <div className={styles.nav}>
            <div className={styles['nav-links']}>
                <NavLink 
                    to="/" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` : navLinkClasses} end>home
                </NavLink>
                <NavLink 
                    to="recipes/list" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` : navLinkClasses}>ramen_dining
                </NavLink>
                {loggedUser && <NavLink 
                    to="/shopping-list" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` : navLinkClasses}>list_alt
                </NavLink>}
                <NavLink 
                    to="/auth?authMode=login" 
                    className={({isActive}) => isActive ? `${navLinkClasses} ${styles.active}` : navLinkClasses}>account_circle
                </NavLink>
            </div>
        </div>
    );
};

export default Nav;