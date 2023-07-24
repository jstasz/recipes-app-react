import styles from './NewRecipe.module.css'
import useInput from '../hooks/use-input';
import Button from './Button';
import { useEffect, useState } from 'react';
import MainForm from './Form';
import Recipe from '../models/recipe';

const NewRecipe: React.FC = () => {

    const [formIsValid, setFormIsValid] = useState(false);

    const { 
        value: enteredName, 
        isValid: enteredNameIsValid,
        hasError: nameInputHasError, 
        valueBlurHandler: nameBlurHandler, 
        valueChangeHandler: nameChangeHandler,
        resetValue: resetEnteredName
    } = useInput(value => value.trim() !== '');

    const { 
        value: enteredInstruction, 
        isValid: enteredInstructionIsValid,
        hasError: instructionInputHasError, 
        valueBlurHandler: instructionBlurHandler, 
        valueChangeHandler: instructionChangeHandler,
        resetValue: resetEnteredInstruction
    } = useInput(value => value.trim() !== '');

    const { 
        value: enteredImageUrl, 
        isValid: enteredImageUrlIsValid,
        hasError: imageUrlInputHasError, 
        valueBlurHandler: imageUrlBlurHandler, 
        valueChangeHandler: imageUrlChangeHandler,
        resetValue: resetEnteredImageUrl
    } = useInput(value => value.trim() !== '' );
    
    const { 
        value: enteredIngredient, 
        isValid: enteredIngredientsIsValid,
        hasError: ingredientsInputHasError, 
        valueBlurHandler: ingredientsBlurHandler, 
        valueChangeHandler: ingredientsChangeHandler,
        resetValue: resetEnteredIngredient
    } = useInput(value => value.trim() !== '');

    const addRecipeHandler = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!formIsValid) {
            return
        };

        resetEnteredName();
        resetEnteredInstruction();
        resetEnteredImageUrl();
        resetEnteredIngredient()

        addRecipe();
    }

    const [ingredients, setIngredients] = useState<string[]>([]);

    const addIngredient = (ingredient: string) => {
        if(ingredient === '') {
            return;
        } 

        setIngredients(prevIngr => [...prevIngr, ingredient])
        resetEnteredIngredient();
    };

    const addRecipe = () => {
        const id = Math.floor(Math.random() * 100000);
        const newRecipe: Recipe = {
            id: id, 
            name: enteredName, 
            instruction: enteredInstruction, 
            imageUrl: enteredImageUrl,  
            ingredients: ingredients
        }
        setIngredients([]);
        console.log(newRecipe);
    };

    useEffect(() => {
        if(enteredNameIsValid && enteredInstructionIsValid && enteredImageUrlIsValid && ingredients.length > 0) {
          setFormIsValid(true)
        } else {
          setFormIsValid(false)
        }
    }, [enteredNameIsValid, enteredInstructionIsValid, enteredImageUrlIsValid, ingredients]);

    return (
        <MainForm onSubmit={addRecipeHandler} >
        <h1>Add new recipe</h1>
        <div>
            <label htmlFor="name">name</label>
            <input 
                id="name" 
                type="text" 
                name="name" 
                value={enteredName} 
                onChange={nameChangeHandler} 
                onBlur={nameBlurHandler}
                required 
            />
            {nameInputHasError && <p className={styles['invalid-text']}>Please enter valid name!</p>}
        </div>
        <div>
            <label htmlFor="instruction">instruction</label>
            <textarea 
                id="instruction" 
                name="instruction" 
                value={enteredInstruction} 
                onChange={instructionChangeHandler} 
                onBlur={instructionBlurHandler}
                required 
            />
            {instructionInputHasError && <p className={styles['invalid-text']}>Please enter valid instruction!</p>}
        </div>
        <div>
            <label htmlFor="image url">image url</label>
            <input 
                id="imageUrl" 
                type="text" 
                name="imageUrl" 
                value={enteredImageUrl} 
                onChange={imageUrlChangeHandler} 
                onBlur={imageUrlBlurHandler}
                required 
            />
            {imageUrlInputHasError && <p className={styles['invalid-text']}>Please enter valid image url!</p>}
        </div>
        <div>
            <label htmlFor="ingredients">ingredient</label>
            <div className={styles.ingredients}>
                <input 
                    id="ingredients" 
                    type="text" 
                    name="ingredients" 
                    value={enteredIngredient} 
                    onChange={ingredientsChangeHandler} 
                    onBlur={ingredientsBlurHandler} 
                />
                <span className={`material-symbols-outlined ${styles['add-icon']} ${styles.icon}`} onClick={() => addIngredient(enteredIngredient)}>add_circle</span>
            </div>
            {ingredients.length < 1 && ingredientsInputHasError && <p className={styles['invalid-text']}>Please enter at least one ingredient!</p>}
        </div>
       {ingredients && <><ul className={styles['ingredients-list']}>
            {ingredients.map((ingredient) => <>
                <li key={ingredient}>{ingredient} 
                <span className={`material-symbols-outlined ${styles['remove-icon']} ${styles.icon}`}>cancel</span>
                </li>
                </>
            )}
        </ul></>}
        <div className="actions">
          <Button type="submit" disabled={!formIsValid}>Save</Button>
        </div>
    </MainForm>
    )
}

export default NewRecipe;