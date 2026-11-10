import '../css/rotaCard.css'

function RotaCard () {

  return (
    <>
        <div className="rotacards-container">
            <div className="rotacards-tag-container">
                <p className="rotacards-tag">Vagas abertas</p>
            </div>
            <div className="rotacards-container-responsavel">
                <i class="bi bi-person-circle rotacards-title-icon"></i>
                <div className="rotacards-container-name">
                    <h3 className="rotacards-title-name">Mariana Silva</h3>
                    <p className="rotacards-title-cargo">Líder da Rota</p>
                </div>
            </div>
            <div className="rotacard-container-rota">
                <div className="rotacard-container-rota-inicio">
                    <i class="bi bi-geo-alt rotacard-encontro-icon"></i>
                    <div className="rotacard-container-encontro">
                        <p className="rotacard-encontro-title">PONTO DE ENCONTRO</p>
                        <p className="rotacard-encontro-endereco">Metrô Santa Cruz</p>
                    </div>
                </div>
                <p class="rotacard-divisoria-rota">|</p>
                <p class="rotacard-divisoria-rota">|</p>
                <div className="rotacard-container-rota-fim">
                    <i class="bi bi-compass rotacard-destino-icon"></i>
                    <div className="rotacard-container-destino">
                        <p className="rotacard-destino-title">DESTINO FINAL</p>
                        <p className="rotacard-destino-endereco">FIAP - Campus Vila Mariana</p>
                    </div>
                </div>
            </div>
            <div className="rotacard-container-date-time">
                <div className="rotacard-date-container">
                    <i class="bi bi-calendar-event rotacard-date-icon"></i>
                    <p className="rotacard-date">Apenas 16/10</p>
                </div>                
                <div className="rotacard-time-container">
                    <i class="bi bi-clock rotacard-time-icon"></i>
                    <p className="rotacard-time">Saída: 22:15</p>
                </div>
            </div>
            <div className="rotacard-integrantes-container">
                <i class="bi bi-people rotacard-integrantes-icon"></i>
                <p className="rotacard-integrantes">3/5 Integrantes</p>
            </div>
            <p className="rotacard-container-exclusivo-mulheres">
                <i class="bi bi-heart rotacard-mulheres-icon"></i>
                EXCLUSIVA - "APENAS MULHERES"
            </p>
            <p className="rotacard-container-acessivel-visual">
                <i class="bi bi-eye-slash rotacard-visual-icon"></i>
                ROTA COM PISO TÁTIL
            </p>
            <p className="rotacard-container-acessivel-cadeira">
                <i class="bi bi-person-wheelchair rotacard-cadeira-icon"></i>
                ROTA ACESSÍVEL
            </p>
            <p className="rotacard-button-cadastrar">
                <i class="bi bi-check-lg rotacard-button-cadastrar-icon"></i>
                Garantir vaga nesta rota
            </p>
        </div>
    </>
  )
}

export default RotaCard