import { useContext } from "react";
import Button from "./UI/Button";
import { AuthContext } from "./store/auth-context";

const MainPage = () => {
    const { loggedUser } = useContext(AuthContext);

    return (
        <>
            <h1>Recipes App</h1>
            <p>get inspired with our</p>
            <Button 
                type="button" 
                navigationPath="recipes/details/0"
                icon='format_list_bulleted'>Recipes List
            </Button>
            <p>or</p>
            {!loggedUser && <>
            <Button 
                type="button" 
                navigationPath="/auth" 
                icon='login'>Login
            </Button>
            <p>to add your own recipes</p>
            <p>and create a shopping list</p>
            </>}
            {loggedUser && <>
            <Button 
                type="button" 
                navigationPath="/recipes/new" 
                icon='add'>Add recipe
            </Button>
            <p>and create your shopping list</p>
            </>}
    
    </>
    )
};

export default MainPage;