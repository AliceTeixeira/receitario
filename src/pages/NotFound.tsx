
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="message">
      <h1>404</h1>
      <p>Ops! Essa página não existe.</p>

      <Link to="/" className="button">
        Voltar ao catálogo
      </Link>
    </div>
  )
}
