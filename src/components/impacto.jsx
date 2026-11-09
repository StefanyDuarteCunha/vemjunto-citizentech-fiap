import '../css/impacto.css'

function Impacto () {

  return (
    <>
      <h1 className="impacto-title">Impacto Social e Métricas de Segurança</h1>
      <div className="impacto-container">
        <div className="impacto-card">
          <i class="bi bi-person-walking impacto-icon"></i>
          <h3 className="impacto-number">+1.250</h3>
          <p className="impacto-paragraph">CAMINHADAS REALIZADAS</p>
        </div>
        <div className="impacto-card">
          <i class="bi bi-people impacto-icon"></i>
          <h3 className="impacto-number">+3.400</h3>
          <p className="impacto-paragraph">USUÁRIOS ATIVOS</p>
        </div>
        <div className="impacto-card">
          <i class="bi bi-heart impacto-icon"></i>
          <h3 className="impacto-number">98,4%</h3>
          <p className="impacto-paragraph">SENSAÇÃO DE SEGURANÇA</p>
        </div>
        <div className="impacto-card">
          <i class="bi bi-eye impacto-icon"></i>
          <h3 className="impacto-number">100%</h3>
          <p className="impacto-paragraph">ACESSÍVEL</p>
        </div>
      </div>
    </>
  )
}

export default Impacto
