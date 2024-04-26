import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png"
import { useContext, useEffect, useState } from "react";
import { Sun, Moon, Desktop, User } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Storefront } from "@phosphor-icons/react";

export function NavBar() {
  const [theme, setTheme] = useState(getTheme)

  const { usuario, handleLogout } = useContext(AuthContext)

  const [showMenu, setShowMenu] = useState(false)

  const endpoint = useLocation().pathname

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
    console.log({ theme })
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
    const home = document.querySelector('#home')
    const produtos = document.querySelector('#produtos')
    const categorias = document.querySelector('#categorias')
    const sobre = document.querySelector('#sobre')
    const logar = document.querySelector('#logar')
    const cadastrar = document.querySelector('#registrar')

    const buttonColor = 'text-[#c44382]'

    if (endpoint.includes('/login') || endpoint.includes('/cadastrar') || (usuario.token === '' && endpoint === '/')) {
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

    home?.classList.remove(buttonColor)
    produtos?.classList.remove(buttonColor)
    categorias?.classList.remove(buttonColor)
    sobre?.classList.remove(buttonColor)
    logar?.classList.remove(buttonColor)
    cadastrar?.classList.remove(buttonColor)

    if (usuario.token === '' && endpoint === '/')
      logar?.classList.add(buttonColor)
    if (usuario.token !== '' && endpoint === '/')
      home?.classList.add(buttonColor)

    switch (true) {
      case endpoint.includes('home'):
        home?.classList.add(buttonColor)
        break
      case endpoint.includes('Produto'):
        produtos?.classList.add(buttonColor)
        break
      case endpoint.includes('Categoria'):
        categorias?.classList.add(buttonColor)
        break
      case endpoint.includes('sobre'):
        sobre?.classList.add(buttonColor)
        break
      case endpoint.includes('login'):
        logar?.classList.add(buttonColor)
        break
      case endpoint.includes('cadastrar'):
        cadastrar?.classList.add(buttonColor)
        break
    }
  }, [endpoint, usuario.token])

  function toggleMenu() {
    const userMenu = document.querySelector("#user-menu")
    setShowMenu(!showMenu)

    if (showMenu) {
      userMenu?.classList.remove("invisible")
      userMenu?.classList.add("visible")
    } else {
      userMenu?.classList.remove("visible")
      userMenu?.classList.add("invisible")
    }
  }

  return (
    <>
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
              {theme === 'light' && <Sun size={24} />}
              {theme === 'dark' && <Moon size={24} />}
              {(theme !== 'dark' && theme !== 'light') && <Desktop size={24} />}
            </button>

            {usuario.token !== '' && (usuario.type === 'produtor' || usuario.type === 'administrador') &&
              <li><Link id='areaVendedor' to='/areaVendedor' className='hover:text-[#c42342] duration-500 p-4 flex gap-1'> <Storefront size={24} /> Área do Vendedor</Link></li>}
            {usuario.token !== '' &&
              <li><Link id='home' to='/home' className='hover:text-[#c42342] duration-500 p-4'>Home</Link></li>}
            {usuario.token !== '' &&
              <li><Link id='produtos' to='/listaProdutos' className='hover:text-[#c42342] duration-500 p-4'>Produtos</Link></li>}
            {usuario.token !== '' && (usuario.type === 'consumidor' || usuario.type === undefined) &&
              <li><Link id='carrinho' to='/carrinho' className="hover:text-[#c42342] duration-500 p-4">Carrinho</Link></li>}
            {usuario.token !== '' && (usuario.type === 'produtor' || usuario.type === 'administrador') &&
              <li><Link id='categorias' to='/listaCategorias' className='hover:text-[#c42342] duration-500 p-4'>Categorias</Link></li>}
            {usuario.token !== '' &&
              <li><Link id='sobre' to='/sobre' className='hover:text-[#c42342] duration-500 p-4'>Sobre</Link></li>}
            {usuario.token !== '' &&
              <li onClick={toggleMenu} className="max-h-10 max-w-10 overflow-hidden rounded-full border border-black hover:text-[#c42342] dark:border-white hover:border-[#c42342] dark:hover:border-[#c42342] duration-300">
                {usuario.foto === ' ' || usuario.foto === '' ?
                  <User size={32} className="h-full w-auto" /> :
                  <img src={usuario.foto} alt="Menu do usuário" className="w-auto max-h-full" />
                }
                <ul id="user-menu" className="z-50 invisible absolute right-0 mt-4 mr-4 flex-col items-center rounded-2xl border bg-white dark:bg-neutral-900 overflow-hidden duration-300">
                  <li><Link to='/editarUsuario' className='hover:text-[#c42342] duration-500 my-4 p-4'>Configurações</Link></li>
                  <li><Link to='/' className='hover:text-[#c42342] duration-500 m-4 py-4' onClick={handleLogout} >Sair</Link></li>
                </ul>
              </li>}
            {usuario.token === '' &&
              <li><Link id='logar' to='/login' className='hover:text-[#c42342] duration-500 p-4'>Login</Link></li>}
            {usuario.token === '' &&
              <li><Link id='registrar' to='/cadastrar' className='hover:text-[#c42342] duration-500 p-4'>Registre-se</Link></li>}
          </ul>
        </nav>
      </header>
    </>
  )
}