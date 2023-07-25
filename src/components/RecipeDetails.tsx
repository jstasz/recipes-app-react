import { useParams } from 'react-router-dom';
import Button from './Button';
import styles from './RecipeDetails.module.css'
import { useContext } from 'react';
import { RecipesContext } from './store/recipes-context';
import { AuthContext } from './store/auth-context';

const RecipeDetails: React.FC = () => {

    const { recipeId } = useParams();
    const { recipes, isLoadingRecipes } = useContext(RecipesContext);
    const { loggedUser } = useContext(AuthContext);

    const activeRecipe = recipeId ? recipes.find(recipe => recipe.id === +recipeId) : undefined;
    
    const recipeDetails =      
        <div className={styles['recipe-box']}>
            <div className={styles['recipe-ingredients']}>
                <p className={styles.title}>{activeRecipe?.name}</p>
                <ul className={styles['recipe-ingredients-list']}>
                    <p className={styles['ingredients-title']}>Ingredients</p>
                    {activeRecipe?.ingredients.map(ingredient => 
                    <li key={ingredient.id}>{ingredient.name}</li>)}
                </ul>
                <Button type="button" className={styles['add-to-shopping-list']}>Add to shopping list</Button>
            </div>
            <div className={styles['recipe-img']} style={{backgroundImage: `url(${activeRecipe?.imageUrl})`}}></div>
            <div className={styles['recipe-instruction']}><p>{activeRecipe?.instruction}</p></div>
        </div>;
    
    return (
        <>
        {!isLoadingRecipes ? (
          <>
            {recipeId === '0' ? <p className={styles['select-recipe']}>select a recipe to view details</p> : recipeDetails}
            {loggedUser && <>
            <p>or</p>
            <Button type='button' className={styles['add-recipe']} navigationPath="/recipes/new"> + Add new recipe </Button>
            </>}
          </>
        ) : null}
       </>
    );
}

export default RecipeDetails;