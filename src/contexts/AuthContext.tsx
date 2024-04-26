import { ReactNode, createContext, useState } from "react"
import UsuarioLogin from "../models/UsuarioLogin"
import { logarUsuario } from "../services/Service"
import { toast } from "react-toastify"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider( {children}: AuthProviderProps ) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await logarUsuario(userLogin, setUsuario)
            const mensagemSucess = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="font-semibold">Usuário logado com sucesso!</span>
                  <img src="https://i.imgur.com/FbwTs9u.png" alt="Usuário Logado com Sucesso" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
                </div>
              );
              toast.success(mensagemSucess);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            const mensagemFailed = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="font-semibold">Dados do usuário inconsistentes</span>
                  <img src="https://i.imgur.com/3cYeq8E.png" alt="Dados inconsistentes" style={{ width: '100px', height: '100px', marginTop: '8px' }} />
                </div>
              );
              toast.error(mensagemFailed);
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            email: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={({usuario, handleLogin, handleLogout, isLoading})}>
            {children}
        </AuthContext.Provider>
    )
}