import { Basket, CaretLeft, Carrot } from "@phosphor-icons/react";
import Logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from 'react';
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

export function Cadastrar() {
  let navigate = useNavigate()

  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [senhaValida, setSenhaValida] = useState(false)
  const [checkTermos, setCheckTermos] = useState(false)

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: '',
    type: ''
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: '',
    type: ''
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

  function atualizarRequisitos(e: ChangeEvent<HTMLInputElement>) {
    atualizarEstado(e)
    const value = e.target.value

    const requisitoMaiusculo = document.querySelector("#tem-letra-maiuscula")
    const upperCase = value.match(/[A-Z]/g)?.length !== undefined || 0

    const requisitoMinusculo = document.querySelector("#tem-letra-minuscula")
    const lowerCase = value.match(/[a-z]/g)?.length !== undefined || 0

    const requisitoNumero = document.querySelector("#tem-numero")
    const hasNumber = value.match(/[1-9]/g)?.length !== undefined || 0

    const requisitoSemEspaco = document.querySelector("#sem-espaco")
    const hasNoSpace = value.match(/[ ]/g)?.length === undefined || 0

    const requisitoTamanho = document.querySelector("#tem-tamanho")
    const validSize = value.length >= 8 && value.length <= 48

    const colorOk = "text-green-600"
    const darkColorOk = "dark:text-green-400"
    const colorError = "text-red-600"
    const darkColorError = "dark:text-red-400"

    if (upperCase && lowerCase && hasNumber && hasNoSpace && validSize) {
      setSenhaValida(true)
    } else {
      setSenhaValida(false)
    }

    if (value.length > 0) {
      if (validSize) {
        requisitoTamanho?.classList.remove(colorError, darkColorError)
        requisitoTamanho?.classList.add(colorOk, darkColorOk)
      } else {
        requisitoTamanho?.classList.remove(colorOk, darkColorOk)
        requisitoTamanho?.classList.add(colorError, darkColorError)
      }

      if (upperCase) {
        requisitoMaiusculo?.classList.remove(colorError, darkColorError)
        requisitoMaiusculo?.classList.add(colorOk, darkColorOk)
      } else {
        requisitoMaiusculo?.classList.remove(colorOk, darkColorOk)
        requisitoMaiusculo?.classList.add(colorError, darkColorError)
      }

      if (lowerCase) {
        requisitoMinusculo?.classList.remove(colorError, darkColorError)
        requisitoMinusculo?.classList.add(colorOk, darkColorOk)
      } else {
        requisitoMinusculo?.classList.remove(colorOk, darkColorOk)
        requisitoMinusculo?.classList.add(colorError, darkColorError)
      }

      if (hasNumber) {
        requisitoNumero?.classList.remove(colorError, darkColorError)
        requisitoNumero?.classList.add(colorOk, darkColorOk)
      } else {
        requisitoNumero?.classList.remove(colorOk, darkColorOk)
        requisitoNumero?.classList.add(colorError, darkColorError)
      }

      if (hasNoSpace) {
        requisitoSemEspaco?.classList.remove(colorError, darkColorError)
        requisitoSemEspaco?.classList.add(colorOk, darkColorOk)
      } else {
        requisitoSemEspaco?.classList.remove(colorOk, darkColorOk)
        requisitoSemEspaco?.classList.add(colorError, darkColorError)
      }
    } else {
      requisitoTamanho?.classList.remove(...requisitoTamanho.classList)
      requisitoMaiusculo?.classList.remove(...requisitoMaiusculo.classList)
      requisitoMinusculo?.classList.remove(...requisitoMinusculo.classList)
      requisitoNumero?.classList.remove(...requisitoNumero.classList)
      requisitoSemEspaco?.classList.remove(...requisitoSemEspaco.classList)
    }
  }

  function mostrarRequisitos() {
    const lista = document.querySelector("#requisitos-lista")

    lista?.classList.remove("hidden")
    lista?.classList.add("block")
  }

  function ocultarRequisitos() {
    const lista = document.querySelector("#requisitos-lista")
    
    if (usuario.senha.length === 0) {
      lista?.classList.remove("block")
      lista?.classList.add("hidden")
    }
  }

  function toggleTermos() {
    const aceitarTermos = document.getElementById("aceitar-termos")

    setCheckTermos(!checkTermos)
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.senha && senhaValida && checkTermos && usuario.type !== '') {
      try {
        await cadastrarUsuario(usuario, setUsuarioResposta)
        alert('Usuário cadastrado com sucesso')
      } catch (error) {
        alert('Erro ao cadastrar o Usuário')
        console.log(error)
      }
    }
    
    switch (false) {
      case confirmarSenha === usuario.senha:
        alert('Dados inconsistentes. Verifique as informações de cadastro.')
        setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
        setConfirmarSenha("")                 // Reinicia o campo de Confirmar Senha
        break
      case senhaValida:
        alert('A senha não atende aos requisitos mínimos.')
        break
      case checkTermos:
        alert('Você precisa aceitar os temos de uso.')
        break
      case usuario.type !== 'consumidor' && usuario.type !== 'vendedor':
        alert('Informe se você é um consumidor ou produtor')
        break
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-full">
        <div className="w-[50%] h-full bg-image-cadastrar bg-no-repeat bg-cover bg-center fixed"></div>
      </div>
      <div className="w-[50%] h-full flex flex-col items-start p-4">
        <Link to='/' className="w-28 z-50">
          <button className="w-full flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
            <CaretLeft size={40} />
            <span className="">Voltar</span>
          </button>
        </Link>

        <form className="w-full flex flex-wrap justify-center items-center gap-4 pb-16 pt-8" onSubmit={cadastrarNovoUsuario}>
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
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <input
                type="email"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="E-mail"
                name="email"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
            </div>

            <div className="w-[90%] flex flex-col items-start gap-4">
              <h2 className="text-2xl font-semibold">Dados de acesso</h2>
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Sua senha"
                name="senha"
                onFocus={mostrarRequisitos}
                onBlur={ocultarRequisitos}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarRequisitos(e)} />
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Confirme sua senha"
                name="confirmarSenha"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)} />
              <ul id="requisitos-lista" className="text-[#cfcccc] text-start list-disc list-inside hidden">
                <p>Sua senha deve incluir:</p>
                <li id="tem-tamanho">Entre 8 e 48 caracteres</li>
                <li id="tem-letra-maiuscula">Uma letra minúscula</li>
                <li id="tem-letra-minuscula">uma letra maiúscula</li>
                <li id="tem-numero">Um número</li>
                <li id="sem-espaco">Não pode conter espaços.</li>
              </ul>
              <div className="flex w-full justify-around flex-wrap">
                <div className={`${usuario.type === 'consumidor' ? 'text-green-600 dark:text-green-400' : ''} duration-300`}>
                  <input
                    id="consumidor"
                    type="radio"
                    name="type"
                    className="invisible"
                    value="consumidor"
                    defaultChecked
                    onClick={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                  <label htmlFor="consumidor" className="flex flex-col items-center">
                    <Basket size={42} />
                    Sou consumidor
                  </label>
                </div>
                <div className={`${usuario.type === 'produtor' ? 'text-orange-600 dark:text-orange-400' : ''} duration-300`}>
                  <input
                    id="produtor"
                    type="radio"
                    name="type"
                    className="invisible"
                    value="produtor"
                    onClick={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                  <label htmlFor="produtor" className="flex flex-col items-center">
                    <Carrot size={42} />
                    Sou produtor
                  </label>
                </div>
              </div>
            </div>

            <div className="w-[90%] flex flex-col items-center gap-4">
              <div>
                <input id="aceitar-termos" type="checkbox" checked={checkTermos} onClick={toggleTermos}/> Aceito as <a href="" target="_blank" className="underline">condições de uso</a> e a <a href="" target="_blank" className="underline">política de privacidade</a>
              </div>

              <button type='submit' className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000">Crie a sua conta</button>
              <p className="w-[90%]">Já possui cadastro? <Link to='/login' className="text-[#d68bac]">Clique aqui!</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}