import { useNavigate, useParams } from 'react-router-dom';
import Button from './Button';
import styles from './RecipeDetails.module.css'
import { useContext } from 'react';
import { RecipesContext } from './store/recipes-context';

const RecipeDetails: React.FC = () => {

    const navigate = useNavigate();
    function navigateToNewRecipeHandler() {
        navigate('/recipes/new');
    };

    const { recipeId} = useParams();
    const { recipes } = useContext(RecipesContext);
    const { isLoadingRecipes } = useContext(RecipesContext);

    const activeRecipe = recipeId ? recipes.find(recipe => recipe.id === +recipeId) : undefined;
    
    return (
        !isLoadingRecipes ? (
          <>
            <Button className={styles['button-new']} onNavigate={navigateToNewRecipeHandler}>
              Add new recipe
            </Button>
            <div className={styles['recipe-box']}>
                <div className={styles['recipe-ingredients']}>
                    <p className={styles.title}>{activeRecipe?.name}</p>
                    <ul className={styles['recipe-ingredients-list']}>
                        <p className={styles['ingredients-title']}>Ingredients</p>
                        {activeRecipe?.ingredients.map(ingredient => 
                            <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                    <Button className={styles['add-to-list']}>Add to shopping list</Button>
                </div>
                <div className={styles['recipe-img']} style={{backgroundImage: `url(${activeRecipe?.imageUrl})`}}></div>
                <div className={styles['recipe-instruction']}>
                    <p>{activeRecipe?.instruction}</p>
                </div>
            </div>
          </>
        ) : null
    );
}

export default RecipeDetails;