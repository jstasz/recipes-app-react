import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import Button from './UI/Button';
import Modal from './UI/Modal';
import { RecipesContext } from './store/recipes-context';
import { ShoppingListContext } from './store/shopping-list-context';
import styles from './RecipeDetails.module.css'
import PageAction from './UI/PageAction';
import { useSelector } from 'react-redux';



const RecipeDetails: React.FC = () => {

    const { recipeId } = useParams();
    const { loadedRecipes, userRecipes } = useContext(RecipesContext);
    const loggedUser = useSelector((state: any) => state.logginUser);
    const [ activeModal, setActiveModal ] = useState(false);

    const allRecipes = loggedUser ? [...loadedRecipes, ...userRecipes] : loadedRecipes;
    const activeRecipe = recipeId ? allRecipes.find(recipe => recipe.id === +recipeId) : undefined;

    const [ selectedIngredients, setSelectedIngredients ] = useState<{id: number, name: string}[]>([]);
    const { shoppingListItems } = useContext(ShoppingListContext);

    const [error, setError] = useState('');

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
            setError('Sorry, problem with updating ingredients! try again later!')
        }
    };

    const addIngredients = async () => {
        const updatedShoppingListItems = [...shoppingListItems];

        for (const ingredient of selectedIngredients) {
            const isDuplicate = shoppingListItems.some(item => item.id === ingredient.id || item.name === ingredient.name);
            if (!isDuplicate) {
                updatedShoppingListItems.push(ingredient);
            }
        }

        try {
            await updateIngredients(updatedShoppingListItems);
        } catch (error: unknown) {
            setError('Sorry, problem with updating ingredients! try again later!');
        }
        closeModal();
    };
    
    return (
        <>
        {error && <p>{error}</p>}
        {!error && 
        <>
            <PageAction >
                <Button 
                type="button" 
                icon="arrow_back"
                navigationPath="/recipes/list"
                >Back to list</Button>
            </PageAction>
            <div className={styles['recipe-box']}>
            <p className={styles.title}>{activeRecipe?.name}</p>
            <div className={styles['recipe-img']} style={{backgroundImage: `url(${activeRecipe?.imageUrl})`}}></div>
            <div className={styles['recipe-ingredients']}>
                <ul className={styles['recipe-ingredients-list']}>
                    <p className={styles['section-title']}>ingredients</p>
                    {activeRecipe?.ingredients.map(ingredient => 
                    <li key={ingredient.id}>{ingredient.name}</li>)}
                </ul>
                {loggedUser && 
                <Button 
                    type="button" 
                    icon="add"
                    className={styles['add-to-shopping-list']} 
                    onClick={() => setActiveModal(true)}
                    >Add to list
                </Button>}
            </div>
            <div className={styles['recipe-instruction']}>
                <p className={styles['section-title']}>instruction</p> 
                <p>{activeRecipe?.instruction}</p></div>
            </div>
           
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
                    <Button type="button" icon="add" onClick={addIngredients} disabled={selectedIngredients.length < 1}>Add</Button>
                </div>
                </div>
            </Modal>}
            </>}
          </>
        )
    }

export default RecipeDetails;