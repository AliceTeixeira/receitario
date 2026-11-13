
import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import type { Recipe, RecipeResponse } from '../types/Recipe'

export default function Catalog() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://dummyjson.com/recipes?limit=0')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar receitas')
        }

        return response.json()
      })
      .then((data: RecipeResponse) => {
        setRecipes(data.recipes)
      })
      .catch(() => {
        setError('Não foi possível carregar as receitas.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const cuisines = [
    ...new Set(recipes.map(recipe => recipe.cuisine))
  ].sort()

  const filteredRecipes = recipes.filter(recipe => {
    const matchName = recipe.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    const matchCuisine =
      cuisine === '' || recipe.cuisine === cuisine

    return matchName && matchCuisine
  })

  function toggleFavorite(id: number) {
    setFavorites(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }

  return (
    <>
      <section className="intro">
        <div>
          <h1>Encontre sua próxima receita 🍽️</h1>
          <p>Receitas para todos os gostos.</p>
        </div>

        <div className="favorites-count">
          ♥ {favorites.length} favoritas
        </div>
      </section>

      <section className="filters">
        <input
          type="text"
         placeholder="Digite o nome de uma receita..."
          aria-label="Buscar receita pelo nome"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />

        <select
          aria-label="Filtrar por culinária"
          value={cuisine}
          onChange={event => setCuisine(event.target.value)}
        >
          <option value="">Todas as culinárias</option>

          {cuisines.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      {loading && <p>Carregando receitas...</p>}

      {error && (
        <p className="message">{error}</p>
      )}

      {!loading && !error && (
        <>
          <p className="results">
            {filteredRecipes.length} receitas encontradas
          </p>

          <div className="grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                favorite={favorites.includes(recipe.id)}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <p className="message">
              Nenhuma receita encontrada.
            </p>
          )}
        </>
      )}
    </>
  )
}
