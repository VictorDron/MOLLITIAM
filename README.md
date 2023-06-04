O projeto MOLLITIAM foi cuidadosamente desenvolvido levando em consideração todas as premissas estabelecidas. Vamos destacar como o sistema atende a cada uma delas:
1. Escala e capilaridade geográfica:
   - A Stone, maior parceira do empreendedor, possui uma logística 100% própria, com polos localizados em todos os cantos do país.
   - O sistema MOLLITIAM permite acompanhar a cobertura de estoque em cada um desses polos, garantindo a disponibilidade adequada de terminais para atender à demanda de forma eficiente.
2. Eficiência operacional:
   - O estoque de terminais nos polos deve ser suficiente para 14 dias de consumo, conforme identificado pelos analistas.
   - O sistema MOLLITIAM possibilita visualizar a quantidade de terminais em estoque em cada polo, permitindo que os gestores monitorem a cobertura e tomem ações para evitar excessos ou falta de terminais.
3. Sistema simples:
   - A expectativa é que o sistema seja simples, e o MOLLITIAM foi desenvolvido com esse objetivo em mente.
   - A interface gráfica intuitiva e responsiva, construída com o framework React.js, proporciona uma experiência de uso amigável para os usuários, facilitando o acompanhamento e a solicitação de expedição de terminais.
4. Solicitação e expedição de terminais:
   - O sistema permite solicitar a expedição de terminais para qualquer polo de forma rápida e eficiente.
   - Após a solicitação, os terminais são expedidos imediatamente do centro de distribuição mais próximo, garantindo uma entrega ágil ao polo de destino.
5. Indicador visual de criticidade da cobertura de estoque:
   - O sistema MOLLITIAM apresenta um farol indicando a criticidade da cobertura de estoque em cada polo.
   - As cores do farol (vermelho, amarelo e verde) refletem diferentes níveis de cobertura, permitindo que os gestores identifiquem rapidamente os polos que requerem atenção, seja por falta ou excesso de terminais.
Em termos técnicos, o uso do Node.js no backend permite um processamento eficiente e escalável das solicitações e operações do sistema. O PostgreSQL, como banco de dados relacional, garante a integridade e segurança dos dados armazenados. Além disso, o projeto foi publicado no Github e inclui um README detalhado, fornecendo instruções claras para instalação e execução.
Dessa forma, o sistema MOLLITIAM atende às premissas estabelecidas, oferecendo uma solução simples, eficiente e escalável para o acompanhamento da cobertura de estoque nos polos logísticos da Stone. Ele permite a gestão adequada dos terminais, garantindo o melhor atendimento ao cliente e evitando custos desnecessários devido a estoques excessivos.
BACKEND:
  Diretório db:
 1- O arquivo `Bases.js` é responsável por interagir com o banco de dados PostgreSQL e fornecer funções para realizar consultas e atualizações relacionadas aos polos de estoque. Vamos documentar cada função presente no arquivo:
- getPolos: Essa função realiza uma consulta ao banco de dados para obter todas as informações dos polos de estoque. Retorna uma matriz contendo os registros encontrados.
- getPoloById: Essa função recebe um parâmetro `id` e realiza uma consulta ao banco de dados para obter as informações de um polo específico com base no ID fornecido. Retorna um objeto com os dados do polo.
- updatePolo: Essa função recebe dois parâmetros, `id` e `terminal_qtd_delta`, e atualiza as informações de um polo de estoque no banco de dados. Ela adiciona o valor de `terminal_qtd_delta` à quantidade atual de terminais do polo identificado pelo `id`. Além disso, registra a data e hora da atualização. Retorna um valor booleano indicando se a atualização foi bem-sucedida.
- getPolosWithZeroStock: Essa função realiza uma consulta ao banco de dados para obter os polos de estoque que possuem uma quantidade de terminais igual a zero. Retorna uma matriz com os registros encontrados.
- createHistor`: Essa função recebe três parâmetros, `origem_id`, `destino_id` e `terminal_qtd`, e cria um novo registro de histórico no banco de dados. O registro de histórico armazena informações sobre o envio de terminais entre polos, incluindo a origem, o destino e a quantidade de terminais. Retorna um valor booleano indicando se o registro foi criado com sucesso.
O arquivo `Bases.js` também importa as variáveis globais definidas no arquivo `.env` por meio do módulo `dotenv`. Além disso, importa a classe `Pool` do pacote `pg` para estabelecer a conexão com o banco de dados PostgreSQL.
Essas funções fornecem uma interface para realizar operações no banco de dados relacionadas aos polos de estoque, permitindo consultas, atualizações e criação de registros de histórico. Essas operações são essenciais para o funcionamento do sistema MOLLITIAM.
2 - O arquivo Level.js é responsável por calcular o nível de criticidade do estoque das bases de logística e ajustar o nível de estoque quando necessário. Vamos documentar as principais funções presentes no arquivo:
calculateStockCoverage: Essa função recebe um parâmetro id que representa o identificador de uma base de logística. Ela realiza consultas no banco de dados para obter informações sobre o consumo diário e a quantidade de terminais em estoque dessa base. Com base nessas informações, é calculada a cobertura de estoque em dias e determinado o nível de criticidade (PERIGO, ATENÇÃO ou COBERTURA IDEAL). Os dados de cobertura são retornados em um array de objetos contendo informações como a base, o consumo médio, a quantidade de terminais em estoque, a cobertura em dias e o nível de criticidade.
adjustStockLevel: Essa função é chamada quando o botão de ajuste de estoque é clicado. Ela chama a função calculateStockCoverage para obter os dados de cobertura de estoque da base identificada pelo parâmetro id. Em seguida, verifica se existem dados de cobertura disponíveis. Se houver, são obtidos a quantidade de terminais atual e o consumo médio. A função calcula a quantidade ideal de terminais para uma cobertura de estoque de 16,5 dias e, se a quantidade atual for diferente da quantidade ideal, realiza um ajuste chamando a função updatePolo do arquivo Bases.js. Retorna um valor booleano indicando se o ajuste foi realizado com sucesso.
Além disso, o arquivo importa as variáveis globais definidas no arquivo .env por meio do módulo dotenv. Também importa a classe Pool do pacote pg para estabelecer a conexão com o banco de dados PostgreSQL e importa a função updatePolo do arquivo Bases.js.
Essas funções são essenciais para o cálculo da cobertura de estoque e o ajuste do nível de estoque nas bases de logística. Elas permitem manter a quantidade adequada de terminais em estoque, evitando situações de falta ou excesso, e contribuem para a eficiência operacional do sistema MOLLITIAM.
3- O arquivo Transactions.js é responsável por realizar transações no banco de dados relacionadas ao histórico de envio de terminais entre polos de logística. Vamos documentar a função presente no arquivo:
getHistory: Essa função realiza uma consulta no banco de dados para obter todas as informações do histórico de envio de terminais. Retorna uma matriz com os registros encontrados, contendo informações como origem, destino e quantidade de terminais enviados.
Além disso, o arquivo importa as variáveis globais definidas no arquivo .env por meio do módulo dotenv. Também importa a classe Pool do pacote pg para estabelecer a conexão com o banco de dados PostgreSQL.
Essa função é útil para visualizar o histórico completo de envio de terminais entre os polos de logística, permitindo o acompanhamento e a análise das operações realizadas. Ela contribui para a rastreabilidade e o controle das movimentações de terminais dentro do sistema MOLLITIAM.
Diretório ROUTES:
O arquivo Polos.js contém as rotas e endpoints do sistema, definidas utilizando o framework Express. Vamos documentar cada rota e suas funcionalidades:

Rota base (/polos):

Método: GET
Descrição: Retorna todos os polos de estoque cadastrados no sistema.
Função associada: getPolos
•	Rota /empty:
Método: GET
Descrição: Retorna os polos de estoque que possuem quantidade zero de terminais.
Função associada: getPolosWithZeroStock
•	Rota /expedition:
Método: POST
Descrição: Realiza a expedição de terminais de um polo de origem para um polo de destino.
Parâmetros:
origem_id: ID do polo de origem.
destino_id: ID do polo de destino.
terminal_qtd: Quantidade de terminais a serem expedidos.
Função associada: createHistory, getPoloById, updatePolo
•	Rota /history:
Método: GET
Descrição: Retorna todo o histórico de envio de terminais entre polos.
Função associada: getHistory
Rota /search/:id
Método: GET
Descrição: Retorna os dados de cobertura de estoque de um polo específico.
Parâmetros:
id: ID do polo de estoque.
Função associada: calculateStockCoverage
•	Rota /:id:
Método: GET
Descrição: Retorna os detalhes de um polo de estoque específico com base no ID fornecido.
Parâmetros:
id: ID do polo de estoque.
Função associada: getPoloById
Rota /:id:
Método: PUT
Descrição: Atualiza a quantidade de terminais em um polo de estoque específico com base no ID fornecido.
Parâmetros:
id: ID do polo de estoque.
terminal_qtd: Nova quantidade de terminais.
Função associada: updatePolo
•	Rota /adjust/:id
Método: POST
Descrição: Realiza o ajuste do nível de estoque de um polo de estoque específico com base no ID fornecido.
Parâmetros:
id: ID do polo de estoque.
Função associada: adjustStockLevel
O arquivo também importa as funções do arquivo Bases.js para manipulação do banco de dados relacionadas aos polos de estoque, as funções do arquivo Level.js para cálculo de cobertura de estoque e ajuste de nível, e as funções do arquivo Transations.js para obter o histórico de envio de terminais entre polos.
Essas rotas e endpoints fornecem a interface para interação com o sistema MOLLITIAM, permitindo realizar operações como visualizar polos de estoque, expedir terminais, obter informações de cobertura de estoque, atualizar a quantidade de terminais e ajustar o nível de estoque.
  RAÍZ:
O arquivo `server.js` é o ponto de entrada do servidor e é responsável por configurar e iniciar o servidor Express. Vamos documentar as principais funcionalidades presentes no arquivo:
- Importação de bibliotecas:
  - O módulo `express` é importado para criar uma instância do aplicativo Express.
  - O módulo `cors` é importado para permitir requisições de diferentes origens
- Definição da porta:
  - A porta em que o servidor irá escutar é definida na constante `port`, sendo obtida a partir das variáveis de ambiente (`process.env.PORT`). Caso a variável de ambiente não esteja definida, o valor padrão será 3000.
- Importação dos roteadores:
  - O arquivo de rotas `polos.js` é importado usando o caminho relativo `./routes/polos`.
- Middleware:
  - O middleware `express.json()` é usado para analisar o corpo das requisições como JSON.
  - O middleware `cors()` é usado para permitir requisições de diferentes origens.
- Configuração dos roteadores:
  - O roteador `polosRoutes` é configurado com a base de rota `/polos`.
- Inicialização do servidor:
  - O servidor é iniciado e começa a escutar na porta definida pelo `port`.
  - Uma mensagem é exibida no console informando que o servidor está em execução e a URL na qual ele está sendo executado.
O arquivo `server.js` é o ponto central do servidor Express, onde todas as configurações e roteamentos são definidos. Ele permite a execução do sistema MOLLITIAM e o tratamento das requisições recebidas.
FRONTEND
Dependências
•	axios (versão 1.4.0): Uma biblioteca utilizada para fazer requisições HTTP no lado do cliente.

•	react (versão 18.2.0): A biblioteca principal para construir interfaces de usuário reativas e componentes no React.
•	react-dom (versão 18.2.0): Responsável por renderizar os componentes do React em um ambiente de navegador.
•	react-table (versão 7.8.0): Uma biblioteca para exibir e manipular dados em forma de tabela no React.

DevDependencies
•	@types/react (versão 18.0.37): Definições de tipo TypeScript para o React.
•	@types/react-dom (versão 18.0.11): Definições de tipo TypeScript para o ReactDOM.
•	@vitejs/plugin-react (versão 4.0.0): Plugin do Vite para suporte ao React.
•	eslint (versão 8.38.0): Ferramenta de linting para identificar e relatar erros de código.
•	eslint-plugin-react (versão 7.32.2): Plugin do ESLint com regras específicas para o React.
•	eslint-plugin-react-hooks (versão 4.6.0): Plugin do ESLint para verificar o uso correto dos hooks do React.
•	eslint-plugin-react-refresh (versão 0.3.4): Plugin do ESLint para suporte ao React Refresh.
•	vite (versão 4.3.9): O ambiente de desenvolvimento rápido e configurável usado para construir o aplicativo React.
Scripts
dev: Inicia o servidor de desenvolvimento do Vite.

build: Gera uma versão de produção otimizada do aplicativo usando o Vite.

lint: Executa o linter ESLint para verificar e relatar erros de código no diretório "src".

preview: Inicia um servidor para visualizar a versão de produção do aplicativo gerada pelo Vite.
Diretório App/index.html:
•	<!DOCTYPE html>: Define o tipo de documento HTML como HTML5.

•	<html lang="pt-br">: Define o idioma padrão do documento como português do Brasil.

•	<head>: A seção <head> contém informações sobre o documento, como o título, metadados e links para folhas de estilo. No código fornecido, existem algumas tags vazias <link> que provavelmente estão destinadas a ser preenchidas posteriormente.

•	<meta charset="UTF-8" />: Define o conjunto de caracteres como UTF-8, permitindo o uso de caracteres especiais.

•	<meta name="viewport" content="width=device-width, initial-scale=1.0" />: Define as configurações de visualização do aplicativo em dispositivos móveis. Com a configuração width=device-width, initial-scale=1.0, o aplicativo será dimensionado automaticamente para a largura do dispositivo e o nível de zoom inicial será definido como 1.0.

•	<title>MOLLITIAM</title>: Define o título da página como "MOLLITIAM".

•	<body>: A seção <body> contém o conteúdo visível da página.

•	<div id="root"></div>: Um elemento <div> com o ID "root". Este é o ponto de entrada do aplicativo React, onde os componentes React serão renderizados.

•	<script type="module" src="/src/main.jsx"></script>: Um elemento <script> que importa o arquivo "main.jsx" como um módulo de JavaScript. Este arquivo provavelmente contém a lógica principal do aplicativo React.

Diretório App/main.jsx:
•	import React from 'react';: Importa a biblioteca React, que permite a criação e manipulação de componentes do React.
•	import ReactDOM from 'react-dom';: Importa a biblioteca ReactDOM, que é responsável por renderizar os componentes do React no navegador.
•	import App from './App.jsx';: Importa o componente App do arquivo App.jsx.
•	ReactDOM.createRoot(document.getElementById('root')).render(...): Cria uma raiz do React utilizando o método createRoot do ReactDOM, que permite renderização assíncrona. Em seguida, o método render é chamado para renderizar o componente App na raiz do React.
•	<React.StrictMode>: É um componente do React que ativa verificações de segurança adicionais e avisos de depreciação durante o desenvolvimento. É usado para identificar problemas potenciais no código.
•	<App />: Renderiza o componente App, que representa o aplicativo principal do projeto.

Esse arquivo é responsável por iniciar o aplicativo React e renderizar o componente App no elemento com o ID "root". A partir daqui, o componente App será responsável por renderizar os demais componentes e gerenciar a lógica do frontend.

Diretório App/App.jsx:
O componente App é uma função React que retorna a estrutura do aplicativo MOLLITIAM.

As variáveis de estado são definidas usando o Hook useState do React. Elas incluem polos, selectedPolo, stockValue, dangerLevel, transferPolo e transferAmount.

•	A função useEffect é usada para buscar os polos da API do backend assim que o componente for montado. Isso é feito através do uso do axios.get para fazer a requisição para http://localhost:3000/polos e atualizar o estado polos com os dados recebidos.

•	Outra função useEffect é usada para buscar o nível de perigo para o polo selecionado sempre que o selectedPolo for alterado. Isso é feito através do uso do axios.get para fazer a requisição para http://localhost:3000/polos/search/${poloId} e atualizar o estado dangerLevel com o nível de perigo retornado.

•	A função fetchStockValue é usada para buscar o valor do estoque para o polo selecionado. Isso é feito através do uso do axios.get para fazer a requisição para http://localhost:3000/polos/${poloId} e atualizar o estado stockValue com o valor retornado.

•	A função handlePoloChange é chamada sempre que o polo selecionado é alterado. Ela encontra o polo correspondente nos polos e atualiza o estado selectedPolo e stockValue com os valores correspondentes.

•	A função handleAdjustLevelClick é chamada quando o botão de ajuste de nível é clicado. Ela faz uma requisição POST para http://localhost:3000/polos/adjust/${selectedPolo} para ajustar o nível de estoque do polo selecionado. Em seguida, atualiza o estado dangerLevel com o valor 'Cobertura ideal' e chama fetchStockValue para atualizar o valor do estoque.

•	As funções handleTransferPoloChange, handleTransferAmountChange e handleTransferSubmit são responsáveis por lidar com a transferência de terminais entre polos. Elas atualizam os estados transferPolo e transferAmount com os valores correspondentes e fazem uma requisição POST para http://localhost:3000/polos/expedition para realizar a transferência. Em seguida, chamam as funções fetchStockValue e fetchDangerLevel para atualizar os valores do estoque e do nível de perigo.

O componente App renderiza os componentes filhos que compõem a interface do usuário do aplicativo, como PoloSelect, StockDisplay, DangerLevelDisplay, TerminalTransfer, AdjustLevelButton e HistoryTable.

Esse arquivo contém a lógica principal do aplicativo MOLLITIAM, incluindo o gerenciamento de estados, as chamadas para a API do backend e a renderização dos componentes. Ele é responsável por controlar o fluxo de dados e interações do usuário.

Diretório App/components/ PoloSelect.jsx:
O componente PoloSelect é uma função React que recebe as seguintes propriedades: polos, selectedPolo e onPoloChange.

Ele renderiza um seletor de polos usando a tag select. A classe CSS select_1 é aplicada para estilização.

•	O evento onChange é definido para chamar a função onPoloChange sempre que o valor selecionado no seletor é alterado. Isso é feito através da função anônima (e) => onPoloChange(e.target.value).

•	O valor selecionado no seletor é definido usando a propriedade value com o valor de selectedPolo. Se selectedPolo for null, o valor será undefined.

•	A opção padrão do seletor é definida com o valor vazio e o texto "Selecione um polo".

•	Para cada polo no array polos, é renderizada uma opção usando a função map. O atributo key é definido como o id do polo e o atributo value é definido como o id do polo. O texto da opção é definido como o nome do polo.

•	O componente PoloSelect é exportado como padrão para ser usado em outros componentes.

•	O componente PoloSelect é responsável por exibir os polos disponíveis no seletor e permitir que o usuário selecione um polo. Quando o valor do seletor é alterado, a função onPoloChange é chamada para atualizar o estado do polo selecionado no componente pai.

Diretório App/components/ StockDisplay.jsx:
•	O componente StockDisplay é uma função React que recebe a propriedade stockValue.
•	Ele renderiza o valor do estoque de terminais dentro de um <div> com a classe CSS stock_value.
•	O valor do estoque é exibido como um cabeçalho <h1> com a classe CSS stock_result.
•	O componente StockDisplay é exportado como padrão para ser usado em outros componentes.
•	O componente StockDisplay é responsável por exibir o valor do estoque de terminais. Ele recebe o valor como propriedade e o renderiza na interface do usuário. É utilizado para informar ao usuário a quantidade atual de terminais disponíveis no polo selecionado.

Diretório App/components/ DangerLevelDisplay.jsx:
O componente DangerLevelDisplay é uma função React que recebe a propriedade dangerLevel.

Ele renderiza o nível de perigo do estoque de terminais dentro de um <div> com a classe CSS critical.

•	Dentro do <div>, há um elemento <div> com a classe CSS critical_img. A classe CSS é dinamicamente alterada com base no valor de dangerLevel. A expressão {dangerLevel ? dangerLevel.toLowerCase().replace(' ', '_') : ''} é usada para converter o valor de dangerLevel em minúsculas e substituir espaços por underscores, caso existam. Isso permite definir estilos diferentes para cada nível de perigo.

•	Dentro do <div> com a classe CSS critical_img, há uma tag <img> que exibe a imagem "logic.png".

•	O componente DangerLevelDisplay é exportado como padrão para ser usado em outros componentes.

•	O componente DangerLevelDisplay é responsável por exibir visualmente o nível de perigo do estoque de terminais. Ele recebe o valor do nível de perigo como propriedade e aplica estilos diferentes com base nesse valor. A imagem "logic.png" é exibida para representar visualmente o nível de perigo.

Diretório App/components/ TerminalTransfer.jsx:
O componente TerminalTransfer é uma função React que recebe as propriedades polos, transferPolo, onTransferPoloChange, onTransferAmountChange e onTransferSubmit.

Ele renderiza um formulário para realizar a transferência de terminais entre polos.

•	O elemento <select> é usado para selecionar o polo de transferência. A classe CSS select_2 é aplicada para estilização. O evento onChange é definido para chamar a função handlePoloChange sempre que o valor selecionado no seletor é alterado. O valor selecionado é definido com a propriedade transferPolo.

•	Dentro do <select>, a primeira opção é definida com o valor vazio e o texto "Selecione o polo de transferência". Para cada polo no array polos, é renderizada uma opção usando a função map. O atributo key é definido como o id do polo e o atributo value é definido como o id do polo. O texto da opção é definido como o nome do polo.

•	O elemento <input> é usado para inserir a quantidade de terminais a serem transferidos. O atributo type é definido como "text" e o atributo placeholder é definido como "Quantidade". O evento onChange é definido para chamar a função handleAmountChange sempre que o valor do campo de entrada é alterado.

•	O elemento <button> é usado para enviar o formulário. O texto do botão é definido como "ENVIAR". O evento onClick é definido para chamar a função handleSubmit quando o botão é clicado.

•	O componente TerminalTransfer é exportado como padrão para ser usado em outros componentes.

•	O componente TerminalTransfer é responsável por exibir o formulário e lidar com a transferência de terminais entre polos. Ele permite selecionar o polo de transferência, inserir a quantidade de terminais a serem transferidos e enviar a solicitação de transferência.

Diretório App/components/ AdjustLevelButton.jsx:
O componente AdjustLevelButton é uma função React que recebe a propriedade handleAdjustLevelClick.

Ele renderiza um botão para ajustar a cobertura do estoque de terminais dentro de um <div> com a classe CSS adjust_level.

•	O texto do botão é definido como "AJUSTAR COBERTURA".

•	O evento onClick é definido para chamar a função handleAdjustLevelClick quando o botão é clicado.

•	O componente AdjustLevelButton é exportado como padrão para ser usado em outros componentes.

•	O componente AdjustLevelButton é responsável por exibir o botão de ajuste de cobertura do estoque de terminais. Quando o botão é clicado, a função handleAdjustLevelClick é chamada para realizar o ajuste. O ajuste é feito com base no centro de distribuição (CD) mais próximo, conforme estabelecido nas premissas do projeto. Isso garante que a cobertura do estoque seja ajustada de acordo com a logística eficiente do sistema.
Diretório App/components/ HistoryTable.jsx:
O componente HistoryTable é uma função React que não recebe nenhuma propriedade.

•	Ele utiliza o estado do React para armazenar os dados do histórico (historyData) e os dados dos polos (polosData).

•	Duas chamadas assíncronas são feitas usando o useEffect para buscar os dados do histórico e dos polos na API do backend.

•	O useMemo é usado para definir as colunas da tabela e o array de dados a serem exibidos.

•	A função getPolosName é usada para obter o nome do polo com base no ID.

•	O componente useTable do pacote react-table é utilizado para criar a tabela e suas funcionalidades.

•	O retorno do componente inclui a estrutura HTML da tabela, onde são renderizadas as colunas, linhas e células.

•	O componente HistoryTable é exportado como padrão para ser usado em outros componentes.

O componente HistoryTable é responsável por exibir o histórico de transferência de terminais em uma tabela. Ele busca os dados do histórico e dos polos na API do backend e os exibe de forma organizada. O usuário pode visualizar a origem, destino e quantidade de terminais transferidos em cada entrada do histórico. Isso fornece uma visão completa das transações realizadas no sistema MOLLITIAM.

Como usar o projeto MOLLITIAM:

1. Configuração do ambiente:
   - Certifique-se de ter o Node.js instalado em sua máquina.
   - Faça o download do código-fonte do projeto ou clone-o do repositório.
   - Abra um terminal e navegue até o diretório raiz do projeto.

2. Configuração do backend:
   - Navegue até a pasta "backend".
   - Abra o arquivo ".env" e defina as variáveis de ambiente necessárias para a conexão com o banco de dados PostgreSQL.
   - Certifique-se de ter um banco de dados PostgreSQL instalado e em execução.
   - Execute o comando `npm install` para instalar as dependências do backend.
   - Execute o comando `npm start` para iniciar o servidor backend. O servidor estará ouvindo na porta 3000.
3. Configuração do frontend:
   - Navegue até a pasta "frontend".
   - Execute o comando `npm install` para instalar as dependências do frontend.
   - Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento do frontend. O servidor estará ouvindo na porta 5173.

4. Acesso ao aplicativo:
   - Abra um navegador da web e acesse http://localhost:5173.
   - Você será direcionado para a página inicial do aplicativo MOLLITIAM.
   - Na página inicial, você verá um seletor de polo, exibindo uma lista de polos disponíveis.
   - Selecione um polo na lista para visualizar informações sobre o estoque e o nível de perigo.
   - Você pode ajustar o nível de estoque para o valor ideal clicando no botão "AJUSTAR COBERTURA".
   - Para transferir terminais de um polo para outro, preencha o formulário de transferência e clique em "ENVIAR".
   - Você também pode visualizar o histórico de transferências na tabela de histórico.

Pronto! Agora você pode usar o aplicativo MOLLITIAM para monitorar o estoque, ajustar o nível de estoque e acompanhar o histórico de transferências de terminais entre os polos.









