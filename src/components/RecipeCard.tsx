
import { Link } from 'react-router-dom'
import type { Recipe } from '../types/Recipe'

interface Props {
  recipe: Recipe
  favorite: boolean
  onFavorite: (id: number) => void
}

export default function RecipeCard({
  recipe,
  favorite,
  onFavorite
}: Props) {
  const totalTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <article className="card">
      <Link to={`/receitas/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
        />
      </Link>

      <div className="card-body">
        <span className="category">
          {recipe.cuisine}
        </span>

        <Link
          to={`/receitas/${recipe.id}`}
          className="card-title"
        >
          {recipe.name}
        </Link>

        <div className="card-bottom">
          <span>⏱ {totalTime} min</span>

          <button
            type="button"
            className={favorite ? 'heart active' : 'heart'}
            onClick={() => onFavorite(recipe.id)}
            aria-label={
              favorite
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'
            }
          >
            {favorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  )
}
