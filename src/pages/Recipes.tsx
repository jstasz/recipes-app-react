import { useParams } from "react-router-dom";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";
import { RecipesProvider } from "../components/store/recipes-context";

function RecipesPage() {
    const params = useParams();

    return (
        <RecipesProvider>
                {params.mode === 'new' && <NewRecipe />}
                {params.mode === 'details' && <>
                    <RecipesList />
                    <RecipeDetails />
                </>}
        </RecipesProvider>
    );
};

export default RecipesPage;