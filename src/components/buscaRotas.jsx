import React, { useState } from 'react';
import '../css/buscaRotas.css'

function BuscaRotas() {
    const [busca, setBusca] = useState('');
    const [bairro, setBairro] = useState('');
    const [apenasMulheres, setApenasMulheres] = useState(false);

    return (
        <>
            <div className="container-busca-rota">
                    <h1 className="busca-rota-title">
                    <i class="bi bi-compass busca-rota-icon"></i>
                    Buscar rotas de Caminhada Acessíveis
                </h1>
                <div className="container-filtros-rotas">

                    {/* O primeiro filtro é relacionado a busca por nome do responsável pela rota */}
                    <div className="filtro-busca-responsavel">
                        <i class="bi bi-search icon-filtro-rotas"></i>
                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Buscar por local ou líder"
                            className="filtro-busca-responsavel-input"
                        />
                    </div>

                    {/* O segundo filtro é relacionado a busca por bairro */}
                    <div className="filtro-busca-bairro">
                        <i class="bi bi-funnel icon-filtro-rotas"></i>
                        <select
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            className="filtro-busca-bairro-select">
                            <option value="">Todos os Bairros</option>
                            <option value="centro">Centro</option>
                            <option value="savassi">Savassi</option>
                        </select>
                    </div>

                    {/* O terceiro filtro é relacionado a busca por rotas apenas para mulheres */}
                    <label className="filtro-busca-mulheres">
                        <input
                            type="checkbox"
                            checked={apenasMulheres}
                            onChange={(e) => setApenasMulheres(e.target.checked)}
                            className="filtro-busca-mulheres-checkbox"
                        />
                        <i class="bi bi-heart icon-filtro-rotas-mulheres"></i>
                        Apenas mulheres
                    </label>
                </div>
            </div>
        </>
    )
}

export default BuscaRotas