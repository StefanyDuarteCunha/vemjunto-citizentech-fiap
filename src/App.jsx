import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

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
import RotaCard from './components/rotaCard.jsx'
import Contato from './components/contato.jsx'

import dadosRotas from './data/rotas.json';

function App() {

  // a constante armanezatodos os filtros que serão chamados no documento "buscaRotas"
  const [filtros, setFiltros] = useState({
    busca: '',
    cidade: '',
    bairro: '',
    tipoRota: '',
    vagaAberta: false,
    apenasMulheres: false,
    pisoTatil: false,
    acessivelCadeira: false
  });

  // usado para atualizar os filtros dinamicamente
  const handleFiltroChange = (nomeFiltro, valor) => {
    setFiltros(prev => {

      // Se a cidade mudar, reseta o bairro para não manter um bairro incompatível selecionado
      if (nomeFiltro === 'cidade') {
        return { ...prev, cidade: valor, bairro: '' };
      }
      return { ...prev, [nomeFiltro]: valor };
    });
  };

  // lista as cidades únicas extraídas do JSON
  const cidadesDisponiveis = useMemo(() => {
    const cidades = dadosRotas.map(r => r.origemCidade).filter(Boolean);
    return Array.from(new Set(cidades)).sort();
  }, []);

  // lista os bairros únicos (se uma cidade estiver selecionada, filtra só os bairros dessa cidade)
  const bairrosDisponiveis = useMemo(() => {
    const rotasFiltradasPorCidade = filtros.cidade
      ? dadosRotas.filter(r => r.origemCidade === filtros.cidade)
      : dadosRotas;

    const bairros = rotasFiltradasPorCidade.map(r => r.origemBairro).filter(Boolean);
    return Array.from(new Set(bairros)).sort();
  }, [filtros.cidade]);

  // realiza a aplicação dos Filtros
  const rotasFiltradas = dadosRotas.filter(rota => {
    const termoBusca = filtros.busca.toLowerCase();
    const atendeBusca = !filtros.busca ||
      rota.nomeCompleto.toLowerCase().includes(termoBusca) ||
      rota.origemNome.toLowerCase().includes(termoBusca) ||
      rota.destinoNome.toLowerCase().includes(termoBusca);

    // Cidade e Bairro com comparação direta exata
    const atendeCidade = !filtros.cidade || rota.origemCidade === filtros.cidade;
    const atendeBairro = !filtros.bairro || rota.origemBairro === filtros.bairro;
    const atendeTipoRota = !filtros.tipoRota || rota.tipoRota === filtros.tipoRota;

    const vagasRestantes = rota.integrantesMaximo - rota.integrantesAtuais;
    const atendeVagaAberta = !filtros.vagaAberta || vagasRestantes > 0;
    const atendeApenasMulheres = !filtros.apenasMulheres || rota.exclusivaMulheres;
    const atendePisoTatil = !filtros.pisoTatil || rota.pisoTatil;
    const atendeAcessivel = !filtros.acessivelCadeira || rota.acessivelCadeira;

    return (
      atendeBusca &&
      atendeCidade &&
      atendeBairro &&
      atendeTipoRota &&
      atendeVagaAberta &&
      atendeApenasMulheres &&
      atendePisoTatil &&
      atendeAcessivel
    );
  });

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
                <BuscaRotas
                  filtros={filtros}
                  onFiltroChange={handleFiltroChange}
                  cidadesDisponiveis={cidadesDisponiveis}
                  bairrosDisponiveis={bairrosDisponiveis}
                />
                <div className="rotas-container-line-cards">
                  <RotaCard rotas={rotasFiltradas} />
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
