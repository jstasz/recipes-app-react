import Button from './Button';
import styles from './HeroImage.module.css';

const HeroImage = () => {
    return (
        <>
            <div className={styles['image-box']}>
				<div className={styles['image-content']}>
					<h1>Recipes App</h1>
					<p>get inspired with our</p>
                    <Button>Recipes List</Button>
                    <p>or</p>
                    <Button>Login</Button>
					<p>to add your own recipes</p>
					<p>and create a shopping list</p>
				</div>
				<div className={styles['image-bg']}></div>	
			</div>
        </>
    );
};

export default HeroImage;