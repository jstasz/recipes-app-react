import { ReactNode } from "react";
import { Form } from "react-router-dom";
import styles from './Form.module.css'

const MainForm : React.FC<{
    children: ReactNode, 
    className?: string,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }>= (props) => {

    return (
    <Form className={`${styles.form} ${props.className}`} onSubmit={props.onSubmit}>
            {props.children}
    </Form>
    )
}

export default MainForm;