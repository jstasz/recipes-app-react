import { useCallback, useContext, useEffect, useState } from "react";
import styles from './RecipesList.module.css'
import { RecipesContext, RecipesContextType } from "./store/recipes-context";
import { AuthContext } from "./store/auth-context";
import RecipeListItem from "./RecipeListItem";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";

function RecipesList() {
    const [error, setError] = useState<string | null>(null);

    const { 
        loadedRecipes, 
        setLoadedRecipes, 
        isLoadingRecipes, 
        setIsLoadingRecipes, 
        userRecipes, 
        setUserRecipes }: RecipesContextType = useContext(RecipesContext);

    const {loggedUser } = useContext(AuthContext);

    const allRecipes = [...loadedRecipes, ...userRecipes];

    const GetRecipes = useCallback(async () => {
        setIsLoadingRecipes(true);
        setError(null);

        const url = 'https://tasty.p.rapidapi.com/recipes/list';
        const options = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': '41c65bbbfemshce1a1320e84303dp115474jsn487cf7012410',
		        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	        }
        };

        try {
	        const response = await fetch(url, options);

            if(!response.ok) {
                throw new Error(`Sorry, problem with downloading recipes!`)
            };

	        const data = await response.json();
            const loadedRecipes = [];

            for(const key in data.results) {

                const ingredientsList: {id: number, name: string}[] = [];
                const ingredientsComponent = data.results[key].sections[0].components;
                ingredientsComponent.forEach((el: {raw_text: string}) => {
                    const ingredient = {id: Math.floor(Math.random() * 100000), name: el.raw_text};
                    ingredientsList.push(ingredient)
                })

                const instructionList: string[] = [];
                const instructionsComponent = data.results[key].instructions;
                instructionsComponent.forEach((el: {display_text: string}) => {
                    const instruction = el.display_text;
                    instructionList.push(instruction);
                })

                loadedRecipes.push({
                    id: data.results[key].id,
                    name: data.results[key].name,
                    instruction: instructionList.join(' '),
                    imageUrl: data.results[key].thumbnail_url,
                    ingredients: ingredientsList
                })
            };

            setLoadedRecipes(loadedRecipes);
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Something went wrong!');
            }
        }

        setIsLoadingRecipes(false);
    }, [setIsLoadingRecipes, setLoadedRecipes]);

    const getUserRecipes = useCallback(async () => {
        if(loggedUser) {
            try {
                const response = await fetch(
                    `https://react-recipes-e4b3f-default-rtdb.firebaseio.com/${loggedUser.replace('.', ',')}/recipes.json`);
    
                if(!response.ok) {
                    throw new Error(`Sorry, problem with downloading your recipes!`)
                };
    
                const data = await response.json();
                const loadedUserRecipes = [];
    
                for(const key in data) {
                    loadedUserRecipes.push({
                        id: data[key].id,
                        name: data[key].name,
                        instruction: data[key].instruction,
                        imageUrl: data[key].imageUrl,
                        ingredients: data[key].ingredients
                    })
                };
    
                setUserRecipes(loadedUserRecipes);
                
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Something went wrong!');
                }
            }
        }
    }, [setUserRecipes, loggedUser]);

    useEffect(() => {
        GetRecipes();
    }, [GetRecipes]);

    useEffect(() => {
        getUserRecipes();
    }, [getUserRecipes]);

    const navigate = useNavigate();

    const navigateHandler = (path: string) => {
        navigate(path)
    };
    
    return (
        <div>
            {error && <p>{error}</p>}
            <div className={styles.wrapper}>
                <div className={styles['add-action']}>
                    {!loggedUser && 
                        <p className={styles['not-logged-in']}><span onClick={() => navigateHandler('/auth?authMode=login')}>Log in</span> to add new recipe and create yor shopping list.</p>}
                    {loggedUser && 
                        <Button 
                            type='button' 
                            className={styles['add-recipe']} 
                            navigationPath="/recipes/new" 
                            icon="add"> add new recipe
                        </Button>
                    }
            </div>
            {isLoadingRecipes && <p className={styles['recipes-loading']}>loading...</p>}
            {!isLoadingRecipes && <>
                <div className={styles.recipes}>
                    <ul className={styles['recipes-list']}>
                    {allRecipes.map(recipe => {
                        return <RecipeListItem 
                                    key={recipe.id} 
                                    id={recipe.id} 
                                    name={recipe.name}  
                                    imageUrl={recipe.imageUrl}
                                />
                            }
                        )}
                    </ul>
                </div></>
            }
            </div>
        </div>
    );

};

export default RecipesList;