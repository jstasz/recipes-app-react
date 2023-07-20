import { ReactNode } from 'react';
import styles from './Button.module.css';

const Button: React.FC<{
    children: ReactNode, 
    className?: string; 
    onNavigate?: () => void, }> = (props) => {

    const navigateHandler = () => {
        if(props.onNavigate) {
            props.onNavigate()
        };
    };

    return (
        <button className={`${styles.button} ${props.className}`} onClick={navigateHandler}>
            {props.children}
        </button>
    );
};

export default Button;