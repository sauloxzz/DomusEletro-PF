import './Cadastro.css';
import { useEffect, useState } from 'react';
import { deleteProdutos, getProdutos } from '../../services/ProdutoService';
import Header from '../../components/Header/Header';
import type { Produtos } from '../../types/Produtos';
import ModalCustomizado from '../../components/ModalCustomizado/ModalCustomizado';




export default function Cadastro() {

    const [Produtos, setProdutos] = useState<Produtos[]>([]);
    const [clicouNaLixeira, setClicouNaLixeira] = useState<boolean>(false);
    const [idParaDeletar, setIdParaDeletar] = useState<String>("");
    const [aposConfirmacaoDeProdutoRemovido, setaposConfirmacaoDeProdutoRemovido] = useState<Boolean>(false);
    const [propsModalDeErroOuSucesso, setpropsModalDeErroOuSucesso] = useState<{ exibir: Boolean; titulo: String; corpo: String }>({ exibir: false, titulo: "", corpo: "" })

    const abrirModalParaConfirmarDelete = (id: string) => {     
        setClicouNaLixeira (true)
        setIdParaDeletar (id)
    }

    const fecharModalConfirmacaoDelete = () => {
        setClicouNaLixeira(false);
    }

    const exibirModalDeErroOuSucesso = (titulo: string, corpo: string) => {
        setpropsModalDeErroOuSucesso ({exibir: true, titulo, corpo});
    }

    const removerItemAposConfrimacao = async (id: string) => {
        try {
            await deleteProdutos(id);
            setaposConfirmacaoDeProdutoRemovido(true);
            await fetchProdutos ();
        } catch (error) {
        exibirModalDeErroOuSucesso ("Erro", "Erro ao deletar produto.")
        }
    }

    const fecharModalDeErroOuSucesso = () => {
        setpropsModalDeErroOuSucesso({...propsModalDeErroOuSucesso, exibir: false});
    }

    const fetchProdutos = async () => {
        try {
            const dados = await getProdutos();
            setProdutos(dados);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <>
            <Header />
            <main>
                <h1 className="acessivel">tela de cadastro e listagem de produtos</h1>

                <section className="container_cadastro">
                    <h2>Cadastro</h2>
                    <div className='itens_cadastro'>

                        <div className="box_cadastro">
                            <div className="cadastro_coluna1">
                                <div className="item">
                                    <label htmlFor="item">Item</label>
                                    <input type="text" name="" id="" />
                                </div>

                                <div className="categoria_img">
                                    <div className="categoria">
                                        <label htmlFor="cat">Categoria</label>
                                        <input type="text" name="" id="cat" />
                                    </div>
                                    <div className="img">
                                        <label htmlFor="img">
                                            <span>Imagem</span>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512">
                                                    <path fill="currentColor"
                                                        d="M232 344l0-316.7 106.3 106.3c3.1 3.1 8.2 3.1 11.3 0s3.1-8.2 0-11.3l-120-120c-3.1-3.1-8.2-3.1-11.3 0l-120 120c-3.1 3.1-3.1 8.2 0 11.3s8.2 3.1 11.3 0L216 27.3 216 344c0 4.4 3.6 8 8 8s8-3.6 8-8zm48-24l104 0c26.5 0 48 21.5 48 48l0 48c0 26.5-21.5 48-48 48L64 464c-26.5 0-48-21.5-48-48l0-48c0-26.5 21.5-48 48-48l104 0 0-16-104 0c-35.3 0-64 28.7-64 64l0 48c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-48c0-35.3-28.7-64-64-64l-104 0 0 16zm88 72a16 16 0 1 1 -32 0 16 16 0 1 1 32 0zm-16-32a32 32 0 1 0 0 64 32 32 0 1 0 0-64z" />
                                                </svg>
                                            </div>
                                        </label>
                                        <input type="file" name="" id="img" />
                                    </div>
                                </div>

                            </div>

                            <div className="cadastro_coluna2">
                                <label htmlFor="desc">Descrição</label>
                                <textarea name="" id="desc"></textarea>
                            </div>
                        </div>


                    </div>

                    <input type="button" value="Cadastrar" />
                </section>

                <section className="container_lista">
                    <h2>Lista</h2>
                    <hr />

                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-cell="Item: ">Geladeira Inox</td>
                                <td data-cell="Categoria: ">Geladeira</td>
                                <td data-cell="Descrição: ">Geladeira Frost Free inox com 400L, tecnologia inverter e baixo consumo de energia.</td>
                                <td data-cell="Valor: ">R$ 3.499,00</td>

                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="Item: ">Forno Elétrico 50L</td>
                                <td data-cell="Categoria: ">Forno</td>
                                <td data-cell="Descrição: ">Forno elétrico de bancada 50L com funções assar, gratinar e timer digital.</td>
                                <td data-cell="Valor: ">R$ 749,90</td>

                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="Item: ">Micro-ondas 20L</td>
                                <td data-cell="Categoria: ">Microondas</td>
                                <td data-cell="Descrição: ">Micro-ondas 20L com potência 700W, função descongelar e painel digital.</td>
                                <td data-cell="Valor: ">R$ 399,90</td>

                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="Item: ">Liquidificador Turbo</td>
                                <td data-cell="Categoria: ">Liquidificador</td>
                                <td data-cell="Descrição: ">Liquidificador 1.5L com lâminas em aço inox, 5 velocidades e função pulsar.</td>
                                <td data-cell="Valor: ">R$ 189,90</td>

                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="Item: ">Cafeteira Expresso</td>
                                <td data-cell="Categoria: ">Cafeteira</td>
                                <td data-cell="Descrição: ">Cafeteira expresso com reservatório de 1L e sistema de pressão de 15 bar para cafés cremosos.</td>
                                <td data-cell="Valor: ">R$ 449,90</td>

                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td data-cell="Item: ">Sanduicheira Grill</td>
                                <td data-cell="Categoria: ">Sanduicheira</td>
                                <td data-cell="Descrição: ">Sanduicheira elétrica antiaderente com placas grill e indicador luminoso de pronto.</td>
                                <td data-cell="Valor: ">R$ 129,90</td>

                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640">
                                        <path fill="currentColor"
                                            d="M247.4 79.1C251 70 259.9 64 269.7 64L370.3 64C380.1 64 388.9 70 392.6 79.1L412.2 128L227.8 128L247.4 79.1zM210.6 128L104 128C99.6 128 96 131.6 96 136C96 140.4 99.6 144 104 144L536 144C540.4 144 544 140.4 544 136C544 131.6 540.4 128 536 128L429.4 128L407.5 73.1C401.4 58 386.7 48 370.3 48L269.7 48C253.3 48 238.6 58 232.6 73.1L210.6 128zM128 192L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 192L496 192L496 512C496 538.5 474.5 560 448 560L192 560C165.5 560 144 538.5 144 512L144 192L128 192zM224 264C224 259.6 220.4 256 216 256C211.6 256 208 259.6 208 264L208 472C208 476.4 211.6 480 216 480C220.4 480 224 476.4 224 472L224 264zM328 264C328 259.6 324.4 256 320 256C315.6 256 312 259.6 312 264L312 472C312 476.4 315.6 480 320 480C324.4 480 328 476.4 328 472L328 264zM432 264C432 259.6 428.4 256 424 256C419.6 256 416 259.6 416 264L416 472C416 476.4 419.6 480 424 480C428.4 480 432 476.4 432 472L432 264z" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
            <ModalCustomizado
                MostrarModalQuando={clicouNaLixeira}
                aoCancelar={fecharModalConfirmacaoDelete}
                titulo='Confirmar exclusão'
                corpo='Tem certeza que deseja remover este produto?'
                customizarBotoes= {true}
                textoBotaoConfirmar='Exluir'
                textoBotaoCancelamento='Cancelamento'
                aoConfirmar={() => removerItemAposConfrimacao (idParaDeletar)}
                exibirConteudoCentralizado={true}
            />

            <ModalCustomizado
            MostrarModalQuando = {aposConfirmacaoDeProdutoRemovido}
            aoCancelar={() => setaposConfirmacaoDeProdutoRemovido (false)}
            titulo='Sucesso'
            corpo= "Produto Removido!"
            />

            <ModalCustomizado
            MostrarModalQuando={propsModalDeErroOuSucesso.exibir}
            aoCancelar={fecharModalDeErroOuSucesso}
            titulo={propsModalDeErroOuSucesso.titulo}
            corpo={propsModalDeErroOuSucesso.corpo}
            exibirConteudoCentralizado= {true}
            />
        </>
    )
}



