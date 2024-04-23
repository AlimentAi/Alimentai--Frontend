import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png"
import { useContext, useEffect, useState } from "react";
import { Sun, Moon, Desktop } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";

export function NavBar() {
  const [theme, setTheme] = useState(getTheme)

  const {usuario} = useContext(AuthContext)

  const link = useLocation()

  function changeTheme() {
    switch (theme) {
      case 'dark':
        setTheme('light');
        break;
      default:
        setTheme('dark')
    }

    const html = document.querySelector('html')
    if (html) {
      html.classList.remove('dark', 'light')
      html.classList.add(theme)
    }
    console.log({theme})
  }

  function getTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  useEffect(() => {
    changeTheme();
  }, [])

  useEffect(() => {
    const navbar = document.querySelector('#navbar')
    const navbarLogo = document.querySelector('#navbar-logo')
    if (link.pathname.includes('/login') || link.pathname.includes('/cadastrar')) {
      navbar?.classList.add('absolute')
      navbar?.classList.remove('shadow-lg')
      navbarLogo?.classList.add('invisible')
      navbarLogo?.classList.remove('visible')
    } else {
      navbar?.classList.remove('absolute')
      navbar?.classList.add('shadow-lg')
      navbarLogo?.classList.add('visible')
      navbarLogo?.classList.remove('invisible')
    }
  }, [link.pathname])

  return(
    <header id='navbar' className="flex justify-center w-full h-20 shadow-lg">
      <nav className="w-full h-full flex items-center justify-between px-8">
        <Link id="navbar-logo" to='/'>
          <div className="w-auto flex  items-center gap-1">
            <img src={Logo} className="w-16" alt="Logo" />
            <h1 className="text-xl font-semibold">AlimentaA! - Raizes Sustentáveis</h1>
          </div>
        </Link>

        <ul className="flex items-center gap-4">
          <button onClick={changeTheme} className="duration-500 p-4 dark:hover:text-yellow-300 hover:text-cyan-500">
            { theme === 'light' && <Sun size={24}/> }
            { theme === 'dark' && <Moon size={24}/> }
            { (theme !== 'dark' && theme !== 'light') && <Desktop size={24}/> }
          </button>
          { usuario.token !== '' &&
            <li><Link to='/home' className='hover:text-[#c42342] duration-500 p-4'>Home</Link></li> }
          { usuario.token !== '' || !link.pathname.includes('login') &&
            <li><Link to='/login' className='hover:text-[#c42342] duration-500 p-4'>Login</Link></li> }
          { !link.pathname.includes('cadastrar') &&
            <li><Link to='/cadastrar' className='hover:text-[#c42342] duration-500 p-4'>Registre-se</Link></li> }
          { !link.pathname.includes('cadastrar') &&
            <li><Link to='/cadastroCategoria' className='hover:text-[#c42342] duration-500 p-4'>Cadastrar categoria</Link></li> }
        </ul>
      </nav>
    </header>
  )
}