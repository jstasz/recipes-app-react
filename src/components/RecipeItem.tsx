import styles from './RecipeItem.module.css';

const RecipeItem: React.FC<{
        id: string, 
        name: string, 
        prepTime: number, 
        yields: string, 
        imageUrl: string}> = (props) => {

    return (
        <li key={props.id} className={styles.recipe}>
            <div className={styles['recipe-img']} style={{backgroundImage: `url(${props.imageUrl})`}}></div>
            <div className={styles['recipe-name']}>
                <p>{props.name.length > 20 ? `${props.name.slice(0, 20)}...` : props.name}</p>
            </div>
        </li>
    )
}

export default RecipeItem;