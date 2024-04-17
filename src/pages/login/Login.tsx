import { CaretLeft } from "@phosphor-icons/react";
import Logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-full bg-image-Login bg-no-repeat bg-cover"></div>
      <div className="w-[50%] h-full flex flex-col justify-center items-start p-4">
        <Link to='/home' className="w-28">
          <button className="w-full flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
            <CaretLeft size={40} />
            <span className="">Voltar</span>
          </button>
        </Link>
        <form className="w-full h-[100%] flex flex-col justify-center items-start gap-4" action="">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <img src={Logo} className="w-20" alt="" />
            <h1 className="text-3xl font-semibold">Login</h1>
            <div className="w-[50%] flex flex-col items-end gap-4">
              <input type="email" name="email" id="email" className="w-full border-b-2 p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000" placeholder="Seu e-mail"/>
              <input type="password" name="password" id="password" placeholder="Sua senha" className="w-full border-b-2 p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000" />
              <a href="" className="font-medium">Esqueceu sua senha?</a>
            </div>
            <button className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000">Entrar</button>
            <h2>Não dispõe de conta? <Link to='/cadastro' className="font-bold text-[#f76c6f] hover:text-[#c42342] duration-1000">Registre-se</Link></h2>
          </div>
        </form>
      </div>
    </div>
  )
}