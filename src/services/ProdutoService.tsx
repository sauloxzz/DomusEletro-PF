import axios from "axios";
import type { Produtos } from '../types/Produtos';
import Produtos1 from "../pages/Produtos/Produtos";

export const getProdutos = async (): Promise<Produtos[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/produtos")
        return resposta.data
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
        throw error;
    }
}


export const deleteProdutos = async (idProduto: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/produtos/${idProduto}`)
    } catch (error) {
        console.error("Erro ao deletar o Produto: ", error)
        throw error;
    }
}

export const enviarFotoParaAPI = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post("http://localhost:3000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data.filename;
    } catch (error) {
        console.error("Erro ao upload da imagem: ", error);
        return undefined;
    }
};

export const postProduto = async (Produtos1: Produtos): Promise<void> => {
    try {
        await axios.post ("http://localhost:3000/produtos", Produtos1);
    } catch (error) {
        console.error ("Erro ao cadastrar o Produto: ", error);
        throw error;
    }
};