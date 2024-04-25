export default interface UsuarioLogin {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    type: 'administrador' | 'produtor' | 'consumidor';
    token: string;
}