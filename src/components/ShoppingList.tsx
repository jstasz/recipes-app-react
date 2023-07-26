import { useContext, useEffect, useState } from 'react';
import { ShoppingListContext } from './store/shopping-list-context';
import styles from './ShoppingList.module.css'

const ShoppingList: React.FC = (props) => {

    const { shoppingListItems } = useContext(ShoppingListContext);
    const [displayedItems, setDIsplayeditems] = useState<{id: number, name: string}[]>([]);

    useEffect(() => {
        setDIsplayeditems(shoppingListItems)
    }, [shoppingListItems])
 
    return (
        <div className={styles['shopping-list-box']}>
            <h1>Shopping list</h1>
            {displayedItems.length === 0 ? <p>you have no products added to your shopping list</p> :
                <><ul>
                {displayedItems.map(item => 
                <li key={item.id} className={styles['shopping-list-item']}>{item.name}
                <span className={`material-symbols-outlined ${styles.icon}`}>remove_circle</span></li>
                )}
                </ul>
                <p className={styles['remove-all']}>remove all</p>
            </>}
        </div>
    )
}

export default ShoppingList;