import '../css/impacto.css'

function Impacto () {

  return (
    <>
      <div className="impacto-container">
        <h1 className="impacto-title">
          <i className="bi bi-graph-up-arrow impacto-title-icon"></i>
          Impacto Social e Métricas
        </h1>
        <h3 className="impacto-subtitle">Veja como nossas rotas colaboram para construir caminhos mais seguros a cada dia.</h3>
        <div className="impacto-container-cards">
          <div className="impacto-card">
            <i className="bi bi-person-walking impacto-icon"></i>
            <h3 className="impacto-number">+1.250</h3>
            <p className="impacto-paragraph">CAMINHADAS REALIZADAS</p>
          </div>
          <div className="impacto-card">
            <i className="bi bi-people impacto-icon"></i>
            <h3 className="impacto-number">+3.400</h3>
            <p className="impacto-paragraph">USUÁRIOS ATIVOS</p>
          </div>
          <div className="impacto-card">
            <i className="bi bi-heart impacto-icon"></i>
            <h3 className="impacto-number">98,4%</h3>
            <p className="impacto-paragraph">SENSAÇÃO DE SEGURANÇA</p>
          </div>
          <div className="impacto-card">
            <i className="bi bi-eye impacto-icon"></i>
            <h3 className="impacto-number">100%</h3>
            <p className="impacto-paragraph">ACESSÍVEL</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Impacto
