import '../css/novaRota.css'
import { useState } from 'react';
import rotasIniciais from '../data/rotas.json';

function NovaRota({ isOpen, onClose }) {
    const estadoInicialFormulario = {
        nomeCompleto: '',
        cpf: '',
        telefone: '',
        email: '',
        tipoRota: '',
        origemNome: '',
        origemRua: '',
        origemNumero: '',
        origemBairro: '',
        origemCidade: '',
        origemEstado: '',
        destinoNome: '',
        destinoRua: '',
        destinoNumero: '',
        destinoBairro: '',
        destinoCidade: '',
        destinoEstado: '',
        horario: '',
        integrantesMaximo: '',
        frequencia: '',
        dataInicio: '',
        dataFim: '',
        diasSemana: {
            domingo: false,
            segundaFeira: false,
            tercaFeira: false,
            quartaFeira: false,
            quintaFeira: false,
            sextaFeira: false,
            sabado: false,
        },
        exclusivaMulheres: false,
        pisoTatil: false,
        acessivelCadeira: false,
    };

    const [formNovaRota, setFormNovaRota] = useState(estadoInicialFormulario);

    function aplicarMascaraTelefone(valor) {
        // só números
        const numeros = valor.replace(/\D/g, "").slice(0, 11);

        // menos de 3 dígitos → não mascara ainda
        if (numeros.length <= 2) return numeros;

        // entre 3 e 7 dígitos → mascara parcialmente
        if (numeros.length <= 7) {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        }

        // 8 a 11 dígitos → máscara completa
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }

    function aplicarMascaraCPF(valor) {
        // Remove tudo que não for número e limita a 11 dígitos
        const numeros = valor.replace(/\D/g, "").slice(0, 11);

        if (numeros.length <= 3) return numeros;
        if (numeros.length <= 6) {
            return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
        }
        if (numeros.length <= 9) {
            return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
        }
        return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let valorFinal = value;
        if (name === 'telefone') {
            valorFinal = aplicarMascaraTelefone(value);
        } else if (name === 'cpf') {
            valorFinal = aplicarMascaraCPF(value);
        }

        setFormNovaRota((prevData) => {
            const atualizado = {
                ...prevData,
                [name]: type === 'checkbox' ? checked : valorFinal,
            };

            // Limpa os dados de destino caso o usuário mude de Caminhada para Ponto de Ônibus
            if (name === 'tipoRota' && value === 'ponto_onibus') {
                atualizado.destinoNome = '';
                atualizado.destinoRua = '';
                atualizado.destinoNumero = '';
                atualizado.destinoBairro = '';
                atualizado.destinoCidade = '';
                atualizado.destinoEstado = '';
            }

            // Limpa dataFim e diasSemana caso o usuário mude para Rota Única
            if (name === 'frequencia' && value === 'unico') {
                atualizado.dataFim = '';
                atualizado.diasSemana = estadoInicialFormulario.diasSemana;
            }

            return atualizado;
        });
    };

    // Handler específico para o objeto aninhado diasSemana
    const handleDiaSemanaChange = (e) => {
        const { name, checked } = e.target;
        setFormNovaRota((prevData) => ({
            ...prevData,
            diasSemana: {
                ...prevData.diasSemana,
                [name]: checked,
            },
        }));
    };

    const [statusEnvio, setStatusEnvio] = useState(false); // controla se exibe ou não a confirmação

    function confirmacaoEnvio(e) {
        e.preventDefault();
        
        // Valida se pelo menos um dia da semana foi marcado em rotas recorrentes
        if (formNovaRota.frequencia === "recorrente") {
            const algumDiaMarcado = Object.values(formNovaRota.diasSemana).some(Boolean);

            if (!algumDiaMarcado) {
                alert("Selecione pelo menos um dia da semana para a rota recorrente.");
                return; // Interrompe o envio
            }
        }

        // Carrega as rotas atuais
        const rotasSalvas = JSON.parse(localStorage.getItem('rotas')) || rotasIniciais;

        // Cria o novo objeto no padrão do JSON, gerando ID e campos fixos
        const novaRotaFormatada = {
            id: rotasSalvas.length > 0 ? Math.max(...rotasSalvas.map(r => r.id)) + 1 : 1,
            ...formNovaRota,
            integrantesMaximo: Number(formNovaRota.integrantesMaximo),
            integrantesAtuais: 1, // Quem cria a rota já conta como 1 integrante
            statusVerificacao: false, // Começa false até a validação mencionada no subtítulo
        };

        // Atualiza a lista e salva
        const listaAtualizada = [...rotasSalvas, novaRotaFormatada];
        localStorage.setItem('rotas', JSON.stringify(listaAtualizada));

        console.log('Lista atualizada pronta para uso:', listaAtualizada);

        setStatusEnvio(true);
        setFormNovaRota(estadoInicialFormulario);

        setTimeout(() => {
            setStatusEnvio(false);
        }, 5000);
    }

    return (
        <>
            {statusEnvio && (
                <div className="nova-rota-mensagem-sucesso">
                    Rota cadastrada com sucesso!
                </div>
            )}

            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <div
                        className="nova-rota-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="modal-fechar-btn"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        <h1 className="nova-rota-title">
                            <i className="bi bi-plus-circle nova-rota-title-icon"></i>
                            Propor Nova Rota
                        </h1>
                        <h3 className="nova-rota-subtitle">Preencha o formulário a seguir, fornecendo seus dados pessoais e os dados da rota. Caso este seja seu primeiro cadastro na plataforma, será realizado um contato com você em até 1 dia útil, para validar suas informações junto ao nosso sistema.</h3>

                        <form id="nova-rota-forms" onSubmit={confirmacaoEnvio}>

                            <h3 className="nova-rota-title-section">Dados Pessoais</h3>
                            <div className="nova-rota-dados-container">
                                {/* Campo de Nome*/}
                                <div className="nova-rota-forms-campo">
                                    <label htmlFor="nomeCompleto" className="nova-rota-forms-label">
                                        Nome Completo:
                                    </label>
                                    <input
                                        type="text"
                                        id="nomeCompleto"
                                        name="nomeCompleto"
                                        value={formNovaRota.nomeCompleto}
                                        onChange={handleChange}
                                        placeholder="Digite seu nome"
                                        className="nova-rota-forms-input"
                                        minLength={3}
                                        required
                                    />
                                </div>

                                {/* Campo de cpf*/}
                                <div className="nova-rota-forms-campo">
                                    <label htmlFor="cpf" className="nova-rota-forms-label">
                                        CPF:
                                    </label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        name="cpf"
                                        value={formNovaRota.cpf}
                                        onChange={handleChange}
                                        placeholder="Digite seu CPF"
                                        className="nova-rota-forms-input"
                                        minLength={11}
                                        required
                                    />
                                </div>

                                {/* Campo de E-mail */}
                                <div className="nova-rota-forms-campo">
                                    <label htmlFor="email" className="nova-rota-forms-label">
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formNovaRota.email}
                                        onChange={handleChange}
                                        placeholder="seu@email.com"
                                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                        className="nova-rota-forms-input"
                                        title="Digite o email no formato nome@example.com"
                                        required
                                    />
                                </div>

                                {/* Campo de telefone */}
                                <div className="nova-rota-forms-campo">
                                    <label htmlFor="telefone" className="nova-rota-forms-label">
                                        Telefone / WhatsApp:
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefone"
                                        name="telefone"
                                        value={formNovaRota.telefone}
                                        onChange={handleChange}
                                        placeholder="(xx)xxxxx-xxxx"
                                        className="nova-rota-forms-input"
                                        maxLength={15} // Limite de caracteres considerando a máscara: (XX) 9XXXX-XXXX
                                        pattern="\(\d{2}\)\s\d{4,5}-\d{4}" // Validação nativa Regex no submit
                                        title="Digite o telefone, somente números, no formato DDD número"
                                        required
                                    />
                                </div>
                            </div>

                            <h3 className="nova-rota-title-section">Tipo de Rota a ser cadastrada</h3>
                            <div className="nova-rota-tipo-container"></div>
                            {/* Campo de tipo de rota */}
                            <div className="nova-rota-forms-campo">
                                <span className="nova-rota-forms-label">Quero companhia para:</span>

                                <div className="radio-grupo">
                                    <label className="radio-item">
                                        <input
                                            type="radio"
                                            name="tipoRota"
                                            value="caminhada"
                                            checked={formNovaRota.tipoRota === "caminhada"}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span>Caminhada</span>
                                    </label>

                                    <label className="radio-item">
                                        <input
                                            type="radio"
                                            name="tipoRota"
                                            value="ponto_onibus"
                                            checked={formNovaRota.tipoRota === "ponto_onibus"}
                                            onChange={handleChange}
                                        />
                                        <span>Ponto de ônibus</span>
                                    </label>
                                </div>
                            </div>


                            {/* O local de origem aparece ao selecionar caminhada ou ponto de ônibus */}
                            {(formNovaRota.tipoRota === "caminhada" || formNovaRota.tipoRota === "ponto_onibus") && (
                                <>
                                    <h3 className="nova-rota-title-section">Dados do Local de Origem</h3>
                                    <div className="nova-rota-origem-container">
                                        {/* Campo de Origem - Nome */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="origemNome" className="nova-rota-forms-label">
                                                Local de Encontro
                                            </label>
                                            <input
                                                type="text"
                                                id="origemNome"
                                                name="origemNome"
                                                value={formNovaRota.origemNome}
                                                onChange={handleChange}
                                                placeholder="Digite o nome do ponto de encontro"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Origem - Rua */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="origemRua" className="nova-rota-forms-label">
                                                Rua
                                            </label>
                                            <input
                                                type="text"
                                                id="origemRua"
                                                name="origemRua"
                                                value={formNovaRota.origemRua}
                                                onChange={handleChange}
                                                placeholder="Digite o nome da rua"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Origem - Número */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="origemNumero" className="nova-rota-forms-label">
                                                Número
                                            </label>
                                            <input
                                                type="text"
                                                id="origemNumero"
                                                name="origemNumero"
                                                value={formNovaRota.origemNumero}
                                                onChange={handleChange}
                                                placeholder="Digite o número"
                                                className="nova-rota-forms-input"
                                                required
                                            />
                                        </div>

                                        {/* Campo de Origem - Bairro */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="origemBairro" className="nova-rota-forms-label">
                                                Bairro
                                            </label>
                                            <input
                                                type="text"
                                                id="origemBairro"
                                                name="origemBairro"
                                                value={formNovaRota.origemBairro}
                                                onChange={handleChange}
                                                placeholder="Digite o bairro"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Origem - Cidade */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="origemCidade" className="nova-rota-forms-label">
                                                Cidade
                                            </label>
                                            <input
                                                type="text"
                                                id="origemCidade"
                                                name="origemCidade"
                                                value={formNovaRota.origemCidade}
                                                onChange={handleChange}
                                                placeholder="Digite a cidade"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Origem - Estado */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="origemEstado" className="nova-rota-forms-label">
                                                Estado
                                            </label>
                                            <input
                                                type="text"
                                                id="origemEstado"
                                                name="origemEstado"
                                                value={formNovaRota.origemEstado}
                                                onChange={handleChange}
                                                placeholder="Digite o estado"
                                                className="nova-rota-forms-input"
                                                minLength={2}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {/* O local de destino aparece ao selecionar caminhada */}
                            {formNovaRota.tipoRota === "caminhada" && (
                                <>
                                    <h3 className="nova-rota-title-section">Dados do Local de Destino</h3>
                                    <div className="nova-rota-destino-container">
                                        {/* Campo de Destino - Nome */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="destinoNome" className="nova-rota-forms-label">
                                                Local de Destino
                                            </label>
                                            <input
                                                type="text"
                                                id="destinoNome"
                                                name="destinoNome"
                                                value={formNovaRota.destinoNome}
                                                onChange={handleChange}
                                                placeholder="Digite o nome do destino final"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Destino - Rua */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="destinoRua" className="nova-rota-forms-label">
                                                Rua
                                            </label>
                                            <input
                                                type="text"
                                                id="destinoRua"
                                                name="destinoRua"
                                                value={formNovaRota.destinoRua}
                                                onChange={handleChange}
                                                placeholder="Digite o nome da rua"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Destino - Número */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="destinoNumero" className="nova-rota-forms-label">
                                                Número
                                            </label>
                                            <input
                                                type="text"
                                                id="destinoNumero"
                                                name="destinoNumero"
                                                value={formNovaRota.destinoNumero}
                                                onChange={handleChange}
                                                placeholder="Digite o número"
                                                className="nova-rota-forms-input"
                                                required
                                            />
                                        </div>

                                        {/* Campo de Destino - Bairro */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="destinoBairro" className="nova-rota-forms-label">
                                                Bairro
                                            </label>
                                            <input
                                                type="text"
                                                id="destinoBairro"
                                                name="destinoBairro"
                                                value={formNovaRota.destinoBairro}
                                                onChange={handleChange}
                                                placeholder="Digite o bairro"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Destino - Cidade */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="destinoCidade" className="nova-rota-forms-label">
                                                Cidade
                                            </label>
                                            <input
                                                type="text"
                                                id="destinoCidade"
                                                name="destinoCidade"
                                                value={formNovaRota.destinoCidade}
                                                onChange={handleChange}
                                                placeholder="Digite a cidade"
                                                className="nova-rota-forms-input"
                                                minLength={3}
                                                required
                                            />
                                        </div>

                                        {/* Campo de Destino - Estado */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="destinoEstado" className="nova-rota-forms-label">
                                                Estado
                                            </label>
                                            <input
                                                type="text"
                                                id="destinoEstado"
                                                name="destinoEstado"
                                                value={formNovaRota.destinoEstado}
                                                onChange={handleChange}
                                                placeholder="Digite o estado"
                                                className="nova-rota-forms-input"
                                                minLength={2}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {/* Os dados de frequência aparece ao selecionar caminhada ou ponto de ônibus */}
                            {(formNovaRota.tipoRota === "caminhada" || formNovaRota.tipoRota === "ponto_onibus") && (
                                <>
                                    <h3 className="nova-rota-title-section">Dados da Frequência</h3>
                                    {/* Campo de tipo de rota */}
                                    <div className="nova-rota-forms-campo">
                                        <span className="nova-rota-forms-label">Frequência da Rota:</span>

                                        <div className="radio-grupo">
                                            <label className="radio-item">
                                                <input
                                                    type="radio"
                                                    name="frequencia"
                                                    value="recorrente"
                                                    checked={formNovaRota.frequencia === "recorrente"}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span>Rota recorrente</span>
                                            </label>

                                            <label className="radio-item">
                                                <input
                                                    type="radio"
                                                    name="frequencia"
                                                    value="unica"
                                                    checked={formNovaRota.frequencia === "unica"}
                                                    onChange={handleChange}
                                                />
                                                <span>Rota única</span>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {/* O local de origem aparece ao selecionar caminhada ou ponto de ônibus */}
                            {(formNovaRota.frequencia === "recorrente" || formNovaRota.frequencia === "unica") && (
                                <>
                                    <div className="nova-rota-frequencia-container">
                                        {/* Campo de Data de Início */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="dataInicio" className="nova-rota-forms-label">
                                                Data de Início
                                            </label>
                                            <input
                                                type="date"
                                                id="dataInicio"
                                                name="dataInicio"
                                                value={formNovaRota.dataInicio}
                                                onChange={handleChange}
                                                placeholder="Digite a data de inicio"
                                                className="nova-rota-forms-input"
                                                required
                                            />
                                        </div>

                                        {/* Data de Encerramento aparece apenas em rotas recorrentes */}
                                        {formNovaRota.frequencia === "recorrente" && (
                                            // Campo de Data de Encerramento
                                            <div className="nova-rota-forms-campo">
                                                <label htmlFor="dataFim" className="nova-rota-forms-label">
                                                    Data de Encerramento
                                                </label>
                                                <input
                                                    type="date"
                                                    id="dataFim"
                                                    name="dataFim"
                                                    value={formNovaRota.dataFim}
                                                    onChange={handleChange}
                                                    placeholder="Digite a data de encerramento"
                                                    className="nova-rota-forms-input"
                                                    required
                                                />
                                            </div>
                                        )}

                                        {/* Campo de Horário */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="horario" className="nova-rota-forms-label">
                                                Horário
                                            </label>
                                            <input
                                                type="time"
                                                id="horario"
                                                name="horario"
                                                value={formNovaRota.horario}
                                                onChange={handleChange}
                                                placeholder="Digite o horário"
                                                className="nova-rota-forms-input"
                                                required
                                            />
                                        </div>

                                        {/* Campo de Integrantes */}
                                        <div className="nova-rota-forms-campo">
                                            <label htmlFor="integrantesMaximo" className="nova-rota-forms-label">
                                                Participantes permitidos
                                            </label>
                                            <input
                                                type="number"
                                                id="integrantesMaximo"
                                                name="integrantesMaximo"
                                                value={formNovaRota.integrantesMaximo}
                                                onChange={handleChange}
                                                placeholder="Digite a quantidade de integrantes"
                                                className="nova-rota-forms-input"
                                                min={2}
                                                max={10}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Data de Encerramento aparece apenas em rotas recorrentes */}
                                    {formNovaRota.frequencia === "recorrente" && (
                                        // Campo de dias de frequência
                                        <div className="nova-rota-forms-campo">
                                            <span className="nova-rota-forms-label">Frequência semanal</span>

                                            <div className="checkbox-grupo">
                                                {[
                                                    { chave: 'domingo', label: 'D' },
                                                    { chave: 'segundaFeira', label: 'S' },
                                                    { chave: 'tercaFeira', label: 'T' },
                                                    { chave: 'quartaFeira', label: 'Q' },
                                                    { chave: 'quintaFeira', label: 'Q' },
                                                    { chave: 'sextaFeira', label: 'S' },
                                                    { chave: 'sabado', label: 'S' },
                                                ].map((dia) => (
                                                    <label key={dia.chave} className="checkbox-item">
                                                        <input
                                                            type="checkbox"
                                                            name={dia.chave}
                                                            checked={formNovaRota.diasSemana[dia.chave]}
                                                            onChange={handleDiaSemanaChange}
                                                        />
                                                        <span>{dia.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <h3 className="nova-rota-title-section">Dados de Acessibilidade</h3>
                            <div className="nova-rota-acessibilidades-container">
                                {/* Campo de Acessibilidade - mulheres */}
                                <div className="nova-rota-forms-campo acessibilidade">
                                    <label htmlFor="exclusivaMulheres" className="nova-rota-forms-label">
                                        Exclusivo para mulheres?
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="exclusivaMulheres"
                                        name="exclusivaMulheres"
                                        value={formNovaRota.exclusivaMulheres}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Campo de Acessibilidade - piso tátil */}
                                <div className="nova-rota-forms-campo acessibilidade">
                                    <label htmlFor="pisoTatil" className="nova-rota-forms-label">
                                        Rota com piso tátil?
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisoTatil"
                                        name="pisoTatil"
                                        value={formNovaRota.pisoTatil}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Campo de Acessibilidade - cadeira */}
                                <div className="nova-rota-forms-campo acessibilidade">
                                    <label htmlFor="acessivelCadeira" className="nova-rota-forms-label">
                                        Acessível cadeira de rodas?
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="acessivelCadeira"
                                        name="acessivelCadeira"
                                        value={formNovaRota.acessivelCadeira}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="nova-rota-btn-submit">
                                Cadastrar Rota
                            </button>

                        </form>
                    
                    </div>
                </div>    
            )}

            
        </>
    )
}

export default NovaRota