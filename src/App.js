import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import RecipesPage from './pages/Recipes';
import AuthPage from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    children: [
      {path: '/', element: <HomePage />},
      {path: '/recipes', element: <RecipesPage />},
      {path: '/auth', element: <AuthPage />}
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
};

export default App;
