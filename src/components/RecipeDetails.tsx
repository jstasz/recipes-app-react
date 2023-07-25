import { useParams } from 'react-router-dom';
import Button from './UI/Button';
import styles from './RecipeDetails.module.css'
import { useContext, useState } from 'react';
import { RecipesContext } from './store/recipes-context';
import { AuthContext } from './store/auth-context';
import Modal from './UI/Modal';

const RecipeDetails: React.FC = () => {

    const { recipeId } = useParams();
    const { loadedRecipes, isLoadingRecipes, userRecipes } = useContext(RecipesContext);
    const { loggedUser } = useContext(AuthContext);
    const [activeModal, setActiveModal] = useState(false);

    const allRecipes = loggedUser ? [...loadedRecipes, ...userRecipes] : loadedRecipes;
    const activeRecipe = recipeId ? allRecipes.find(recipe => recipe.id === +recipeId) : undefined;

    const messageForLoggedIn = 'select a recipe to see details or';
    const messageForNotLoggedIn = 'select a recipe to see details';

    const activeModalHandler = () => {
        setActiveModal(true);
        console.log(activeModal)
    }
    
    return (
        <>
        {!isLoadingRecipes && (
            <>
            {recipeId !== '0' && 
                <div className={styles['recipe-box']}>
                    <div className={styles['recipe-ingredients']}>
                        <p className={styles.title}>{activeRecipe?.name}</p>
                        <ul className={styles['recipe-ingredients-list']}>
                            <p className={styles['ingredients-title']}>ingredients list</p>
                            {activeRecipe?.ingredients.map(ingredient => 
                            <li key={ingredient.id}>{ingredient.name}</li>)}
                        </ul>
                        {loggedUser && 
                        <Button 
                            type="button" 
                            className={styles['add-to-shopping-list']} 
                            onClick={activeModalHandler}
                            >Add to shopping list
                        </Button>}
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
            {activeModal && 
            <Modal onClose={() => setActiveModal(false)}>
                <div className={styles['ingredients-modal']}>
                <p className={styles['ingredients-title']}>select the ingredients you need</p>
                <ul className={styles['recipe-ingredients-list']}>
                            {activeRecipe?.ingredients.map(ingredient => 
                            <li key={ingredient.id} className={styles.ingredient}>
                                <span 
                                    className={`material-symbols-outlined ${styles['select-icon']} ${styles.active}`}>add_circle
                                </span>
                                <label>{ingredient.name}</label>
                            </li>
                        )}
                </ul>
                <div className={styles.actions}>
                    <p>add to shopping list </p>
                    <span className={`material-symbols-outlined ${styles['add-icon']}`}>add_circle</span>
                </div>
                </div>
            </Modal>}
          </>
        )}
       </>
    );
}

export default RecipeDetails;