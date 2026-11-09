import '../css/IndexCard.css'

function IndexCard3 () {

  return (
    <>
      <div className="card-3-container">
        <i class="bi bi-shield-plus card-3-tag"></i>
        <h2 className="card-3-title">Solução CitizenTech</h2>
        <p className="card-3-subtitle">Criamos uma rede acessível para sincronizar horários e pontos de partida, permitindo caminhadas coletivas protegidas e inclusivas.</p>
        <div className="card-3-container-info">
          <div className="card-3-info-card">
            <i class="bi bi-people card-3-info-icon-yellow"></i>
            <p className="card-3-info-title">Caminhadas em Grupo</p>
            <p className="card-3-info-paragraph">Grupos seguros de até 10 pessoas.</p>
          </div>
          <div className="card-3-info-card">
            <i class="bi bi-person-check card-3-info-icon-green"></i>
            <p className="card-3-info-title">Perfis Verificados</p>
            <p className="card-3-info-paragraph">Validação de identidade para integrar a plataforma.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexCard3
