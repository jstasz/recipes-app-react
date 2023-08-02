import { ReactNode } from 'react';
import styles from './PageAction.module.css'

const PageAction: React.FC<{
    children: ReactNode
}> = (props) => {

    return (
        <div className={styles['action-box']}>{props.children}</div>
    )
}

export default PageAction;