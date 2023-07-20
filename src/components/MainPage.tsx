import { useNavigate } from "react-router-dom";
import Button from "./Button";
import HeroImage from "./HeroImage";

const MainPage = () => {

    const navigate = useNavigate();
    const navigateToPathHandler = (path: string) => {
        navigate(path);
    };

    return (
        <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg">
            <h1>Recipes App</h1>
            <p>get inspired with our</p>
            <Button onNavigate={() => navigateToPathHandler('/recipes')}>Recipes List</Button>
            <p>or</p>
            <Button onNavigate={() => navigateToPathHandler('/auth')}>Login</Button>
            <p>to add your own recipes</p>
            <p>and create a shopping list</p>
        </HeroImage>
    )
};

export default MainPage;