import '../css/IndexCard.css'

function IndexCard4 () {

  return (
    <>
      <h2 className="card-4-title">Objetivos de Desenvolvimento Sustentável (ODS)</h2>
      <div className="card-4-container">
        <div className="card-4-ods-card">
          <h3 className="card-4-ods-title red">ODS 5</h3>
          <p className="card-4-ods-subtitle">Igualdade de Gênero</p>
          <p className="card-4-ods-paragraph">Rotas exclusivas e proteção ativa para mulheres em espaço urbano.</p>
        </div>
        <div className="card-4-ods-card">
          <h3 className="card-4-ods-title violet">ODS 10</h3>
          <p className="card-4-ods-subtitle">Redução das Desigualdades</p>
          <p className="card-4-ods-paragraph">Acessibilidade universal para pessoas com baixa visão e mobilidade reduzida.</p>
        </div>
        <div className="card-4-ods-card">
          <h3 className="card-4-ods-title green">ODS 11</h3>
          <p className="card-4-ods-subtitle">Cidades Sustentáveis</p>
          <p className="card-4-ods-paragraph">Incentivo ao deslocamento a pé seguro e integrado aos bairros.</p>
        </div>
      </div>
    </>
  )
}

export default IndexCard4
