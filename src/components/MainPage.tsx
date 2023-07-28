import Button from "./UI/Button";
// import HeroImage from "./UI/HeroImage";

const MainPage = () => {

    return (
        <>
        {/* // <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg"> */}
            <h1>Recipes App</h1>
            <p>get inspired with our</p>
            <Button type="button" navigationPath="recipes/details/0">Recipes List</Button>
            <p>or</p>
            <Button type="button" navigationPath="/auth">Login</Button>
            <p>to add your own recipes</p>
            <p>and create a shopping list</p>
        {/* // </HeroImage> */}
    
    </>
    )
};

export default MainPage;