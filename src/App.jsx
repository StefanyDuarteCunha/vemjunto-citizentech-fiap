import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';

import './css/App.css'
import './css/indexCard.css'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'

import IndexCard1 from './components/indexCard1.jsx'
import IndexCard2 from './components/indexCard2.jsx'
import IndexCard3 from './components/indexCard3.jsx'
import IndexCard4 from './components/indexCard4.jsx'
import Impacto from './components/impacto.jsx'
import BuscaRotas from './components/buscaRotas.jsx'
import RotaCard from './components/rotaCard.jsx';
import Contato from './components/contato.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>

        <main className="conteudo-container">
          <Routes>
            <Route path="/" element={
              <>
                {<IndexCard1 />}
                <div className="index-container-line-cards">
                  {<IndexCard2 />}
                  {<IndexCard3 />}
                </div>
                {<IndexCard4 />}
              </>
            } />
            <Route path="/rotasseguras" element={
              <>
                {<BuscaRotas />}
                <div className="rotas-container-line-cards">
                  {<RotaCard />}
                </div>
              </>
            } />
            <Route path="/impactos" element={<Impacto />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
