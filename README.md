# ⚡ Santos Soluções | Hub de Utilitários & Portfólio

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-222222?style=for-the-badge&logo=github&logoColor=white)

Um ambiente híbrido que funciona tanto como portfólio pessoal quanto como uma suíte de ferramentas para desenvolvedores (inspirado no modelo 4Devs). Construído com foco em performance, experiência de usuário e processamento local.

O design adota uma estética *Dark/Tech* (Preto e Roxo), com layouts baseados em painéis de controle, grades de engenharia e referências a interfaces de linha de comando (CLI).

> **🌐 Demo online:** [vinnisntos.github.io/port_vinni](https://vinnisntos.github.io/port_vinni/)

---

## 🛠️ Módulos de Ferramentas Implementados

O hub conta com geradores e validadores de dados frequentemente utilizados no desenvolvimento e teste de software no Brasil. Todos os cálculos são processados localmente no navegador, sem envio de dados para servidores.

* **Validador de Email:** Checagem de sintaxe e formatos válidos.
* **Gerador/Validador de CPF:** Implementação do algoritmo oficial da Receita Federal (dígitos verificadores).
* **Gerador/Validador de CNPJ:** Geração de matrizes (0001) com cálculos matemáticos reais de validação.
* **Buscador de CEP:** Integração com a API ViaCEP para localização de endereços.
* **Validador de Telefone:** Formatação automática para o padrão nacional (DDD + 9 dígitos).
* **Gerador de Dados Fake:** Criação de personas completas (Nome, Email, CPF, Telefone e Endereço) para popular bancos de dados de teste.

---

## 💻 Stack Tecnológica

* **Framework:** React.js 19
* **Bundler:** Vite 8
* **Estilização:** Tailwind CSS v4 (com design tokens customizados)
* **Roteamento:** React Router DOM v7 (SPA architecture com fallback para GH Pages)
* **Ícones:** React Icons (FontAwesome, Simple Icons, Tabler)
* **Deploy:** GitHub Actions → GitHub Pages

---

## 🚀 Como executar localmente

### Pré-requisitos
* Node.js v18+ (recomendado v20)
* Gerenciador de pacotes (NPM, Yarn ou PNPM)

### Instalação

```bash
git clone https://github.com/vinnisntos/port_vinni.git
cd port_vinni
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de produção

```bash
npm run build      # gera ./dist
npm run preview    # serve ./dist localmente para teste
```

---

## ☁️ Deploy no GitHub Pages

O projeto está configurado para deploy 100% automatizado no GitHub Pages:

1. **Workflow** (`.github/workflows/deploy.yml`) é acionado em cada `push` na branch `main`.
2. O Vite compila com `base=/<repo>/` (detectado automaticamente via `GITHUB_PAGES_REPO`).
3. O `404.html` resolve o problema de rotas SPA — recarregar `/tools/cpf` direto funciona.
4. O artefato é publicado no GitHub Pages via `actions/deploy-pages@v4`.

### Configuração no repositório

No GitHub: **Settings → Pages → Source: GitHub Actions**. Pronto, qualquer push na `main` faz deploy.

Se renomear o repositório, o workflow detecta o novo nome automaticamente.

---

## 🎨 Princípios de Design

* **Hierarquia visual:** títulos com peso/gradiente, separação clara entre seções.
* **Acessibilidade:** `lang="pt-BR"`, `aria-labels` em botões de ícone, `role="status"` em feedback, contraste mínimo AA em texto muted (`#a1a1aa`).
* **Consistência:** `PageHeader` reutilizável, paleta centralizada em `@theme` do Tailwind v4.
* **Performance:** CSS purged, JS com tree-shake, preconnect para ViaCEP.

---

## 👨‍💻 Sobre o Autor

Desenvolvido por **Vinnicius Santos**, estudante de Análise e Desenvolvimento de Sistemas. Focado na criação de interfaces robustas, engenharia de software e soluções que facilitam o dia a dia de outros desenvolvedores.

> *"Transformando lógica bruta em soluções reais."*