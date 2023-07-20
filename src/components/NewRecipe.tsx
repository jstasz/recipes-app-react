import Button from './Button';
import styles from './NewRecipe.module.css'

const NewRecipe: React.FC = () => {
    return (
        <div className={styles['new-recipe']}>
            <Button className={styles['button-new']}>Add new recipe</Button>
        </div>
    )
}

export default NewRecipe;