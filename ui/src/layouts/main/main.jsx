import { Outlet, Link, } from 'react-router-dom'

function Layout({ children }) {
  return (
    <>
      <nav className="w-full flex space-x-2 p-4">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
      </nav>
      <main
        className="container w-2/3 mx-auto">
          <Outlet />
        </main>
    </>
  )
}

export default Layout