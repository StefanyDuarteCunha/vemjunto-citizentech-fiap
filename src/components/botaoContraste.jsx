import '../css/botaoContraste.css'
import { useState, useEffect } from 'react';

function BotaoContraste() {

    // armazena o estado do botão, iniciando com o estado falso - ou seja, sem ativar o contraste
    const [ativo, setAtivo] = useState(false);

    // aplica ou remove a classe CSS no body sempre que 'ativo' mudar
    useEffect(() => {
        if (ativo) {
            document.body.classList.add('contraste');
        } else {
            document.body.classList.remove('contraste');
        }
    }, [ativo]);

    return (
        <>
            <div className="botao-contraste-container">
                <button
                    type="button"
                    className="botao-contraste"
                    onClick={() => setAtivo(!ativo)}
                    aria-pressed={ativo}
                >
                    {!ativo ? (
                        <>
                            <i className="bi bi-eye-fill botao-contraste-icon"></i>
                            Ativar Alto Contraste
                        </>
                    ) : (
                        <>
                            <i className="bi bi-eye-fill botao-contraste-icon"></i>
                            Desativar Alto Contraste
                        </>
                    )}
                </button>
            </div>
        </>
    )
}

export default BotaoContraste
