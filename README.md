# ⚡ Santos Soluções | Hub de Utilitários & Portfólio

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-deployed-222222?style=for-the-badge&logo=amazonaws&logoColor=FF9900)

Um ambiente híbrido que funciona tanto como portfólio pessoal quanto como uma suíte de ferramentas para desenvolvedores (inspirado no modelo 4Devs). Construído com foco em performance, experiência de usuário e processamento local.

O design adota uma estética *Dark/Tech* (Preto e Roxo), com layouts baseados em painéis de controle, grades de engenharia e referências a interfaces de linha de comando (CLI).

> **🌐 Demo online:** [vinnisantos.com.br](https://vinnisantos.com.br/)

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
* **Roteamento:** React Router DOM v7 (SPA architecture)
* **Ícones:** React Icons (FontAwesome, Simple Icons, Tabler)
* **Deploy:** VM na AWS (EC2) com Nginx servindo o build estático

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

## ☁️ Deploy na AWS (EC2 + Nginx)

O site roda numa VM EC2 e é servido diretamente no domínio próprio `vinnisantos.com.br`:

1. `npm run build` gera o estático em `./dist` (base `/`, já que o domínio serve o site na raiz).
2. O conteúdo de `dist/` é copiado para a VM (ex.: `scp`/`rsync` para o diretório configurado no `root` do Nginx).
3. O Nginx serve os arquivos estáticos e resolve rotas de SPA via `try_files ... /index.html` — ver referência em [`deploy/nginx.conf`](./deploy/nginx.conf).
4. HTTPS/certificado gerenciado na própria VM (ex.: Certbot), fora do escopo deste repositório.

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