import { ReactNode } from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop: React.FC<{
    onClose: () => void }> = props => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay: React.FC<{
    children: ReactNode}> = props => {
    return   (
         <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
};

const portalElement: Element | DocumentFragment = document.getElementById('overlays')!;

const Modal: React.FC<{
    children: ReactNode,
    onClose: () => void }> = props => {
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
};

export default Modal;