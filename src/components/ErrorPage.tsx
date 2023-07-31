import Button from "./UI/Button";

const ErrorPage = () => {

    return (
        <div style={{textAlign: 'center'}}>
            <p>The page you are looking for does not exist!</p>
            <Button type="button" navigationPath="/" icon="home">Home Page</Button>
        </div> 
    )
};

export default ErrorPage;


