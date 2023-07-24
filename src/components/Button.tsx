import { ReactNode } from 'react';
import styles from './Button.module.css';

const Button: React.FC<{
    children: ReactNode, 
    className?: string; 
    type: "button" | "submit" | "reset" | undefined;
    disabled?: boolean,
    onNavigate?: () => void,
    onClick?: () => void, }> = (props) => {

    const navigateHandler = () => {
        if(props.onNavigate) {
            props.onNavigate()
        };
    };

    return (
        <button className={`${styles.button} ${props.className}`} onClick={navigateHandler} type={props.type} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;