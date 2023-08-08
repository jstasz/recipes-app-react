import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './ShoppingList.module.css';
import { useSelector, useDispatch } from 'react-redux';

const ShoppingList: React.FC = () => {
    const shoppingListItems = useSelector((state: any) => state.shoppingList.shoppingListItems)
    const loggedUser = useSelector((state: any) => state.auth.loggedUser);
    const [ displayedItems, setDisplayedItems ] = useState<{id: number, name: string}[]>([]);
    const [ shoppingListIsLoading, setShoppingListIsLoading] = useState(true);
    const [ error, setError ] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setDisplayedItems(shoppingListItems);
        setShoppingListIsLoading(false);
    }, [shoppingListItems])

    const fetchShoppingListFromDatabase = useCallback( async (loggedUser: string) => {
        try {
          const response = await fetch(
            `https://react-recipes-e4b3f-default-rtdb.firebaseio.com/${loggedUser.replace('.', ',')}/shopping-list.json`
          );
          const data = await response.json();
          if (data) {
            dispatch({type: 'UPDATE_SHOPPING_LIST', listItems: data })
          }
        } catch (error) {
          setError('Sorry, problem with fetching your shopping list! Try again later!');
        }
    }, [dispatch])
      
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
            setError('Sorry, problem with updating your shopping list! Try again later!');
        }
    };

    const removeShoppingListItem = async (id: number) => {
        const updatedShoppingListItems = shoppingListItems.filter((item: { id: number } )=> item.id !== id);
        dispatch({type: 'UPDATE_SHOPPING_LIST', listItems: updatedShoppingListItems })

        try {
            await updateIngredients(updatedShoppingListItems);
        } catch (error: unknown) {
            setError('Sorry, problem with removing your shopping list item! Try again later!');
        }
    }

    const clearShoppingList = async () => {
        dispatch({type: 'CLEAR_SHOPPING_LIST'})
        try {
            await updateIngredients([]);
        } catch (error: unknown) {
            setError('Sorry, problem with removing your shopping list! Try again later!');
        }
    }

    return (
        <>
        {error && <p>{error}</p>}
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