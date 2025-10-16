# Email da CT Junior - Projeto Piloto Back-End

Este projeto, consiste no desenvolvimento do back-end para a aplicação "Email da CT Junior". O objetivo é simular um sistema de e-mails.
A API é responsável por gerenciar usuários, autenticação, envio, recebimento e visualização de e-mails.

## Arquitetura e Conceitos

- O projeto foi desenvolvido seguindo princípios de Domain-Driven Design (DDD) e Arquitetura Limpa, separando as responsabilidades em camadas distintas:

  * core: Contém as peças fundamentais da arquitetura, como a classe Entity, o UniqueEntityID e o Either para tratamento de erros funcionais.

  * domain: Representa o coração da aplicação.

    *  enterprise/entities: Contém as entidades de domínio (User, Email) e os Value Objects (EmailWithSenderReceiverNames).

    *  application/use-cases: Orquestra as regras de negócio, recebendo dados da camada de infraestrutura e utilizando os repositórios para persistência.

    *  application/repositories: Define os contratos (classes abstratas) para a persistência de dados, desacoplando o domínio dos detalhes de implementação do banco de dados.

    * infra: Camada responsável pelos detalhes de implementação.

      *  database: Contém a implementação dos repositórios usando Prisma e o banco de dados PostgreSQL.

      *  http: Contém os Controllers (responsáveis por receber requisições HTTP), os Presenters (responsáveis por formatar os dados de resposta) e os módulos do NestJS.

      *  auth: Gerencia a autenticação via JWT.

## Tecnologias Utilizadas

  - Framework: NestJS

  - Linguagem: TypeScript

  - Banco de Dados: PostgreSQL

  - ORM: Prisma

  - Containerização: Docker

  - Testes: Vitest (para testes unitários e E2E)

  - Validação: Zod

  - Autenticação: JWT (JSON Web Token) com chaves RS256

## API Endpoints

 ### Abaixo estão os principais endpoints disponíveis na API. Rotas marcadas como Autenticada exigem um token JWT no cabeçalho Authorization: Bearer <token>.
  |Endpoint	      | Método  |Descrição	                                                          |Autenticação
  | --------------|---------|---------------------------------------------------------------------|------------------
  | /user	        |POST	    |Cria um novo usuário.	                                              |Pública
  | /login	      |POST	    |Autentica um usuário e retorna um access_token.	                    |Pública
  | /my-emails	  |GET	    |Retorna a lista de e-mails recebidos pelo usuário autenticado.	      |Autenticada
  | /sent-emails  |GET	    |Retorna a lista de e-mails enviados pelo usuário autenticado.	      |Autenticada
  | /email	      |POST	    |Envia um novo e-mail para um destinatário.	                          |Autenticada
  | /email/:id	  |GET	    |Busca os detalhes de um e-mail específico pelo seu ID.	              |Autenticada
  | /email/:id	  |DELETE	  |Deleta um e-mail enviado, caso ainda não tenha sido lido.	          |Autenticada
  | /my-name	    |PATCH	  |Edita o nome do usuário autenticado.	                                |Autenticada
  | /my-image	    |PATCH	  |Edita a imagem de perfil do usuário autenticado.	                    |Autenticada
