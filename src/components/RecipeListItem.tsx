import { useNavigate } from 'react-router-dom';
import styles from './RecipeListItem.module.css';

const RecipeListItem: React.FC<{
        id: number, 
        name: string, 
        imageUrl: string}> = (props) => {

    const navigate = useNavigate();
    const navigateToPathHandler = () => {
        navigate(`/recipes/details/${props.id}`);
    };

    return (
        <li className={styles.recipe} onClick={navigateToPathHandler}>
            <div className={styles['recipe-img']} style={{backgroundImage: `url(${props.imageUrl})`}}></div>
            <div className={styles['recipe-name']}>
                <p>{props.name.length > 20 ? `${props.name.slice(0, 20)}...` : props.name}</p>
            </div>
        </li>
    )
}

export default RecipeListItem;