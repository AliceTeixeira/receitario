
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Recipe } from '../types/Recipe'

export default function Detail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    setRecipe(null)

    fetch(`https://dummyjson.com/recipes/${id}`)
      .then(response => {
        if (response.status === 404) {
          throw new Error('Receita não encontrada.')
        }

        if (!response.ok) {
          throw new Error('Erro ao carregar receita.')
        }

        return response.json()
      })
      .then((data: Recipe) => {
        setRecipe(data)
      })
      .catch((err: Error) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Carregando receita...</p>
  }

  if (error || !recipe) {
    return (
      <div className="message">
        <h1>{error || 'Receita não encontrada.'}</h1>

        <Link to="/" className="button">
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  const totalTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <div className="detail">
      <Link to="/" className="back">
        ← Voltar ao catálogo
      </Link>

      <h1>{recipe.name}</h1>
      <p>{recipe.cuisine} • {recipe.difficulty}</p>

      <img
        className="detail-image"
        src={recipe.image}
        alt={recipe.name}
      />

      <div className="times">
        <span>
          Preparo: {recipe.prepTimeMinutes} min
        </span>

        <span>
          Cozimento: {recipe.cookTimeMinutes} min
        </span>

        <span>
          Total: {totalTime} min
        </span>
      </div>

      <div className="detail-columns">
        <section>
          <h2>Ingredientes</h2>

          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Modo de preparo</h2>

          <ol>
            {recipe.instructions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
