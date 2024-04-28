import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toastAlerta } from '../../utils/toastAlerta'
import { atualizar } from '../../services/Service'
import Usuario from '../../models/Usuario'
import { Basket, CaretLeft, Carrot, ImageBroken, PencilSimpleLine, Trash, UserPlus } from '@phosphor-icons/react'
import Logo from "../../assets/logo.png"
import { toast } from 'react-toastify'

function EditarUsuario() {
  const { usuario, handleLogout, handleLogin } = useContext(AuthContext)
  let navigate = useNavigate()

  const [novoUsuario, setNovoUsuario] = useState({ ...usuario })
  const [senhaValida, setSenhaValida] = useState(false)
  const [confirmarSenha, setConfirmarSenha] = useState("")

  async function atualizarUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === novoUsuario.senha &&
      senhaValida &&
      (novoUsuario.tipo === 'consumidor' || novoUsuario.tipo === 'produtor' || novoUsuario.tipo === 'administrador')) {
      
      try {
        await atualizar('/usuarios/atualizar', novoUsuario, setNovoUsuario, {
          headers: {Authorization: usuario.token}
        })
        const mensagemSucesso = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Usuário atualizado com sucesso</span>
            <img src="src/assets/beteration/beterraba-cadastro-success.png" alt="Usuário Cadastrado com Sucesso" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
          </div>
        );
        toast.success(mensagemSucesso);

        handleLogin(novoUsuario)
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
      case confirmarSenha === novoUsuario.senha:
        const mensagemSenhaInconsistente = (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="font-semibold">Dados inconsistentes, as senhas precisam ser iguais.</span>
            <img src="https://i.imgur.com/aAwsVDm.png" alt="Dados Inconsistentes" style={{ width: '100px', height: '100px', marginTop: '2px' }} />
          </div>
        );
        toast.info(mensagemSenhaInconsistente);
        setNovoUsuario({ ...novoUsuario, senha: "" }) // Reinicia o campo de Senha
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
      case usuario.tipo === 'consumidor' || usuario.tipo === 'produtor' || usuario.tipo === 'administrador':
        toast.info('Informe se você é um consumidor ou produtor')
        break
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

    if (novoUsuario.senha.length === 0) {
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

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function limparImagem() {
    setNovoUsuario({
      ...novoUsuario,
      foto: 'https://i.imgur.com/Tk9f10K.png'
    })
  }

  return (
    <div className="w-full max-w-5xl items-center flex flex-col pt-8 pb-16 px-16 mx-auto">
      <div className="flex items-center">
        <p className="text-3xl font-bold">ATUALIZAR DADOS</p>
        <img src={Logo} className="w-14" alt="" />
      </div>
      <form className="h-full w-full flex flex-col p-4" onSubmit={atualizarUsuario}>
        <div className="w-full flex gap-4">
          <div className="w-full flex flex-col justify-between items-center gap-4">
            <div className="w-full flex flex-col items-start gap-4">
              <h2 className="text-2xl font-semibold">Dados de contato</h2>
              <input type="text"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Seu nome / Nome da empresa"
                name="nome"
                value={novoUsuario.nome}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
              <input
                type="email"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="E-mail"
                name="email"
                value={novoUsuario.email}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
            </div>

            <div className="w-full flex flex-col items-start gap-4">
              <h2 className="text-2xl font-semibold">Dados de acesso</h2>
              <input
                type="password"
                className="w-full border-2 rounded-lg p-3 border-[#cfcccc] hover:border-[#c42342] duration-1000 dark:bg-zinc-800"
                placeholder="Digite uma nova senha ou sua senha atual"
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
            </div>
          </div>
          <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
            <p className="text-3xl font-bold">Imagem do usuário</p>
            <div className='w-auto h-full max-w-64 max-h-64 overflow-hidden border p-2 rounded-lg'>
              {novoUsuario.foto.length < 10 || !(novoUsuario.foto.includes('.png') || novoUsuario.foto.includes('.jpg')) || novoUsuario.foto === null ?
                <ImageBroken className='w-full h-auto object-cover' size={256}/> :
                <img src={novoUsuario.foto} alt={`Esta é sua foto, ${novoUsuario.nome}`} />}
            </div>
            <div className='flex gap-4'>
              <input
                id='link-imagem'
                type="text"
                name='foto'
                className='border rounded-lg text-black appearance-none'
                value={novoUsuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                placeholder='Digite o link da foto desejada' />
              <button type='button' onClick={limparImagem} className='border flex flex-col items-center p-2 rounded-lg'>Remover imagem <Trash /></button>
            </div>
          </div>
          
        </div>
        <div className="flex justify-around my-4">
          <div className={`${novoUsuario.tipo === 'consumidor' ? 'text-green-600 dark:text-green-400' : ''} duration-300`}>
            <input
              id="consumidor"
              type="radio"
              name="tipo"
              className="invisible"
              value="consumidor"
              defaultChecked={usuario.tipo === 'consumidor'}
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
              defaultChecked={usuario.tipo === 'produtor'}
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
          {usuario.tipo === 'administrador' &&
            <div className={`${novoUsuario.tipo === 'administrador' ? 'text-red-600 dark:text-red-400' : ''} duration-300`}>
              <input
                id="administrador"
                type="radio"
                name="tipo"
                className="invisible"
                value="administrador"
                defaultChecked={usuario.tipo === 'administrador'}
                onChange={
                  (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) atualizarEstado(e)
                  }
                } />
              <label htmlFor="administrador" className="flex flex-col items-center">
                <UserPlus size={42} />
                Sou administrador
              </label>
            </div>}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link to='/'>
            <button className="w-full pr-4 h-14 flex items-center gap-1 p-1 rounded-lg text-[#f76c6f] hover:bg-[#c42342] hover:text-white font-bold duration-1000">
              <CaretLeft size={40} />
              <span className="">Cancelar</span>
            </button>
          </Link>
          <button type='submit' className="w-[50%] h-14 bg-[#f76c6f] rounded-lg font-bold text-white hover:bg-[#c42342] duration-1000">Atualizar dados</button>
        </div>
      </form>
    </div>
  )
}

export default EditarUsuario