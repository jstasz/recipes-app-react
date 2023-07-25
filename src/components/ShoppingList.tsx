import { useContext, useEffect, useState } from 'react';
import { ShoppingListContext } from './store/shopping-list-context';

const ShoppingList: React.FC = (props) => {

    const { shoppingListItems } = useContext(ShoppingListContext);
    const [displayedItems, setDIsplayeditems] = useState<{id: number, name: string}[]>([]);

    useEffect(() => {
        setDIsplayeditems(shoppingListItems)
    }, [shoppingListItems])
 
    return (
       <div>{displayedItems.map(item => <li key={item.id}>{item.name}</li>)}</div>
    )
}

export default ShoppingList;