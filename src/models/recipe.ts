interface Recipe {
    id: string,
    name: string,
    description: string,
    instruction: [],
    prepTime: number,
    imageUrl: string,
    yields: string,
};

export default Recipe;