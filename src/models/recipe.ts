interface Recipe {
    id: number,
    name: string,
    instruction: string,
    imageUrl: string,
    ingredients: {id: number, name: string}[]
};

export default Recipe;