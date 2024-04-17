import Postagem from "./Postagem";

export default interface Usuario {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    postagem: Postagem | null;
}