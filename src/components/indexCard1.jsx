import '../css/indexCard.css'
import { Link } from 'react-router-dom';

function IndexCard1() {

  return (
    <>
      <div className="card-1-container">
        <div className="card-1-tag-container">
          <div className="card-1-tag">
            <i className="bi bi-stars card-1-tag-icon"></i>
            <p className="card-1-tag-paragraph">TECNOLOGIA CIDADÃ COM ACESSIBILIDADE TOTAL</p>
          </div>
        </div>
        <h2 className="card-1-title">Ninguém precisa caminhar <span className="card-1-title-destaque">sozinho</span> à noite ou com insegurança.</h2>
        <p className="card-1-subtitle">Conectamos pedestres que fazem os mesmos trajetos a pé na saída da faculdade ou trabalho, ou que ficam sozinhos no ponto de ônibus, garantindo visibilidade, acessibilidade e apoio mútuo.</p>
        <div className="card-1-container-button">
          <Link to="/rotasseguras" className="card-1-button-green">
            <i className="bi bi-stars card-1-button-icon-left"></i>
            Ver Rotas Seguras
            <i className="bi bi-arrow-right card-1-button-icon-right"></i>
          </Link>
          <button className="card-1-button-dark">
            <i className="bi bi-plus-circle card-1-button-icon-left"></i>
            Propor Nova Rota
          </button>  
        </div>
      </div>
    </>
  )
}

export default IndexCard1
