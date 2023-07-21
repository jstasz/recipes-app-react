import { useParams } from "react-router-dom";
import HeroImage from "../components/HeroImage";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";
import { RecipesProvider } from "../components/store/recipes-context";

function RecipesPage() {
    const params = useParams();

    return (
        <RecipesProvider>
            <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg">
                <RecipesList />
                {params.mode === 'new' && <NewRecipe />}
                {params.mode === 'details' && <RecipeDetails />}
            </HeroImage>
        </RecipesProvider>
    );
};

export default RecipesPage;