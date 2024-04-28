import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toastAlerta } from '../../utils/toastAlerta'
import { atualizar } from '../../services/Service'
import Usuario from '../../models/Usuario'
import { Basket, CaretLeft, Carrot } from '@phosphor-icons/react'
import Logo from "../../assets/logo.png"

function EditarUsuario() {
  const { usuario, handleLogout } = useContext(AuthContext)
  let navigate = useNavigate()

  const [novoUsuario, setNovoUsuario] = useState({} as Usuario)

  async function atualizarUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await atualizar('/usuarios', novoUsuario, setNovoUsuario, {
        headers: {
          Authorization: usuario.token
        }
      })
    } catch (error) {
      toastAlerta('Falha ao atualizar usuário', 'error')
      console.log(error)
    }
  }

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setNovoUsuario({
      ...novoUsuario,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (usuario.token === '') {
      toastAlerta('Sessão expirada ou inválida. Faça o login novamente ou registre uma conta', 'error')
      handleLogout
      navigate("/")
    }
  }, [usuario])

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

  function atualizarRequisitos(e: React.ChangeEvent<HTMLInputElement>): void {
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

  function handleConfirmarSenha(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="w-full flex flex-col pt-8 pb-16">
      <div className="justify-center flex items-center">
        <h1 className="text-3xl font-bold">ATUALIZAR DADOS</h1>
        <img src={Logo} className="w-14" alt="" />
      </div>
      <p className="m-4 font-bold">Crie sua vitrine online e ganhe visibilidade de milhares de clientes</p>
      <div className="h-full flex flex-col items-start p-4">
        <form className="w-full flex flex-wrap justify-center items-center gap-4" onSubmit={atualizarUsuario}>
          <div className="w-[80%] flex flex-col justify-center items-center gap-4">
            <div className="w-[90%] flex flex-col items-start gap-4">
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
              <div className="flex w-full justify-around flex-wrap my-4">
                <div className={`${novoUsuario.tipo === 'consumidor' ? 'text-green-600 dark:text-green-400' : ''} duration-300`}>
                  <input
                    id="consumidor"
                    type="radio"
                    name="tipo"
                    className="invisible"
                    value="consumidor"
                    onChange={
                      (e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) atualizarEstado(e);
                      }
                    } />
                  <label htmlFor="consumidor" className="flex flex-col items-center">
                    <Basket size={42} />
                    Sou consumidor
                  </label>
                </div>
                <div className={`${novoUsuario.tipo === 'produtor' ? 'text-orange-600 dark:text-orange-400' : ''} duration-300`}>
                  <input
                    id="produtor"
                    type="radio"
                    name="tipo"
                    className="invisible"
                    value="produtor"
                    onChange={
                      (e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) atualizarEstado(e)
                      }
                    } />
                  <label htmlFor="produtor" className="flex flex-col items-center">
                    <Carrot size={42} />
                    Sou produtor
                  </label>
                </div>
              </div>
            </div>

            <div className="w-[90%] mt-4 flex items-center justify-center gap-4">
              <Link to='/'>
                <button className="w-full pr-4 h-14 flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
                  <CaretLeft size={40} />
                  <span className="">Cancelar</span>
                </button>
              </Link>
              <button type='submit' className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000">Atualizar dados</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarUsuario