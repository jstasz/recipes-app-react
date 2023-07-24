import styles from './NewRecipe.module.css'
import useInput from '../hooks/use-input';
import Button from './Button';
import { useEffect, useState } from 'react';
import MainForm from './Form';

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
      value: enteredIngredients, 
      isValid: enteredIngredientsIsValid,
      hasError: ingredientsInputHasError, 
      valueBlurHandler: ingredientsBlurHandler, 
      valueChangeHandler: ingredientsChangeHandler,
      resetValue: resetEnteredIngredients
    } = useInput(value => value.trim() !== '');

    const addRecipeHandler = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!formIsValid) {
            return
        }

        resetEnteredName();
        resetEnteredInstruction();
        resetEnteredImageUrl();
        resetEnteredIngredients()

        console.log('recipe added')
    }

    useEffect(() => {
        if(enteredNameIsValid && enteredInstructionIsValid && enteredImageUrlIsValid && enteredIngredientsIsValid) {
          setFormIsValid(true)
        } else {
          setFormIsValid(false)
        }
      }, [enteredNameIsValid, enteredInstructionIsValid, enteredImageUrlIsValid, enteredIngredientsIsValid])

    return (
        <MainForm onSubmit={addRecipeHandler} >
        <h1>Add new recipe</h1>
        <p>
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
        </p>
        <p>
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
        </p>
        <p>
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
        </p>
        <p>
            <label htmlFor="ingredients">ingredients</label>
            <input 
                id="ingredients" 
                type="text" 
                name="ingredients" 
                value={enteredIngredients} 
                onChange={ingredientsChangeHandler} 
                onBlur={ingredientsBlurHandler}
                required 
            />
            {ingredientsInputHasError && <p className={styles['invalid-text']}>Please enter valid ingerdient!</p>}
        </p>
        <div className="actions">
          <Button type="submit" disabled={!formIsValid}>Save</Button>
        </div>
    </MainForm>
    )
}

export default NewRecipe;