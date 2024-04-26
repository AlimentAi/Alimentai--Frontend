export default interface UsuarioLogin {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    tipo: undefined | 'administrador' | 'produtor' | 'consumidor';
    token: string;
}