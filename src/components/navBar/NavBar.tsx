import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"
import { useEffect, useState } from "react";
import { Sun, Moon, Desktop } from "@phosphor-icons/react";

export function NavBar() {
  const [theme, setTheme] = useState(getTheme)

  function changeTheme() {
    switch (theme) {
      case 'dark':
        setTheme('light');
        break;
      default:
        setTheme('dark')
    }

    let html = document.querySelector('html')
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

  return(
    <header className="flex justify-center w-full h-20 shadow-lg">
      <nav className="w-full h-full flex items-center justify-between px-8">
        <Link to='/'>
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
          <li><Link to='/home' className='hover:text-[#c42342] duration-500 p-4'>Home</Link></li>
          <li><Link to='/login' className='hover:text-[#c42342] duration-500 p-4'>Login</Link></li>
          <li><Link to='/cadastrar' className='hover:text-[#c42342] duration-500 p-4'>Registre-se</Link></li>
        </ul>
      </nav>
    </header>
  )
}