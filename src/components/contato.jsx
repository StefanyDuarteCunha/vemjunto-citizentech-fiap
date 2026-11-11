import '../css/contato.css'
import { useState } from 'react';

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
    categoria: '',
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Se o campo for o telefone, aplica a máscara antes de salvar no estado
    const valorFinal = name === 'telefone' ? aplicarMascaraTelefone(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : valorFinal,
    }));
  };

  const [statusEnvio, setStatusEnvio] = useState(false); // controla se exibe ou não a confirmação

  function confirmacaoEnvio(e) {
    e.preventDefault();
    
    // usado para exibir a mensagem na tela ao enviar o formulário
    setStatusEnvio(true);  
    
    // limpeza dos dados preenchidos no objeto
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      mensagem: '',
      categoria: '',
    });

    // faz a mensagem sumir automaticamente após 5 segundos
    setTimeout(() => {
      setStatusEnvio(false);
    }, 5000);
  }

  return (
    <>
      <div className="contato-container">
        <h1 className="contato-title">
          <i className="bi bi-chat contato-title-icon"></i>
          Fale Conosco
        </h1>
        <h3 className="contato-subtitle">Estamos aqui para ouvir você. Envie sua mensagem, dúvida ou sugestão de rota.</h3>
        <form id="contato-forms" onSubmit={confirmacaoEnvio}>

          {/* Campo de Nome*/}
          <div className="contato-forms-campo">
            <label htmlFor="nome" className="contato-forms-label">
              Nome Completo:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="contato-forms-input"
              minLength={3}
              required
            />
          </div>

          {/* Campo de E-mail */}
          <div className="contato-forms-campo">
            <label htmlFor="email" className="contato-forms-label">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              className="contato-forms-input"
              title="Digite o email no formato nome@example.com"
              required
            />
          </div>

          {/* Campo de telefone */}
          <div className="contato-forms-campo">
            <label htmlFor="telefone" className="contato-forms-label">
              Telefone / WhatsApp:
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(xx)xxxxx-xxxx"
              className="contato-forms-input"
              maxLength={15} // Limite de caracteres considerando a máscara: (XX) 9XXXX-XXXX
              pattern="\(\d{2}\)\s\d{4,5}-\d{4}" // Validação nativa Regex no submit
              title="Digite o telefone, somente números, no formato DDD número"
              required
            />
          </div>

          {/* Select / Menu de Opções */}
          <div className="contato-forms-campo">
            <label htmlFor="categoria" className="contato-forms-label">
              Assunto:
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="contato-forms-select"
            >
              <option value="" disabled hidden>
                Selecione uma opção...
              </option>
              <option value="suporte">Suporte Técnico / Dúvidas</option>
              <option value="sugestao">Sugestões</option>
              <option value="reclamacao">Reclamação</option>
              <option value="denuncia">Denuncia / Relato</option>
              <option value="outros">Outros Assuntos</option>
            </select>
          </div>


  {/* Área de Texto Multi-linhas */}
        <div className="contato-forms-campo">
          <label htmlFor="mensagem" className="contato-forms-label">
            Mensagem:
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            maxLength={500}
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Escreva sua mensagem aqui..."
            className="contato-forms-textarea"
            required
          />
          <p className="contato-forms-cont-caracteres"><span>{formData.mensagem?.length || 0}</span>/500 caracteres</p>
          </div>

          <div className="contato-forms-button-container">
            {/* Botão de Envio */}
            <button type="submit" className="contato-forms-button">
              Enviar Formulário
            </button>
          </div>
          
        </form>

        {/* Div de Confirmação (Renderizada apenas quando statusEnvio for true) - utilizado o role com o objetivo de aprimorar a acessibilidade do site, de forma que os leitores de tela entendam o objetivo deste container, e o "polite" aguarda a conclusão de conteúdos que estão sendo falados para depois informar a conclusão */}
        {statusEnvio && (
          <div className="contato-forms-mensagem-sucesso" role="status" aria-live="polite">
            <p>Mensagem encaminhada com sucesso! Entraremos em contato em até 2 dias úteis.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Contato
