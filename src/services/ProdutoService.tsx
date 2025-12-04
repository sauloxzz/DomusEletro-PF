import axios from "axios";
import type { Produtos } from '../types/Produtos';

export const getProdutos = async (): Promise<Produtos[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/produtos")
        return resposta.data
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
        throw error;
    }
}
