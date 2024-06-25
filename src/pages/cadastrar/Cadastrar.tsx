/* eslint-disable no-case-declarations */
import { Basket, CaretLeft, Carrot } from "@phosphor-icons/react";
import Logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from 'react';
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { toast } from "react-toastify";

export function Cadastrar() {
  const navigate = useNavigate()

  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [senhaValida, setSenhaValida] = useState(false)
  const [checkTermos, setCheckTermos] = useState(false)

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: '',
    tipo: undefined,
    produto: null
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    foto: '',
    tipo: undefined,
    produto: null
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
    setCheckTermos(!checkTermos)
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.senha &&
      senhaValida &&
      checkTermos &&
      (usuario.tipo === 'consumidor' || usuario.tipo === 'produtor')) {
      
      try {
        await cadastrarUsuario(usuario, setUsuarioResposta)
        const mensagemSucesso = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Usuário cadastrado com sucesso</span>
            <img src="https://i.imgur.com/9LUfmKX.png" alt="Usuário Cadastrado com Sucesso" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
          </div>
        );
        toast.success(mensagemSucesso);
      } catch (error) {
        const mensagemErro = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Erro ao cadastrar o Usuário</span>
            <img src="https://i.imgur.com/F1Yn7v3.png" alt="Erro ao Cadastrar Usuário" style={{ width: '100px', height: '100px', marginTop: '5px' }} />
          </div>
        );
        toast.error(mensagemErro);
        console.log(error)
      }
    }
    
    switch (false) {
      case confirmarSenha === usuario.senha:
        const mensagemSenhaInconsistente = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Dados inconsistentes, as senhas precisam ser iguais.</span>
            <img src="https://i.imgur.com/aAwsVDm.png" alt="Dados Inconsistentes" style={{ width: '100px', height: '100px', marginTop: '2px' }} />
          </div>
        );
        toast.info(mensagemSenhaInconsistente);
        setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
        setConfirmarSenha("")                 // Reinicia o campo de Confirmar Senha
        break
      case senhaValida:
        const mensagemSenhaFraca = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">A senha não atende aos requisitos mínimos.</span>
            <img src="https://i.imgur.com/F1Yn7v3.png" alt="Senha Fraca" style={{ width: '100px', height: '100px', marginTop: '5px' }} />
          </div>
        );
        toast.info(mensagemSenhaFraca);
        break
      case usuario.tipo === 'consumidor' || usuario.tipo === 'produtor':
        toast.info('Informe se você é um consumidor ou produtor')
        break
      case checkTermos:
        const mensagemTermosNaoAceitos = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Você precisa aceitar os termos de uso.</span>
            <img src="https://i.imgur.com/hjK8SOV.png" alt="Termos de Uso Não Aceitos" style={{ width: '100px', height: '100px', marginTop: '2px' }} />
          </div>
        );
        toast.info(mensagemTermosNaoAceitos);
        break
    }
  }

  return (
    <div className="w-full flex">
      <div className="w-full h-full hidden md:block">
        <div className="w-[50%] h-full bg-image-cadastrar bg-no-repeat bg-cover bg-center fixed"></div>
      </div>
      <div className="w-full h-screen flex flex-col items-start p-4">
        <Link to='/' className="w-28 z-50">
          <button className="w-full flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
            <CaretLeft size={40} />
            <span className="">Voltar</span>
          </button>
        </Link>

        <form className="w-full h-screen flex flex-wrap justify-center items-center gap-4 pb-16 pt-8" onSubmit={cadastrarNovoUsuario}>
          <div className="w-[80%] flex flex-col justify-center items-center gap-4">
            <div className="w-[90%] justify-center flex items-center">
              <h1 className="text-3xl font-bold">CADASTRE-SE</h1>
              <img src={Logo} className="w-14" alt="" />
            </div>

            <div className="w-[90%] flex flex-col items-start gap-4">
              <p className="font-bold">Crie sua vitrine online e ganhe visibilidade de milhares de clientes</p>
              <h2 className="text-2xl font-semibold">Dados de contato</h2>
              <input type="text"
                className="w-full border-2 rounded-lg p-3 outline-none border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Seu nome / Nome da empresa"
                name="nome"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <input
                type="email"
                className="w-full border-2 rounded-lg p-3 outline-none border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="E-mail"
                name="email"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
            </div>

            <div className="w-[90%] flex flex-col items-start gap-4">
              <h2 className="text-2xl font-semibold">Dados de acesso</h2>
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 outline-none border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Sua senha"
                name="senha"
                onFocus={mostrarRequisitos}
                onBlur={ocultarRequisitos}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarRequisitos(e)} />
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 outline-none border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
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
                <li id="senhas-iguais">As senhas precisam ser iguais</li>
              </ul>
              <div className="flex w-full justify-around flex-wrap">
                <div className={`${usuario.tipo === 'consumidor' ? 'text-green-600 dark:text-green-400' : ''} duration-300`}>
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
                  <label htmlFor="consumidor" className="flex flex-col items-center p-4 rounded-md hover:cursor-pointer transition duration-500 hover:bg-zinc-800">
                    <Basket size={42} />
                    Sou consumidor
                  </label>
                </div>
                <div className={`${usuario.tipo === 'produtor' ? 'text-orange-600 dark:text-orange-400' : ''} duration-300`}>
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
                  <label htmlFor="produtor" className="flex flex-col items-center p-4 rounded-md hover:cursor-pointer transition duration-300 hover:bg-zinc-800">
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