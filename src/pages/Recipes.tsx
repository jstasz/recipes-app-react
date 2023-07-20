import HeroImage from "../components/HeroImage";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";

function RecipesPage() {
    return (
        <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg">
            <div>
                <NewRecipe />
                <RecipeDetails />
                <RecipesList />
            </div>
        </HeroImage>
    );
};

export default RecipesPage;