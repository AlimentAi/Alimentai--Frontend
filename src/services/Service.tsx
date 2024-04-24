import axios from 'axios'

const api = axios.create({
    baseURL: 'https://generation-pi-ecommerce.onrender.com'
})

export const cadastrarUsuario = async(dados: Object, setDados: Function) => {
    const resposta = await api.post('/usuarios/cadastrar', dados)
    setDados(resposta.data)
}

export const logarUsuario = async(dados: Object, setDados: Function) => {
    const resposta = await api.post('/usuarios/logar', dados)
    setDados(resposta.data)
}

export const buscar = async(endpoint: string, setDados: Function,header: Object) => {
    const resposta = await api.get(endpoint, header)
    setDados(resposta.data)
}

export const cadastrar = async(endpoint: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(endpoint, dados, header)
    setDados(resposta.data)
}

export const atualizar = async(endpoint: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(endpoint, dados, header)
    setDados(resposta.data)
}

export const deletar = async(endpoint: string, header: Object) => {
    await api.delete(endpoint, header)
}