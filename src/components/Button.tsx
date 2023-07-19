import { ReactNode } from 'react';
import styles from './Button.module.css';

const Button: React.FC<{children: ReactNode}> = (props) => {
    return (
        <button className={styles.button}>
            {props.children}
        </button>
    );
};

export default Button;