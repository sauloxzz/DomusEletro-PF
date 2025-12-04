import { formatosService } from '../../services/formatosService';
import type { CardProdutoProps } from '../../types/CardProdutoProps';
import './CardProduto.css';
import imagem_default from '../../assets/eletrodomesticos_default.png'


export default function CardProduto({ nome, descricao, preco, imagem, id }: CardProdutoProps) {

    return (
        <div key={id} className='cards'>
            {
                <div className='card_produto'>
                    <img src={(imagem.length > 0) ? `http://localhost:3000/static/${imagem}` : imagem_default} alt={"Imagem do produto: " + descricao}/>
                    <h2>{nome}</h2>
                    <p>{(descricao.length > 0) ? descricao : "Descrição não informada"}</p>
                    <span>{formatosService.PrecoBR(preco)} </span>
                </div>
            }
        </div>
    )
}
