import { ReactNode } from 'react';
import styles from './HeroImage.module.css';

const HeroImage: React.FC<{children: ReactNode}> = (props) => {
    return (
        <>
            <div className={styles['image-box']}>
				<div className={styles['image-content']}>
					{props.children}
				</div>
				<div className={styles['image-bg']}></div>	
			</div>
        </>
    );
};

export default HeroImage;