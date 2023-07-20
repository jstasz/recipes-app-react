import HeroImage from "../components/HeroImage";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";

function RecipesPage() {
    return (
        <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg">
            <div>
                <RecipeDetails />
                <RecipesList />
            </div>
        </HeroImage>
    );
};

export default RecipesPage;