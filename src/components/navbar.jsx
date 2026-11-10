import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <>
        <div className="navbar-container">
            <div className="navbar-container-title">
                <div>
                    <i className="bi bi-person-walking navbar-icon-title"></i>
                </div>
                <div>
                    <h1 className="navbar-title">Vem<span className="navbar-title-destaque">Junto</span></h1>
                    <h3 className="navbar-subtitle">CITIZENTECH &bull; GLOBAL SOLUTION</h3>
                </div>
                
            </div>
            <div className="navbar-container-acessos">
                <Link to="/" className="navbar-acessos-menu">
                    <i className="bi bi-shield navbar-icon-menu"></i>
                    Inicio
                </Link>
                <Link to="/rotasseguras" className="navbar-acessos-menu">
                    <i className="bi bi-compass navbar-icon-menu"></i>
                    Rotas<span className="navbar-text-hidden">Seguras</span>
                </Link>
                <Link to="/impactos" className="navbar-acessos-menu">
                    <i className="bi bi-graph-up-arrow navbar-icon-menu"></i>
                    Impactos
                </Link>
                <Link to="/contato" className="navbar-acessos-menu">
                    <i className="bi bi-chat navbar-icon-menu"></i>
                    Contato
                </Link>
            </div>
            <div className="navbar-container-button">
                <button className="navbar-button">
                    <i className="bi bi-plus-circle navbar-icon-button"></i>
                    Propor Nova Rota
                </button>  
            </div>
        </div>
    </>
  )
}

export default Navbar
