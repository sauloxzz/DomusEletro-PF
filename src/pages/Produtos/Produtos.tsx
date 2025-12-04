import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './Produtos.css';
import type { Produtos } from '../../types/Produtos'
import { getProdutos } from '../../services/ProdutoService'
import CardProduto from '../../components/CardProduto/CardProduto'
import Carrossel from '../../components/Carrossel/Carrossel'
import Header from '../../components/Header/Header'

export default function Produtos1() {
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const location = useLocation();

  const parametrosPesquisados = new URLSearchParams(location.search);
  const termo_pesquisado = parametrosPesquisados.get('query');
  const { categoria } = useParams<{ categoria: string }>();

  const fetchProdutos = async () => {
    try {
      const dados = await getProdutos();
      if (categoria) {
        console.log(dados);
        const dados_filtrados = dados.filter(p =>
          p.categorias.some(cat => cat.toLowerCase() === categoria.toLowerCase())
        );
        console.log("Dados filtrados: ", dados_filtrados);
        setProdutos(dados_filtrados);
      } else if (termo_pesquisado) {
        const dados_filtrados = dados.filter(p =>
          p.nome.toLowerCase().includes(termo_pesquisado.toLowerCase()) ||
          p.descricao.toLowerCase().includes(termo_pesquisado.toLowerCase()) ||
          p.categorias.some(cat => cat.toLowerCase().includes(termo_pesquisado.toLowerCase()))
        );
        console.log("Dados filtrados: ", dados_filtrados);
        setProdutos(dados_filtrados);
      } else {
        setProdutos(dados);
        console.log("Dados retornados da API: ", dados);
      }
    } catch (error) {
      console.error("Erro ao executar getProdutos: ", error);
    }
  }

  useEffect(() => {
    fetchProdutos();
    console.log("Termo pesquisado:", termo_pesquisado);
  }, [termo_pesquisado, categoria]);

  return (
    <>
      <Header />
      <main>
        <Carrossel />
        <section className='container'>
          <h1 className="acessivel">produtos</h1>
          <div className="titulo">
            <span>
              {
                categoria
                  ? categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
                  : termo_pesquisado ? `Resultados para: ${termo_pesquisado}`
                  : "Nenhum filtro aplicado"}
            </span>
            <hr />
          </div>
        </section>
        <section className="cards">
          {
            produtos.map((p: Produtos) => (
              <CardProduto
                key={p.nome}
                nome={p.nome}
                descricao={p.descricao}
                preco={p.preco}
                imagem={p.imagens[0] ?? ""}
              />
            ))
          }
        </section>
      </main>
    </>
  )
}