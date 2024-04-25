import Postagem from "./Produto";

export default interface Usuario {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    type: 'administrador' | 'vendedor' | 'consumidor';
    postagem: Postagem | null;
}