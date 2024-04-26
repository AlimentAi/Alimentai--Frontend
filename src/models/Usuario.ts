import Produto from "./Produto";

export default interface Usuario {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    tipo: undefined | 'administrador' | 'produtor' | 'consumidor';
    produto: Produto | null;
}