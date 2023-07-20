import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from './RecipesList.module.css'
import RecipeItem from "./RecipeItem";
import { RecipesContext, RecipesContextType } from "./store/recipes-context";

function RecipesList() {
    const [error, setError] = useState<string | null>(null);

    const { recipes, setRecipes }: RecipesContextType = useContext(RecipesContext);
    const { isLoadingRecipes, setIsLoadingRecipes } = useContext(RecipesContext);


    const GetRecipes = useCallback(async () => {
        setIsLoadingRecipes(true);
        setError(null);

        const url = 'https://tasty.p.rapidapi.com/recipes/list';
        const options = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': '5ca3d2f9bemsh3d42333e3f065bdp1b24a3jsn7de523f07a5a',
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

                const ingredientsList: string[] = [];
                const ingredientsComponent = data.results[key].sections[0].components;
                ingredientsComponent.forEach((el: {raw_text: string}) => {
                    const ingredient = el.raw_text;
                    ingredientsList.push(ingredient)
                })

                const instructionList: string[] = [];
                const instructionsComponent = data.results[key].instructions;
                console.log(instructionsComponent)
                instructionsComponent.forEach((el: {display_text: string}) => {
                    const instruction = el.display_text;
                    instructionList.push(instruction);
                })

                loadedRecipes.push({
                    id: data.results[key].id,
                    name: data.results[key].name,
                    description: data.results[key].description,
                    instruction: instructionList.join(' '),
                    prepTime: data.results[key].cook_time_minutes,
                    imageUrl: data.results[key].thumbnail_url,
                    yields: data.results[key].num_servings,
                    ingredients: ingredientsList
                })
            };

            setRecipes(loadedRecipes);
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Something went wrong!');
            }
        }

        setIsLoadingRecipes(false);
    }, [setIsLoadingRecipes, setRecipes]);

    useEffect(() => {
        GetRecipes();
    }, [GetRecipes])

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
                {!isLoadingRecipes && 
                    <div className={styles.recipes}>
                        <p className={styles.icon} onClick={() => handleScroll('right', 215)}>
                            <span className="material-symbols-outlined">arrow_back_ios</span>
                        </p>
                        <ul className={styles['recipes-list']} ref={scrollContainerRef}>
                        {recipes.map(recipe => {
                            return <RecipeItem 
                                        key={recipe.id} 
                                        id={recipe.id} 
                                        name={recipe.name}  
                                        prepTime={recipe.prepTime}
                                        imageUrl={recipe.imageUrl}
                                        yields={recipe.yields}
                                    />
                                }
                            )}
                        </ul>
                        <p className={styles.icon} onClick={() => handleScroll('left', 215)}>
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </p>
                    </div>
                }
            </div>
        </div>
    );

};

export default RecipesList;