import Button from "./UI/Button";
import { useSelector } from 'react-redux';

const MainPage = () => {
    const loggedUser = useSelector((state: any) => state.logginUser);

    return (
        <>
            <h1>Recipes App</h1>
            <p>get inspired with our</p>
            <Button 
                type="button" 
                navigationPath="recipes/list"
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