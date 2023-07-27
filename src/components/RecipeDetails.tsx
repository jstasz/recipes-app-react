import { useParams } from 'react-router-dom';
import Button from './UI/Button';
import styles from './RecipeDetails.module.css'
import { useContext, useState } from 'react';
import { RecipesContext } from './store/recipes-context';
import { AuthContext } from './store/auth-context';
import Modal from './UI/Modal';
import { ShoppingListContext } from './store/shopping-list-context';

const RecipeDetails: React.FC = () => {

    const { recipeId } = useParams();
    const { loadedRecipes, isLoadingRecipes, userRecipes } = useContext(RecipesContext);
    const { loggedUser } = useContext(AuthContext);
    const [activeModal, setActiveModal] = useState(false);

    const allRecipes = loggedUser ? [...loadedRecipes, ...userRecipes] : loadedRecipes;
    const activeRecipe = recipeId ? allRecipes.find(recipe => recipe.id === +recipeId) : undefined;

    const messageForLoggedIn = 'select a recipe to see details or';
    const messageForNotLoggedIn = 'select a recipe to see details';

    const [selectedIngredients, setSelectedIngredients] = useState<{id: number, name: string}[]>([]);
    const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);

    const selectIngredientsHandler = (ingredient: {id: number, name: string}) => {
        const ingredientIsSelected = selectedIngredients.find(ing => ing.id === ingredient.id);

        if(ingredientIsSelected) {
            setSelectedIngredients(prevState => prevState.filter(ing => ing.id !== ingredient.id));
        } else {
            setSelectedIngredients(prevState => [...prevState, ingredient]);
        }
    };

    const closeModal = () => {
        setActiveModal(false);
        setSelectedIngredients([]);
    };

    async function updateIngredients(shoppingListItems: {id: number, name: string}[]) {
        try {
            await fetch(`https://react-recipes-e4b3f-default-rtdb.firebaseio.com/${loggedUser.replace('.', ',')}/shopping-list.json`, {
                method: 'PUT',
                body: JSON.stringify(shoppingListItems),
                headers: {
                  'Content-Type' : 'aplication/json'
                }
            })
        } catch (error: unknown) {
            console.log(error)
        }
    };

    const addIngredients = async () => {
        const updatedShoppingListItems = [...shoppingListItems, ...selectedIngredients];
        setShoppingListItems(updatedShoppingListItems);

        try {
            await updateIngredients(updatedShoppingListItems);
        } catch (error: unknown) {
            console.log(error)
        }
        closeModal();
    };
    
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
                            onClick={() => setActiveModal(true)}
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
            <Modal onClose={closeModal}>
                <div className={styles['ingredients-modal']}>
                <p className={styles['ingredients-title']}>select the ingredients you need</p>
                <ul className={styles['recipe-ingredients-list']}>
                            {activeRecipe?.ingredients.map(ingredient => 
                            <li key={ingredient.id} className={styles.ingredient}>
                                <span 
                                    onClick={() => selectIngredientsHandler(ingredient)}
                                    className={`material-symbols-outlined 
                                    ${styles['select-icon']}
                                    ${selectedIngredients.find(ing => ing.id === ingredient.id) ? styles.active : ''}`}>
                                       {selectedIngredients.find(ing => ing.id === ingredient.id) ? 'remove_circle' : 'add_circle'}
                                </span> 
                                <label>{ingredient.name}</label>
                            </li>
                        )}
                </ul>
                <div className={styles.actions}>
                    <p>add to shopping list </p>
                    <span className={`material-symbols-outlined ${styles['add-icon']}`} onClick={addIngredients}>add_circle</span>
                </div>
                </div>
            </Modal>}
          </>
        )}
       </>
    );
}

export default RecipeDetails;