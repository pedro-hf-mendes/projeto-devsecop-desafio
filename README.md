Durante o desenvolvimento deste projeto foi implementada uma pipeline DevSecOps utilizando GitHub Actions. O objetivo foi aplicar práticas de segurança durante todo o ciclo de entrega da aplicação.

1. Secrets Scanning com Gitleaks
Inicialmente a pipeline identificou credenciais expostas no código-fonte. O GitHub Push Protection bloqueou o envio do código e foi necessário remover as credenciais do projeto e reescrever o histórico de commits para eliminar os segredos.

O Gitleaks é responsável por identificar senhas, tokens, chaves de API e outras informações sensíveis antes que sejam publicadas.

2. SAST com Semgrep
Foi implementada a análise estática de segurança utilizando o Semgrep.

O Semgrep analisa o código-fonte procurando padrões inseguros, vulnerabilidades e más práticas de programação sem executar a aplicação.

Durante a implementação foi necessário corrigir a configuração do pipeline para executar corretamente o comando de análise.

3. SCA com Grype
Foi implementada a análise de dependências utilizando o Grype.

O Grype verifica bibliotecas e componentes utilizados pelo projeto em busca de vulnerabilidades conhecidas (CVEs), ajudando a reduzir riscos provenientes de dependências desatualizadas ou vulneráveis.

4. Empacotamento e Hash
Após as verificações de segurança, a aplicação é empacotada em um artefato.

Também é gerado um hash SHA256 para garantir a integridade do conteúdo gerado durante o processo de build.

5. Assinatura de Artefatos com Cosign
Foi implementada a assinatura dos artefatos utilizando o Cosign.

O objetivo dessa etapa é garantir autenticidade, rastreabilidade e integridade dos arquivos gerados pela pipeline.

Durante a implementação foi necessário ajustar a execução do comando para permitir a assinatura automática sem intervenção manual.

6. Verificação e Deploy
Depois que todas as verificações são concluídas com sucesso, a pipeline realiza o deploy automático para o GitHub Pages.

Dessa forma, apenas versões aprovadas por todas as verificações de segurança são publicadas.

Resultado Final
Ao final do projeto a pipeline passou por todas as etapas com sucesso:

Secrets Scanning (Gitleaks)
SAST (Semgrep)
SCA (Grype)
Assinatura de Artefatos (Cosign)
Verificação de Integridade
Deploy Automático
Todas as execuções finais da pipeline foram concluídas com sucesso no GitHub Actions.

Uso de Secrets
Foi criado um Secret no GitHub Actions para demonstrar o armazenamento seguro de informações sensíveis.

Os Secrets permitem que tokens, senhas e chaves de acesso sejam utilizados na pipeline sem ficarem expostos no código-fonte.

Exemplo criado para o projeto:

MINHA_CHAVE

![alt text](image-1.png)