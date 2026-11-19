# VemJunto - Conectando Pessoas para Caminhadas Seguras 🟢🚶‍♀️🚶‍♂️

Projeto desenvolvido para a Global Solution 2026/2, no primeiro ano da Graduação em Engenharia de Software da FIAP. O VemJunto é uma plataforma colaborativa de **CitizenTech** focada na mobilidade urbana segura, permitindo que pessoas que fazem trajetos semelhantes a pé se conectem para caminhar juntas e reduzirem o medo de insegurança.

---

## 🌍 O Problema e a Proposta

Pessoas — especialmente mulheres, idosos e estudantes — enfrentam diariamente a insegurança urbana ao realizarem trajetos a pé à noite ou em áreas isoladas. Cerca de 63% das mulheres relatam que já deixaram de sair a noite para lazer, por medo de transitar nas ruas sozinhas.

O **VemJunto** atua como uma rede colaborativa de "caminhada parceira", permitindo:
- Mapeamento e visualização de rotas ativas em tempo real.
- Filtros por região, horário e preferência de grupo (ex: *Somente Mulheres*).
- Proposta e cadastro de novas rotas comunitárias.
- Acessibilidade visual completa com modo de Alto Contraste (WCAG AAA) e ajuste dinâmico de texto.

---

## 🎯 Conexão com os ODS da ONU

O projeto contribui diretamente para as seguintes metas da Agenda 2030 da ONU:
- **ODS 5 (Igualdade de Gênero):** Garantir o direito de ir e vir com segurança para mulheres.
- **ODS 10 (Redução das Desigualdades):** Garantir acessibilidade digital e segurança comunitária para públicos vulneráveis.
- **ODS 11 (Cidades e Comunidades Sustentáveis):** Promover a mobilidade ativa a pé de forma segura e colaborativa.

---

## 🛠️ Tecnologias
- JavaScript
- HTML
- CSS
- React
- Bootstrap Icons
- Json

---

## 📚 Hooks e Bibliotecas importadas
- **useState:** utilizado para gerenciar o estado local de um componente, guardando as informações que podem sofrer alterações em tempo real, como por exemplo, o preenchuimento dos campos em um formulário.
- **useEffect:** utilizado para executar efeitos, como monitoramento de cenários que vão mudar, e que podem gerar ativação ou desativação de algo, como a mudança de cor das telas para o modo de contraste
- **useMemo:** utilizado para extrair informações do arquivo json, listando as cidades e bairros, de acordo com os dados armazenados.
- **react-router-dom:** utilizado para controlar as rotas e navegações entre as páginas / componentes do site.

---

## 📋 Padronização
- **CSS independente:** cada componente possui um CSS independente, para permitir edições mais claras e direcionadas.
- **Nomenclatura das classes:** cada classe recebeu termos que buscavam explicar o componente de pertencimento, o objeto e especificações. Por exemplo:
        -> "nova-rota-forms-input" - refere-se a um campo de input, no formulário de cadastro de nova rota.
        -> "card-1-tag-container" - container que agrupa os elementos da tag, disponível no card 1.
- **medias:** a responsividade foi realizada para telas desktop, 1200px, 900px, 700px e 500px, de acordo com a necessidade de cada tela, realizando alterações de flex-direction ou quantidade de itens no grid.
- **modo Dark e alto contraste:** todos os arquivos CSS possuem uma organização contendo:
        -> a configuração padrão em modo noturno,
        -> ajustes necessários para o modo de alto contraste,
        -> ajustes necessários para as medias

---

## 📌 Status do projeto
Em desenvolvimento

---

## 🔗 Link do site
https://vemjunto-citizentech-phi.vercel.app/
