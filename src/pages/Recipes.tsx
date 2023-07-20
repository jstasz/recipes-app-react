import { useParams } from "react-router-dom";
import HeroImage from "../components/HeroImage";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";

function RecipesPage() {
    const params = useParams();

    return (
        <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg">
            <div>
                <div></div>
                {params.mode === 'new' && <NewRecipe />}
                {params.mode === 'details' && <RecipeDetails />}
                <RecipesList />
            </div>
        </HeroImage>
    );
};

export default RecipesPage;