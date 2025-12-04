import "./Home.css"
// import "../../components/CardCategoria/CardCategoria.css" 
import { categorias } from "../../data/categorias"
import CardCategoria from "../../components/CardCategoria/CardCategoria"
import type { CardCategoriaProps } from "../../types/cardCategoriaProps"
// import { Link } from "react-router-dom"
import Funcionaria from "../../assets/Funcionária_da_Domus_Eletro-removebg-preview 1.png"
import Logo from "../../assets/DomusEletro Eletrodomésticos De Cozinha (1).png"

export default function Home() {
    return (
        <>
            <main className="main_home">
               <section className="secao_logo">
                <img className="DomusEletro" src={Logo} alt="" />
                <img src={Funcionaria} alt="eletra" />
               </section>

                <section className="secao_categorias">
                    <h1 className="acessivel"></h1>
                    {
                        categorias.map((c: CardCategoriaProps) => (
                            <CardCategoria
                                key={c.titulo}
                                rota={c.rota}
                                titulo={c.titulo}
                                classeCss={c.classeCss}
                                svgIconeCategoria={c.svgIconeCategoria}
                            />
                        ))
                    }

                </section>

            </main>

        </>

    )
}
