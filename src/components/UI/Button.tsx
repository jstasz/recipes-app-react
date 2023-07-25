import { ReactNode } from 'react';
import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';

const Button: React.FC<{
    children: ReactNode, 
    className?: string; 
    type: "button" | "submit" | "reset" | undefined;
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
        <button className={`${styles.button} ${props.className}`} onClick={clickHandler} type={props.type} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;