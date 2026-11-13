
export interface Recipe {
  id: number
  name: string
  image: string
  cuisine: string
  difficulty: string
  prepTimeMinutes: number
  cookTimeMinutes: number
  ingredients: string[]
  instructions: string[]
  mealType: string[]
  tags: string[]
}

export interface RecipeResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}
