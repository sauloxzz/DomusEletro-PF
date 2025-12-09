import { Modal } from 'react-bootstrap';
import type { ModalCustomizadoProps } from '../../types/ModalCustomizadoProps';
import './ModalCustomizado.css';
export default function ModalCustomizado({ MostrarModalQuando, aoCancelar, exibirConteudoCentralizado, titulo, corpo, customizarBotoes, textoBotaoCancelamento, textoBotaoConfirmar, aoConfirmar }: ModalCustomizadoProps) {
    return (
        <Modal
            style={{ fontFamily: "Manrope, system-ui" }}
            show={MostrarModalQuando}
            onHide={aoCancelar}
            centered={exibirConteudoCentralizado}
        >
            <Modal.Header>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{corpo}</Modal.Body>
            <Modal.Footer>
                {
                    customizarBotoes && (<button onClick={aoCancelar} className='botaoModalCancelar'>
                        {textoBotaoCancelamento}
                    </button>
                    )
                }
                <button onClick={customizarBotoes ? aoConfirmar : aoCancelar} className='botaoSubmitModal'>
                    {customizarBotoes ? textoBotaoConfirmar : "OK"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

