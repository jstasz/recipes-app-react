import { ReactNode } from 'react';
import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';

const Button: React.FC<{
    children: ReactNode, 
    className?: string,
    type: "button" | "submit" | "reset" | undefined,
    icon?: string,
    disabled?: boolean,
    navigationPath?: string,
    onClick?: () => void }> = (props) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        if(props.navigationPath) {
            navigate(props.navigationPath)
        } 

        if(props.onClick) {
            props.onClick()
        }
    };

    return (
        <div className={styles.button}>
        <button className={`material-symbols-outlined ${styles['button-icon']} ${props.className} `} onClick={clickHandler} type={props.type} disabled={props.disabled}> {props.icon}
        </button>
        <p className={styles['button-title']}>{props.children}</p>
        </div>
    );
};

export default Button;