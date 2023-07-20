interface Recipe {
    id: number,
    name: string,
    description: string,
    instruction: string,
    prepTime: number,
    imageUrl: string,
    yields: string,
    ingredients: string[]
};

export default Recipe;