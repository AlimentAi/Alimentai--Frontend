import { CaretLeft } from "@phosphor-icons/react";
import Logo from "../../assets/logo.png"
import { Link, useNavigate} from "react-router-dom";
import { ChangeEvent, useEffect, useState } from 'react';
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

export function Cadastrar(){
  let navigate = useNavigate()

  const [confirmarSenha, setConfirmarSenha] = useState("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: ''
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      navigate('/login')
    }
  }, [usuarioResposta])

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.senha && usuario.senha.length >- 8) {
      try {
        await cadastrarUsuario(usuario, setUsuarioResposta)
        alert('Usuário cadastrado com sucesso')
      } catch (error) {
        alert('Erro ao cadastrar o Usuário')
        console.log(error)
      }
    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmarSenha("")                 // Reinicia o campo de Confirmar Senha
    }
  }

  return(
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-full">
        <div className="w-[50%] h-full bg-image-cadastrar bg-no-repeat bg-cover bg-center fixed"></div>
      </div>
      <div className="w-[50%] h-full flex flex-col items-start p-4">
        <Link to='/home' className="w-28 z-50">
          <button className="w-full flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
            <CaretLeft size={40} />
            <span className="">Voltar</span>
          </button>
        </Link>

        <form className="w-full flex flex-wrap justify-center items-center gap-4" onSubmit={cadastrarNovoUsuario}>
          <div className="w-[80%] flex flex-col justify-center items-center gap-4">
            <div className="w-[90%] justify-center flex items-center">
              <h1 className="text-3xl font-bold">CADASTRE-SE</h1>
              <img src={Logo} className="w-14" alt="" />
            </div>

            <div className="w-[90%] flex flex-col items-start gap-4">
              <p className="m-4 font-bold">Crie sua vitrine online e ganhe visibilidade de milhares de clientes</p>
              <h2 className="text-2xl font-semibold">Dados de contato</h2>
              <input type="text"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Seu nome / Nome da empresa"
                name="nome"
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
              <input
                type="email"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="E-mail"
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
            </div>

            <div className="w-[90%] flex flex-col items-start gap-4">
              <h2 className="text-2xl font-semibold">Dados de acesso</h2>
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Sua senha"
                name="senha"
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Confirme sua senha"
                name="confirmarSenha"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}/>
              <span className=" text-[#cfcccc]">Sua senha deve ter entre 8 e 48 caracteres e incluir, pelo menos, uma letra minúscula, uma letra maiúscula e um número e não pode conter espaços.</span>
            </div>

            <div className="w-[90%] flex flex-col items-center gap-4">
              <div>
                <input type="checkbox" /> Aceito as <a href="" className="underline">condições de uso</a> e a <a href="" className="underline">política de privacidade</a>
              </div>

              <button className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000">Crie a sua conta</button>
              <p className="w-[90%]">Já possui cadastro? <Link to='/login' className="text-[#d68bac]">Clique aqui!</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}