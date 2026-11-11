import '../css/rotaCard.css'

function RotaCard({ rotas = [] }) {

    // o objeto pode receber rotas com recorrência ou ocorrência única, o que vai alterar o tipo de informação apresentada. este trecho do código recebe a frequência e valida se é único ou recorrente
    const formatarFrequencia = (rota) => {
        if (rota.frequencia === "unico") {
            return rota.dataInicio;
        }
        const dias = Object.keys(rota.diasSemana)
            .filter((dia) => rota.diasSemana[dia])
            .map((dia) => dia.charAt(0).toUpperCase() + dia.slice(1, 3).toLowerCase())
            .join(", ");
        return dias;
    };

    if (rotas.length === 0) {
        return (
            <p className="no-rotas-found" style={{ textAlign: 'center', margin: '2rem 0', width: '100%' }}>
                Nenhuma rota encontrada com os filtros selecionados.
            </p>
        );
    }

    return (
        <>
            {/* 2. Mapeia a lista importada diretamente do rotas.json */}
            {rotas.map((rota) => {
                const vagasRestantes = rota.integrantesMaximo - rota.integrantesAtuais;
                
                return (
                    <div key={rota.id} className="rotacards-container">

                        {/* Tag de Status da Rota */}
                        <div className="rotacards-tag-container">
                            <p className={`rotacards-tag ${vagasRestantes === 0 ? 'lotado' : vagasRestantes === 1 ? "ultimo" : ''}`}>
                              
                                {vagasRestantes === 0 ? "Grupo lotado" : vagasRestantes === 1 ? "Última vaga" : "Vagas abertas"}
                            </p>
                        </div>
                        <div className="rotacards-container-responsavel">
                            <i className="bi bi-person-circle rotacards-title-icon"></i>
                            <div className="rotacards-container-name">
                                <h3 className="rotacards-title-name">{rota.nomeCompleto}</h3>
                                <p className="rotacards-title-cargo">
                                    {rota.tipoRota === "ponto_onibus" ? "Companhia no Ponto" : "Líder da Rota"}
                                </p>
                            </div>
                        </div>
                        <div className="rotacard-container-rota">
                            <div className="rotacard-container-rota-inicio">
                                <i className="bi bi-geo-alt rotacard-encontro-icon"></i>
                                <div className="rotacard-container-encontro">
                                    <p className="rotacard-encontro-title">{rota.destinoNome}</p>
                                    <p className="rotacard-encontro-endereco">{rota.origemRua}, {rota.origemNumero} - {rota.origemBairro}</p>
                                </div>
                            </div>
                            <p className={`rotacard-divisoria-rota ${rota.tipoRota === "ponto_onibus" ? 'hidden' : ''}`}>|</p>
                            <p className={`rotacard-divisoria-rota ${rota.tipoRota === "ponto_onibus" ? 'hidden' : ''}`}>|</p>
                            <div className={`rotacard-container-rota-fim ${rota.tipoRota === "ponto_onibus" ? 'hidden' : ''}`}>
                                <i className="bi bi-compass rotacard-destino-icon"></i>
                                <div className="rotacard-container-destino">
                                    <p className="rotacard-destino-title">{rota.destinoNome}</p>
                                    <p className="rotacard-destino-endereco">{rota.destinoRua}, {rota.destinoNumero} - {rota.destinoBairro}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rotacard-container-data-hora-integrante">
                            <div className="rotacard-frequencia-container">
                                <i className="bi bi-repeat rotacard-frequencia-icon"></i>
                                <p className="rotacard-frequencia">
                                    {rota.frequencia === "unico" ? "Temporária" : "Recorrente"}
                                </p>
                            </div>
                            <div className="rotacard-date-container">
                                <i className="bi bi-calendar-event rotacard-date-icon"></i>
                                <p className="rotacard-date">{formatarFrequencia(rota)}</p>
                            </div>
                            <div className="rotacard-time-container">
                                <i className="bi bi-clock rotacard-time-icon"></i>
                                <p className="rotacard-time">{rota.horario}</p>
                            </div>
                            <div className="rotacard-integrantes-container">
                                <i className="bi bi-people rotacard-integrantes-icon"></i>
                                <p className="rotacard-integrantes">{rota.integrantesAtuais}/{rota.integrantesMaximo} Integrantes</p>
                            </div>
                        </div>
                        
                        <div className="rotacard-badgets-container">
                            {rota.exclusivaMulheres && (
                                <p className="rotacard-container-exclusivo-mulheres">
                                    <i className="bi bi-heart-fill rotacard-mulheres-icon"></i>
                                    Mulheres
                                </p>                                
                            )}

                            {rota.pisoTatil && (
                                <p className="rotacard-container-acessivel-visual">
                                    <i className="bi bi-eye-fill rotacard-visual-icon"></i>
                                    Piso tátil
                                </p>
                            )}

                            {rota.acessivelCadeira && (
                                <p className="rotacard-container-acessivel-cadeira">
                                    <i className="bi bi-person-wheelchair rotacard-cadeira-icon"></i>
                                    Acessível
                                </p>
                            )}
                        </div>

                        <button
                            className="rotacard-button-cadastrar"
                            disabled={vagasRestantes === 0}
                        >

                            {vagasRestantes > 0 ? (
                                <>
                                    <i className="bi bi-check-lg rotacard-button-cadastrar-icon"></i>
                                    Garantir vaga nesta rota
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-ban rotacard-button-cadastrar-icon"></i>
                                    Rota Lotada
                                </>
                            )}
                        </button>
                    </div>
                )
            })}
        </>
    )
}

export default RotaCard