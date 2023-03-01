import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Layout = ({ children, title }: any) => {
  const { cart }: any = useSelector((state) => state)

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <div>
        <header className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 mb-6 shadow-md">
          <h1 className="font-semibold text-4xl">{title}</h1>
        </header>
        <main className="flex flex-col md:flex-row gap-7">
          <ul className="flex flex-col font-semibold text-lg">
            <NavLink className={({ isActive }) => (isActive ? 'bg-gradient-to-r from-white to-blue-300 navbar' : 'hover:bg-gradient-to-r from-white to-blue-100  navbar')} to='/'>
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'bg-gradient-to-r from-white to-blue-300 navbar' : 'hover:bg-gradient-to-r from-white to-blue-100  navbar')} to='/cart'>
              <div>Cart</div> {cart?.length ? <div className='rounded-full bg-red-700 text-white w-5 h-5 text-center mb-1 mt-1 text-sm'>{cart?.length}</div> : null}
            </NavLink>
          </ul>
          {children}
        </main>
      </div>
      <footer className='text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-blue-500 py-5'>Simple Shopping Cart Concept by Wigan Wahyu Mandiri</footer>
    </div>
  )
}

export default Layout