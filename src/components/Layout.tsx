
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            🍳 Receitário
          </Link>

          <nav>
            <Link to="/">Início</Link>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Outlet />
      </main>

      <footer className="footer">
        Receitário - Projeto de Frontend
      </footer>
    </div>
  )
}
