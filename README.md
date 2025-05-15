# Guia de Conferência Brisanet

Sistema desenvolvido para gerenciar guias de conferência para transações de itens, permitindo criar, visualizar e imprimir documentos para validação de envio e recebimento de materiais.

![Logo Brisanet](https://www.brisanet.com.br/favicon.ico)

## 📋 Funcionalidades

- Criação de novas transações com número de identificação
- Adição, edição e remoção de itens
- Geração de guias de conferência para impressão
- Integração com Google Sheets para busca de descrições de itens por código SAP
- Interface responsiva para todos os dispositivos

## 🛠️ Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- React Query

## 🚀 Como executar

Siga estes passos para executar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/WandevPB/guiadeconferencia.git

# Acesse a pasta do projeto
cd guiadeconferencia

# Instale as dependências
npm install

# Execute a aplicação
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) para visualizar a aplicação.

## 🔧 Configuração

Para utilizar a integração com Google Sheets, configure suas credenciais no arquivo:
```
src/contexts/GoogleSheetsContext.tsx
```

## 👨‍💻 Desenvolvedor

Projeto desenvolvido por **Wanderson Davyd**.

- GitHub: [WandevPB](https://github.com/WandevPB)

## 📄 Licença

Este projeto está sob a licença MIT.
