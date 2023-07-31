import { useCallback, useContext, useEffect, useState } from 'react';
import { ShoppingListContext } from './store/shopping-list-context';
import styles from './ShoppingList.module.css'
import { AuthContext } from './store/auth-context';
import React from 'react';

const ShoppingList: React.FC = () => {

    const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);
    const { loggedUser } = useContext(AuthContext);
    const [ displayedItems, setDIsplayeditems ] = useState<{id: number, name: string}[]>([]);
    const [ shoppingListIsLoading, setShoppingListIsLoading] = useState(false);

    useEffect(() => {
        setShoppingListIsLoading(true);
        setDIsplayeditems(shoppingListItems);
        setShoppingListIsLoading(false);
    }, [shoppingListItems])

    const fetchShoppingListFromDatabase = useCallback( async (loggedUser: string) => {
        try {
          const response = await fetch(
            `https://react-recipes-e4b3f-default-rtdb.firebaseio.com/${loggedUser.replace('.', ',')}/shopping-list.json`
          );
          const data = await response.json();
          if (data) {
            setShoppingListItems(data);
          }
        } catch (error) {
          console.error('Błąd podczas pobierania listy zakupów:', error);
        }
    }, [setShoppingListItems])
      
    useEffect(() => {
        fetchShoppingListFromDatabase(loggedUser);
    }, [fetchShoppingListFromDatabase, loggedUser]);

    async function updateIngredients(shoppingListItems: {id: number, name: string}[]) {
        try {
            await fetch(`https://react-recipes-e4b3f-default-rtdb.firebaseio.com/${loggedUser.replace('.', ',')}/shopping-list.json`, {
                method: 'PUT',
                body: JSON.stringify(shoppingListItems),
                headers: {
                  'Content-Type' : 'aplication/json'
                }
            })
        } catch (error: unknown) {
            console.log(error)
        }
    };

    const removeShoppingListItem = async (id: number) => {
        const updatedShoppingListItems = shoppingListItems.filter(item => item.id !== id);
        setShoppingListItems(updatedShoppingListItems);

        try {
            await updateIngredients(updatedShoppingListItems);
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const clearShoppingList = async () => {
        setShoppingListItems([]);

        try {
            await updateIngredients([]);
        } catch (error: unknown) {
            console.log(error)
        }
    }

    return (
        <>
        {shoppingListIsLoading && <p>Loading Shopping List</p>}
        {!shoppingListIsLoading && <div className={styles['shopping-list']}>
            <p className={styles['page-title']}>Shopping list</p> 
            {displayedItems.length === 0 ? <p>you have no products added to your shopping list</p> :
                <>
                <ul className={styles['shopping-list-box']}>
                {displayedItems.map(item => 
                    <li key={item.id} className={styles['shopping-list-item']}>{item.name}
                        <span 
                        className={`material-symbols-outlined ${styles.icon}`}
                        onClick={() => removeShoppingListItem(item.id)}
                        >remove_circle</span>
                    </li>)}
                </ul>
                <p className={styles['remove-all']} onClick={() => clearShoppingList()}>remove all</p>
                </>
            }
        </div>}
        </>
    )
}

export default ShoppingList;