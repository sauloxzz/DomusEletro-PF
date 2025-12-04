export interface Produtos {
    nome: string;
    descricao: string;
    id: string | undefined;
    categorias: string[];
    imagens: string[];
    preco: number;
}