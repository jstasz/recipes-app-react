const RecipeItem: React.FC<{id: string, name: string, description: string, instruction: [], prepTime: number, yields: string, imageUrl: string}> = (props) => {
    return (
        <li key={props.id}>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>{props.instruction}</p>
            <p>{props.prepTime}</p>
            <p>{props.yields}</p>
            <img src={props.imageUrl} alt={`${props.name}`}></img>
        </li>
    )
};

export default RecipeItem;