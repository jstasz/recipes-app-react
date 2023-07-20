import { useCallback, useEffect, useState } from "react";
import styles from './RecipesList.module.css'
import Recipe from "../models/recipe";

function RecipesList() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const GetRecipes = useCallback(async () => {
        setIsLoadingData(true);
        setError(null);

        const url = 'https://tasty.p.rapidapi.com/recipes/list';
        const options = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': '0d38b74069msh88c8f23c7cd77a9p1889dajsn86fa0d0182d4',
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
            console.log(data.results)

            for(const key in data.results) {
                loadedRecipes.push({
                    id: data.results[key].id,
                    name: data.results[key].name,
                    description: data.results[key].description,
                    instruction: data.results[key].instruction,
                    prepTime: data.results[key].prep_time_minutes,
                    image: data.results[key].thumbnail_url,
                    yields: data.results[key].yields,
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

        setIsLoadingData(false);
    }, []);
    

    useEffect(() => {
        GetRecipes();
    }, [GetRecipes])
    
    return (
        <div>
            {error && <p>{error}</p>}
            {isLoadingData && <p>loading...</p>}
            {!isLoadingData && <ul className={styles.list}>
            {recipes.map(recipe => {
                return (
                    <li key={recipe.id}>
                        <p>{recipe.id}</p>
                        <p>{recipe.name}</p>
                        <p>{recipe.description}</p>
                        <p>{recipe.instruction}</p>
                        <p>{recipe.prepTime}</p>
                        <p>{recipe.yields}</p>
                        <img src={recipe.image} alt={`${recipe.name}`}></img>
                    </li>
                )
            })}
            </ul>}
        </div>
    );

};

export default RecipesList;