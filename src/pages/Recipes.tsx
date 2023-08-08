import { useParams } from "react-router-dom";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";
import { useSelector } from 'react-redux';
import ErrorPage from "../components/ErrorPage";


function RecipesPage() {
    const params = useParams();
    const loggedUser = useSelector((state: any) => state.auth.loggedUser);

    return (
        <>  {!loggedUser && params.mode === 'new' && <ErrorPage />}
            {loggedUser && params.mode === 'new' && <NewRecipe />}
            {params.mode === 'details' && <RecipeDetails />}
            {params.mode === 'list' && <RecipesList />}
        </>
    );
};

export default RecipesPage;