import Button from './Button';
import styles from './RecipeDetails.module.css'

const RecipeDetails: React.FC = () => {
return (
        <div className={styles['recipe-box']}>
            <div className="recipe-ingredients">
                <Button className={styles['add-to-list']}>Add to shopping list</Button>
            </div>
            <div className="recipe-img"></div>
            <div className="recipe-instruction"></div>
        </div>
    )
}

export default RecipeDetails;