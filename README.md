# Desafio DevSecOps | Gerenciador de Tarefas

## Sobre o Projeto
Este repositório é o resultado do desafio prático do módulo de DevSecOps da **ADA Tech**. O projeto inicial continha vulnerabilidades propositais de segurança e uma pipeline de CI/CD incompleta. 

O objetivo central foi **projetar e implementar uma esteira de segurança automatizada**, garantindo que nenhum código vulnerável chegasse ao ambiente de produção.

## Objetivos Concluídos
Neste desafio, as seguintes etapas foram realizadas com sucesso:

- [x] Implementação de steps de segurança no arquivo `pipeline.yml`.
- [x] Configuração do **"Break the Build"** (falha automática da pipeline ao detectar ameaças).
- [x] Correção de todas as vulnerabilidades apontadas pelas ferramentas.
- [x] Pipeline executando com sucesso (100% verde).
- [x] Documentação do fluxo de DevSecOps.

---

## Ferramentas de Segurança Implementadas

A esteira de DevSecOps é engatilhada automaticamente a cada *push* na branch `main`. Ela utiliza os seguintes validadores:

*   **Gitleaks:** Verificação de segredos (*Secrets Scanning*).
*   **Semgrep:** Análise Estática de Código (*SAST*).
*   **Grype:** Análise de Composição de Software (*SCA*).

---

## Como a Pipeline Funciona

A esteira garante a integridade da aplicação através do conceito de **"Break the Build"**: se qualquer *gate* de segurança falhar, o processo de deploy é imediatamente cancelado. 

Abaixo está o detalhamento de cada estágio da pipeline:

### 1. Checkout do Código
*   **O que faz:** Baixa o código-fonte do repositório para o *runner* do GitHub Actions.
*   **Importância:** Etapa fundamental para que as ferramentas de análise tenham acesso aos arquivos do projeto.

### 2. Build Preliminar
*   **O que faz:** Realiza uma verificação da integridade e da existência dos arquivos estáticos no diretório `src/`.
*   **Importância:** Assegura que a estrutura básica da aplicação está íntegra antes de consumir recursos com as análises de segurança.

### 3. Secrets Scanning (Gitleaks)
*   **O que faz:** Varre o histórico e o código atual em busca de credenciais *hardcoded*, como chaves de API, senhas e tokens.
*   **Importância:** Previne o vazamento de segredos que poderiam dar acesso indevido a sistemas de terceiros ou bancos de dados.

### 4. SAST (Semgrep)
*   **O que faz:** Realiza a Análise Estática de Segurança do Código (*Static Application Security Testing*), buscando por falhas lógicas e padrões perigosos (ex: vulnerabilidades do OWASP Top 10).
*   **Importância:** Identifica brechas criadas durante o desenvolvimento da aplicação, garantindo que o código escrito pela equipe seja seguro desde a origem.

### 5. SCA (Grype)
*   **O que faz:** Executa a Análise de Composição de Software (*Software Composition Analysis*), cruzando as dependências do `package.json` com bancos públicos de vulnerabilidades (CVEs).
*   **Importância:** Evita que a aplicação herde falhas de segurança de bibliotecas ou pacotes de terceiros desatualizados.

### 6. Deploy em Produção (GitHub Pages)
*   **O que faz:** Publica os arquivos estáticos da pasta `src/` no GitHub Pages.
*   **Importância:** É o estágio final. Só é alcançado se **todos** os testes anteriores passarem, garantindo que os usuários finais recebam um produto validado e livre de vulnerabilidades conhecidas.

---

## Vulnerabilidades Mitigadas

Durante o processo de correção do código para fazer a pipeline passar, as seguintes melhorias de segurança foram aplicadas:

*   **Proteção de Credenciais:** Remoção de constantes inseguras e segredos expostos diretamente no código (como `API_KEY` e `DB_PASSWORD`).
*   **Prevenção contra Injeção de Código e XSS:** 
    *   Substituição do uso perigoso da função `eval()`.
    *   Sanitização de entradas ao manipular o DOM (remoção de `innerHTML` vulnerável).
    *   Tratamento adequado de erros para evitar vazamento de informações sensíveis via `err.stack`.
*   **Atualização de Dependências:** Atualização de bibliotecas vulneráveis para versões seguras (Axios `^1.18.1`, Express `^4.22.2` e Lodash `^4.18.1`).
