import React, { ReactNode } from 'react'
import styles from './HeroImage.module.css';

const HeroImage: React.FC<{children: ReactNode, imageUrl: string}> = (props) => {
    return (
        <>
            <div className={styles['image-box']} style={{backgroundImage: `url(${props.imageUrl})`}}>
				<div className={styles['image-content']}>
					{props.children}
				</div>
				<div className={styles['image-bg']}></div>	
			</div>
        </>
    );
};

export default HeroImage;