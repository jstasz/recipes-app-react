import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import RecipesPage from './pages/Recipes';
import AuthPage from "./pages/Auth";
import ShoppingListPage from "./pages/ShoppingList";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <HomePage />},
      {path: '/recipes/:mode', element: <RecipesPage />},
      {path: '/recipes/:mode/:recipeId', element: <RecipesPage />},
      {path: '/auth', element: <AuthPage />},
      {path: '/shopping-list', element: <ShoppingListPage />}
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
};

export default App;
