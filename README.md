<h1 align="center">API Integração Pipedrive e Bling</h1>
<br>

## Sobre ##

Essa API tem o intuito de cadastrar os clientes com o status ganho do Pipedrive como um pedido no Bling e fazer um registro no MongoDB.

<br>

## Endpoints ##

##### POST #####
Responsável por receber os disparos de webhook do Pipedrive.
<br>
`https://api.example/v1/notification`

##### GET #####
Realiza a consulta no banco de dados e retorna os clientes ganhos do dia.
<br>
`https://api.example/v1/deals`
##### GET #####
Verifica se API está rodando.
<br>
`https://api.example/v1/status`
<br><br>

## Requisitos ##

Antes de começar, você precisa ter [Git] (https://git-scm.com) e [Node] (https://nodejs.org) instalados.

<br>

## Iniciando ##

```bash
# Clone o projeto
$ git clone https://github.com/BrunoAgst/api-integration-pipedrive

# Acesse
$ cd pi-integration-pipedrive

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente

# Inicie o projeto
$ npm run start

```
<br>

## Configuração Pipedrive ##

Primeiro precisamos fazer o cadastro do webhook.

Para cadastrar o webhook vá em Ferramentas e Integrações > Ferramentas > Webhooks e clique em **Criar novo webhook**:

![alt text](https://i.ibb.co/tx77HzW/pipedrive.png)

<br>

Em **Ação do evento** selecione `updated` e em **Objeto de evento** selecione `deal`:

![alt text](https://i.ibb.co/Bn6XrYW/pipedrive2.png)

<br>

Em **URL do Ponto de Extremidade** informe o endpoint e clique em **SALVAR**:

![alt text](https://i.ibb.co/4TMzzCk/pipedrive3-1.png)

<br>

## Gerando a chave de API no Bling ##

Vá em Preferências > Sistemas > Usuários e usuário API, depois clique em **INCLUIR USUÁRIO**.
<br><br>
Selecione **USUÁRIO API**, informe seu nome e e-mail, clique em **Gerar** para criar a chave, em permissões selecione **Clientes e Fornecedores** e por último clique em **SALVAR**:


![alt text](https://i.ibb.co/vH4zXp6/bling.png)


Por último copie a chave da API e configure na variável de ambiente **API_KEY_BLING** \.

<br>

## Configuração MongoDB ##
Copie a URL de conexão do Atlas e configure na variável de ambiente **MONGO_DB**.

Após finalizar as configurações, toda vez que mudarem o status do cliente no Pipedrive para **Ganho**, será cadastrado como um pedido no Bling e irá ser registrado no MongoDB.

<br>

<a href="#top">Volte para o topo</a>
