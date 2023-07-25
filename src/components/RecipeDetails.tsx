import { useParams } from 'react-router-dom';
import Button from './Button';
import styles from './RecipeDetails.module.css'
import { useContext } from 'react';
import { RecipesContext } from './store/recipes-context';
import { AuthContext } from './store/auth-context';

const RecipeDetails: React.FC = () => {

    const { recipeId } = useParams();
    const { loadedRecipes, isLoadingRecipes, userRecipes } = useContext(RecipesContext);
    const { loggedUser } = useContext(AuthContext);

    const allRecipes = loggedUser ? [...loadedRecipes, ...userRecipes] : loadedRecipes;
    const activeRecipe = recipeId ? allRecipes.find(recipe => recipe.id === +recipeId) : undefined;

    const messageForLoggedIn = 'select a recipe to see details or';
    const messageForNotLoggedIn = 'select a recipe to see details';
    
    return (
        <>
        {!isLoadingRecipes && (
            <>
            {recipeId !== '0' && 
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
                </div>}
            {recipeId === '0' && 
                <p className={styles['select-recipe']}>{recipeId === '0' && !loggedUser ? 
                    messageForNotLoggedIn : messageForLoggedIn}
                </p>}
            {loggedUser && 
            <Button type='button' className={styles['add-recipe']} navigationPath="/recipes/new"> + Add new recipe </Button>}
          </>
        )}
       </>
    );
}

export default RecipeDetails;