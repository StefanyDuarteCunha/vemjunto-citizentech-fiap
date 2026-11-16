import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useMemo } from "react";

import "./css/App.css";
import "./css/indexCard.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

import IndexCard1 from "./components/indexCard1.jsx";
import IndexCard2 from "./components/indexCard2.jsx";
import IndexCard3 from "./components/indexCard3.jsx";
import IndexCard4 from "./components/indexCard4.jsx";
import Impacto from "./components/impacto.jsx";
import BuscaRotas from "./components/buscaRotas.jsx";
import RotaCard from "./components/rotaCard.jsx";
import Contato from "./components/contato.jsx";
import BotaoContraste from "./components/botaoContraste.jsx";
import NovaRota from "./components/novaRota.jsx";

import dadosRotas from "./data/rotas.json";

// usado apenas quando não há servidor de desenvolvimento para gravar no rotas.json (ex.: site publicado)
const CHAVE_ROTAS_LOCAIS = "rotasPropostas";
const lerRotasLocais = () => {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_ROTAS_LOCAIS)) || [];
  } catch {
    return [];
  }
};

function App() {
  // lista de rotas exibida em "Rotas Seguras": começa com o conteúdo do rotas.json (+ rotas salvas localmente, se houver)
  const [rotas, setRotas] = useState(() => {
    const idsExistentes = new Set(dadosRotas.map((r) => r.id));
    return [
      ...dadosRotas,
      ...lerRotasLocais().filter((r) => !idsExistentes.has(r.id)),
    ];
  });

  // salva uma nova rota no rotas.json (via endpoint do Vite, ver vite.config.js) e a adiciona à lista exibida
  const adicionarRota = async (novaRota) => {
    let rotaSalva;
    try {
      const resposta = await fetch("/api/rotas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaRota),
      });
      if (!resposta.ok) throw new Error("Falha ao gravar no rotas.json");
      rotaSalva = await resposta.json();
    } catch {
      // sem servidor de desenvolvimento não é possível gravar em arquivo: guarda no navegador
      rotaSalva = { id: Date.now(), ...novaRota };
      localStorage.setItem(
        CHAVE_ROTAS_LOCAIS,
        JSON.stringify([...lerRotasLocais(), rotaSalva]),
      );
    }
    setRotas((prev) => [...prev, rotaSalva]);
  };

  // usado para transformar o arquivo "novaRota.jsx" em um modal que abre acima de todos os arquivos
  const [modalNovaRotaAberto, setModalNovaRotaAberto] = useState(false);
  const abrirModalRota = () => setModalNovaRotaAberto(true);
  const fecharModalRota = () => setModalNovaRotaAberto(false);

  // a constante armanezatodos os filtros que serão chamados no documento "buscaRotas"
  const [filtros, setFiltros] = useState({
    busca: "",
    cidade: "",
    bairro: "",
    tipoRota: "",
    vagaAberta: false,
    apenasMulheres: false,
    pisoTatil: false,
    acessivelCadeira: false,
  });

  // usado para atualizar os filtros dinamicamente
  const handleFiltroChange = (nomeFiltro, valor) => {
    setFiltros((prev) => {
      // Se a cidade mudar, reseta o bairro para não manter um bairro incompatível selecionado
      if (nomeFiltro === "cidade") {
        return { ...prev, cidade: valor, bairro: "" };
      }
      return { ...prev, [nomeFiltro]: valor };
    });
  };

  // lista as cidades únicas extraídas do JSON
  const cidadesDisponiveis = useMemo(() => {
    const cidades = rotas.map((r) => r.origemCidade).filter(Boolean);
    return Array.from(new Set(cidades)).sort();
  }, [rotas]);

  // lista os bairros únicos (se uma cidade estiver selecionada, filtra só os bairros dessa cidade)
  const bairrosDisponiveis = useMemo(() => {
    const rotasFiltradasPorCidade = filtros.cidade
      ? rotas.filter((r) => r.origemCidade === filtros.cidade)
      : rotas;

    const bairros = rotasFiltradasPorCidade
      .map((r) => r.origemBairro)
      .filter(Boolean);
    return Array.from(new Set(bairros)).sort();
  }, [filtros.cidade, rotas]);

  // realiza a aplicação dos Filtros
  const rotasFiltradas = rotas.filter((rota) => {
    const termoBusca = filtros.busca.toLowerCase();
    const atendeBusca =
      !filtros.busca ||
      rota.nomeCompleto.toLowerCase().includes(termoBusca) ||
      rota.origemNome.toLowerCase().includes(termoBusca) ||
      rota.destinoNome.toLowerCase().includes(termoBusca);

    // Cidade e Bairro com comparação direta exata
    const atendeCidade =
      !filtros.cidade || rota.origemCidade === filtros.cidade;
    const atendeBairro =
      !filtros.bairro || rota.origemBairro === filtros.bairro;
    const atendeTipoRota =
      !filtros.tipoRota || rota.tipoRota === filtros.tipoRota;

    const vagasRestantes = rota.integrantesMaximo - rota.integrantesAtuais;
    const atendeVagaAberta = !filtros.vagaAberta || vagasRestantes > 0;
    const atendeApenasMulheres =
      !filtros.apenasMulheres || rota.exclusivaMulheres;
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
          <BotaoContraste />
          <Navbar onAbrirModal={abrirModalRota} />
        </header>

        <main className="conteudo-container">
          <NovaRota
            isOpen={modalNovaRotaAberto}
            onClose={fecharModalRota}
            onSalvarRota={adicionarRota}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {<IndexCard1 onAbrirModal={abrirModalRota} />}
                  <div className="index-container-line-cards">
                    {<IndexCard2 />}
                    {<IndexCard3 />}
                  </div>
                  {<IndexCard4 />}
                </>
              }
            />
            <Route
              path="/rotasseguras"
              element={
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
              }
            />
            <Route path="/impactos" element={<Impacto />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
