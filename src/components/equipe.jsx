import '../css/equipe.css'
import Stefany from '../img/Stefany.jpeg'
import Matheus from '../img/Matheus.png'
import Laura from '../img/Laura.png'
import Leonardo from '../img/Leonardo.png'
import Emanuele from '../img/Emanuele.png'

function Equipe () {

  return (
    <>
      <div className="equipe-container">
        <h1 className="equipe-title">
          <i className="bi bi-people equipe-title-icon"></i>
          Equipe
        </h1>
        <h3 className="equipe-subtitle">Conheça o time por trás da solução VemJunto.</h3>
        <div className="equipe-container-cards">
          <div className="equipe-card">
            <img 
              src={Emanuele}
              alt="Foto de perfil de Emanuela - integrante do time"
            />
            <p className="equipe-paragraph">Emanuela dos Santos Santana</p>
          </div>
          <div className="equipe-card">
            <img 
              src={Laura}
              alt="Foto de perfil de Laura - integrante do time"
            />
            <p className="equipe-paragraph">Laura Beatriz Jesus de Oliveira</p>
          </div>
          <div className="equipe-card">
            <img 
              src={Leonardo}
              alt="Foto de perfil de Leonardo - integrante do time"
            />
            <p className="equipe-paragraph">Leonardo Gentil Biazus</p>
          </div>
          <div className="equipe-card">
            <img 
              src={Matheus}
              alt="Foto de perfil de Matheus - integrante do time"
            />
            <p className="equipe-paragraph">Matheus Ferreira Fernandes</p>
          </div>
          <div className="equipe-card">
            <img 
              src={Stefany}
              alt="Foto de perfil de Stefany - integrante do time"
            />
            <p className="equipe-paragraph">Stefany Duarte da Cunha</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Equipe
