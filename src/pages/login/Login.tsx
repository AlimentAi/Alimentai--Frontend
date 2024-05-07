import { CaretLeft } from "@phosphor-icons/react";
import Logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import UsuarioLogin from "../../models/UsuarioLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Login() {
  let navigate = useNavigate()

  const [caps, setCaps] = useState(false)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  )

  const { usuario, handleLogin } = useContext(AuthContext);

  const {isLoading} = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.getModifierState("CapsLock")) {
        setCaps(true)
      } else {
        setCaps(false)
      }
    })
  }, [caps])

  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full hidden md:block">
        <div className="w-[50%] h-full bg-image-login bg-no-repeat bg-cover bg-center fixed"></div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-start p-4">
        <Link to='/' className="w-28 z-50">
          <button className="w-full flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
            <CaretLeft size={40} />
            <span className="">Voltar</span>
          </button>
        </Link>
        <form className="w-full h-[100%] flex flex-col justify-center items-center md:items-start gap-4" onSubmit={login}>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <img src={Logo} className="w-20" alt="" />
            <h1 className="text-3xl font-semibold">Login</h1>
            <div className="w-[50%] flex flex-col items-end gap-4">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full border-b-2 p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Seu e-mail"
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Sua senha"
                className="w-full border-b-2 p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <p className={`${caps ? "block" : "hidden"} w-full font-bold text-start text-[#f76c6f]`}>Aviso: CapsLock está ativado!</p>
              <a href="" className="font-medium">Esqueceu sua senha?</a>
            </div>
            <button type="submit" className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000">
              {isLoading ? 'Carregando' : 'Entrar'}
            </button>
            <h2>Não dispõe de conta? <Link to='/cadastrar' className="font-bold text-[#f76c6f] hover:text-[#c42342] duration-1000">Registre-se</Link></h2>
          </div>
        </form>
      </div>
    </div>
  )
}