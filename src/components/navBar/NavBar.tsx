import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"

export function NavBar() {
  return(
    <header className="flex justify-center w-full h-24 shadow-lg">
      <nav className="w-full h-full flex items-center justify-between px-8">
        <Link to='/'>
          <div className="w-auto flex  items-center gap-1">
            <img src={Logo} className="w-16" alt="Logo" />
            <h1 className="text-xl font-semibold">AlimentaA! - Raizes Sustentáveis</h1>
          </div>
        </Link>

        <ul className="h-full flex items-center gap-4">
          <li><Link to='/home' className='hover:text-[#c42342] duration-500 p-4'>Home</Link></li>
          <li><Link to='/login' className='hover:text-[#c42342] duration-500 p-4'>Login</Link></li>
          <li><Link to='/cadastrar' className='hover:text-[#c42342] duration-500 p-4'>Registre-se</Link></li>
        </ul>
      </nav>
    </header>
  )
}