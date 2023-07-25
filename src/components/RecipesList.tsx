import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from './RecipesList.module.css'
import RecipeItem from "./RecipeItem";
import { RecipesContext, RecipesContextType } from "./store/recipes-context";
import { AuthContext } from "./store/auth-context";

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
		        'X-RapidAPI-Key': '8b7217ce7dmshc2fdcaf5c95ffeep151427jsnc81d0dcf9e5d',
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
                    `https://react-recipes-e4b3f-default-rtdb.firebaseio.com/${loggedUser.replace('.', ',')}.json`);
    
                if(!response.ok) {
                    throw new Error(`Sorry, problem with downloading yourrecipes!`)
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
    }, [GetRecipes])

    useEffect(() => {
        getUserRecipes();
    }, [getUserRecipes])

    const scrollContainerRef = useRef<HTMLUListElement>(null);

    const handleScroll: (direction: 'right' | 'left', distance: number) => void = (direction, distance) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollDistance = `${direction === 'right' ? '' : '-'}${distance}`;
            container.scrollLeft += +scrollDistance;
        }
    };
    
    return (
        <div>
            <div className={styles.wrapper}>
                {error && <p>{error}</p>}
                {isLoadingRecipes && <p>loading...</p>}
                {!isLoadingRecipes && <>
                    <div className={styles.recipes}>
                        <p className={styles.icon} onClick={() => handleScroll('left', 215)}>
                            <span className="material-symbols-outlined">arrow_back_ios</span>
                        </p>
                        <ul className={styles['recipes-list']} ref={scrollContainerRef}>
                        {allRecipes.map(recipe => {
                            return <RecipeItem 
                                        key={recipe.id} 
                                        id={recipe.id} 
                                        name={recipe.name}  
                                        imageUrl={recipe.imageUrl}
                                    />
                                }
                            )}
                        </ul>
                        <p className={styles.icon} onClick={() => handleScroll('right', 215)}>
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </p>
                    </div>
                    </>
                }
            </div>
        </div>
    );

};

export default RecipesList;