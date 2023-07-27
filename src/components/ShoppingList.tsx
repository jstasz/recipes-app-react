import { useContext, useEffect, useState } from 'react';
import { ShoppingListContext } from './store/shopping-list-context';
import styles from './ShoppingList.module.css'
import { AuthContext } from './store/auth-context';
import React from 'react';

const ShoppingList: React.FC = () => {

    const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);
    const { loggedUser } = useContext(AuthContext);
    const [ displayedItems, setDIsplayeditems ] = useState<{id: number, name: string}[]>([]);

    useEffect(() => {
        setDIsplayeditems(shoppingListItems)
    }, [shoppingListItems])

    const removeShoppingListItem = (id: number) => {
        setShoppingListItems(shoppingListItems.filter(item => item.id !== id));
    }

    async function fetchShoppingListFromDatabase(loggedUser: string) {
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
    }
      
    useEffect(() => {
        fetchShoppingListFromDatabase(loggedUser);
    }, []);

    return (
        <div className={styles['shopping-list-box']}>
            <h1>Shopping list</h1> 
            {displayedItems.length === 0 ? <p>you have no products added to your shopping list</p> :
                <>
                <ul>
                {displayedItems.map(item => 
                    <li key={item.id} className={styles['shopping-list-item']}>{item.name}
                        <span 
                        className={`material-symbols-outlined ${styles.icon}`}
                        onClick={() => removeShoppingListItem(item.id)}
                        >remove_circle</span>
                    </li>)}
                </ul>
                <p className={styles['remove-all']} onClick={() => setShoppingListItems([])}>remove all</p>
                </>
            }
        </div>
    )
}

export default ShoppingList;