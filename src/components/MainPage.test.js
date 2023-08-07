import { render, screen} from "@testing-library/react";
import MainPage from "./MainPage";
import { AuthContext } from "./store/auth-context";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => () => {}
  }));

test("renders Recipes App as a title", () => {
    render( <MainPage />);
    const titleElement = screen.getByText("Recipes App");
    expect(titleElement).toBeInTheDocument();
});

test("renders get inspired text", () => {
    render( <MainPage />);
    const textElement = screen.getByText("get inspired with our");
    expect(textElement).toBeInTheDocument();
});

test("renders Recipes List Button", () => {
    render(<MainPage />);
    const recipesListButton = screen.getByText("Recipes List");
    expect(recipesListButton).toBeInTheDocument();
});

test("renders Login Button when not logged in", () => {
    render(  
        <AuthContext.Provider value={{ loggedUser: null}}>
            <MainPage />
        </AuthContext.Provider>);
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
});

test("not renders Login Button when logged in", () => {
    render(  
        <AuthContext.Provider value={{ loggedUser: {username : "testuser"}}}>
            <MainPage />
        </AuthContext.Provider>);
    const loginButton = screen.queryByText("Login");
    expect(loginButton).not.toBeInTheDocument();
});


test("renders Add Recipe Button when logged in", () => {
    render(  
        <AuthContext.Provider value={{ loggedUser: {username : "testuser"} }}>
            <MainPage />
        </AuthContext.Provider>);
    const addRecipeButton = screen.getByText("Add recipe");
    expect(addRecipeButton).toBeInTheDocument();
});

test("not renders Add Recipe Button when not logged in", () => {
    render(  
        <AuthContext.Provider value={{ loggedUser: null }}>
            <MainPage />
        </AuthContext.Provider>);
    const addRecipeButton = screen.queryByText("Add recipe");
    expect(addRecipeButton).not.toBeInTheDocument();
});

test("additional text when logged in", () => {
    render(  
        <AuthContext.Provider value={{ loggedUser: {username : "testuser"} }}>
            <MainPage />
        </AuthContext.Provider>);
    const additionalText = screen.getByText("and create your shopping list");
    const notAdditionalText1 = screen.queryByText("to add your own recipes");
    const notAdditionalText2 = screen.queryByText("and create a shopping list");
    expect(additionalText).toBeInTheDocument();
    expect(notAdditionalText1).not.toBeInTheDocument();
    expect(notAdditionalText2).not.toBeInTheDocument();
});

test("additional text when not logged in", () => {
    render(  
        <AuthContext.Provider value={{ loggedUser: null }}>
            <MainPage />
        </AuthContext.Provider>);
    const additionalText1 = screen.getByText("to add your own recipes");
    const additionalText2 = screen.getByText("and create a shopping list");
    const notAdditionalText = screen.queryByText("and create your shopping list");
    expect(additionalText1).toBeInTheDocument();
    expect(additionalText2).toBeInTheDocument();
    expect(notAdditionalText).not.toBeInTheDocument();
});

