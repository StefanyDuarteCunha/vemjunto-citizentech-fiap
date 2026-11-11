import React, { useState } from 'react';
import '../css/buscaRotas.css'

function BuscaRotas({ filtros, onFiltroChange, cidadesDisponiveis = [], bairrosDisponiveis = [] }) {

    // utilizado para controlar a exibição dos filtros avançados
    const [mostrarAvancados, setMostrarAvancados] = useState(false);

    // Conta quantos filtros avançados estão ativos para mostrar uma badge no botão
    const qtdFiltrosAvancadosAtivos = [
        filtros.tipoRota,
        filtros.vagaAberta,
        filtros.apenasMulheres,
        filtros.pisoTatil,
        filtros.acessivelCadeira
    ].filter(Boolean).length;

    return (
        <>
            <div className="container-busca-rota">
                <h1 className="busca-rota-title">
                    <i className="bi bi-compass busca-rota-icon"></i>
                    Buscar Rotas de Caminhada
                </h1>
                <h3 className="busca-rota-subtitle">Encontre caminhos acessíveis, seguros e adaptados para a sua jornada.</h3>
                <div className="container-filtros-rotas">

                    {/* filtros fixos */}
                    <div className="container-filtros-fixos">
                            {/* O primeiro filtro é relacionado a busca por nome do responsável pela rota */}
                        <div className="filtro-busca-responsavel">
                            <i className="bi bi-search icon-filtro-rotas"></i>
                            <input
                                type="text"
                                value={filtros.busca}
                                onChange={(e) => onFiltroChange('busca', e.target.value)}
                                placeholder="Buscar por local ou líder"
                                className="filtro-busca-responsavel-input"
                            />
                        </div>

                        {/* O segundo filtro é relacionado a busca por cidade */}
                        <div className="filtro-busca-cidade">
                            <i className="bi bi-funnel icon-filtro-rotas"></i>
                            <select
                                value={filtros.cidade}
                                onChange={(e) => onFiltroChange('cidade', e.target.value)}
                                className="filtro-busca-cidade-select">
                                <option value="">Todas as Cidades</option>
                                {cidadesDisponiveis.map(cidade => (
                                    <option key={cidade} value={cidade}>
                                        {cidade}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* O terceiro filtro é relacionado a busca por bairro */}
                        <div className="filtro-busca-bairro">
                            <i className="bi bi-funnel icon-filtro-rotas"></i>
                            <select
                                value={filtros.bairro}
                                onChange={(e) => onFiltroChange('bairro', e.target.value)}
                                className="filtro-busca-bairro-select">
                                <option value="">Todos os Bairros</option>
                                {bairrosDisponiveis.map(bairro => (
                                    <option key={bairro} value={bairro}>
                                        {bairro}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* botão para ocultar parte dos filtros */}
                    <button
                        type="button"
                        className={`botao-filtros-hidden ${mostrarAvancados ? 'ativo' : ''}`}
                        onClick={() => setMostrarAvancados(!mostrarAvancados)}
                    >
                        <i className="bi bi-sliders icon-filtro-hidden"></i>
                        {mostrarAvancados ? ' Ocultar Filtros' : ' Mais Filtros'}
                        {qtdFiltrosAvancadosAtivos > 0 && (
                            <span className="badge-filtros-ativos">{qtdFiltrosAvancadosAtivos}</span>
                        )}
                    </button>

                    {/* filtros avançados */}
                    {mostrarAvancados && (
                        <div className="container-filtros-avancados">


                            {/* O quarto filtro é relacionado ao tipo de rota */}
                            <div className="filtro-busca-tipo-rota">
                                <i className="bi bi-funnel icon-filtro-rotas"></i>
                                <select
                                    value={filtros.tipoRota}
                                    onChange={(e) => onFiltroChange('tipoRota', e.target.value)}
                                    className="filtro-busca-tipo-rota-select">
                                    <option value="">Todos os tipos</option>
                                    <option value="caminhada">Caminhada</option>
                                    <option value="ponto_onibus">Ponto de Ônibus</option>
                                </select>
                            </div>

                            {/* O quinto filtro é relacionado a busca por rotas em aberto */}
                            <label className="filtro-busca-aberta">
                                <input
                                    type="checkbox"
                                    checked={filtros.vagaAberta}
                                    onChange={(e) => onFiltroChange('vagaAberta', e.target.checked)}
                                    className="filtro-busca-aberta-checkbox"
                                />
                                <i className="bi bi-check icon-filtro-vaga-aberta"></i>
                                Vaga aberta
                            </label>

                            {/* O sexto filtro é relacionado a busca por rotas apenas para mulheres */}
                            <label className="filtro-busca-mulheres">
                                <input
                                    type="checkbox"
                                    checked={filtros.apenasMulheres}
                                    onChange={(e) => onFiltroChange('apenasMulheres', e.target.checked)}
                                    className="filtro-busca-mulheres-checkbox"
                                />
                                <i className="bi bi-heart icon-filtro-rotas-mulheres"></i>
                                Mulheres
                            </label>

                            {/* O sétimo filtro é relacionado a busca por rotas com piso tátil */}
                            <label className="filtro-busca-piso">
                                <input
                                    type="checkbox"
                                    checked={filtros.pisoTatil}
                                    onChange={(e) => onFiltroChange('pisoTatil', e.target.checked)}
                                    className="filtro-busca-piso-checkbox"
                                />
                                <i className="bi bi-eye-fill icon-filtro-piso-tatil"></i>
                                Piso tátil
                            </label>

                            {/* O oitavo filtro é relacionado a busca por rotas acessível a cadeirantes */}
                            <label className="filtro-busca-acessivel">
                                <input
                                    type="checkbox"
                                    checked={filtros.acessivelCadeira}
                                    onChange={(e) => onFiltroChange('acessivelCadeira', e.target.checked)}
                                    className="filtro-busca-acessivel-checkbox"
                                />
                                <i className="bi bi-person-wheelchair icon-filtro-acessivel-cadeira"></i>
                                Acessível
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BuscaRotas