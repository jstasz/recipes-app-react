import ErrorPage from "../components/ErrorPage";
import ShoppingList from "../components/ShoppingList";
import { useSelector } from 'react-redux';

function ShoppingListPage() {
    const loggedUser = useSelector((state: any) => state.auth.loggedUser);

    return (
        <>
        {!loggedUser && <ErrorPage />}
        {loggedUser && <ShoppingList />}
        </> 
    );
};

export default ShoppingListPage;