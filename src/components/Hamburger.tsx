import styles from './HamburgerButton.module.css';

const HamburgerButton: React.FC<{activeMenu: boolean, onActiveHamburger: () => void}> = ({activeMenu, onActiveHamburger}) => {

    const buttonClassees = `${styles['hamburger']} ${styles['hamburger--spin']} ${activeMenu && styles['is-active']}`;

    return (
        <>
        <button className={buttonClassees} type="button" onClick={onActiveHamburger}>
        <span className={styles['hamburger-box']}>
            <span className={styles['hamburger-inner']}></span>
        </span>
        </button>
        </>
    )
};

export default HamburgerButton;