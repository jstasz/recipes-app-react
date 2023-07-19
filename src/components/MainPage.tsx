import Button from "./Button";
import HeroImage from "./HeroImage";

function MainPage() {
    return (
        <HeroImage>
            <h1>Recipes App</h1>
            <p>get inspired with our</p>
            <Button>Recipes List</Button>
            <p>or</p>
            <Button>Login</Button>
            <p>to add your own recipes</p>
            <p>and create a shopping list</p>
        </HeroImage>
    )
};

export default MainPage;